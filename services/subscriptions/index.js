import AbstractService from '../abstract-service';

export class AbstractEvent {
  constructor(namespace, event, eventToSubscribe, eventToUnsubscribe) {
    this.namespace = namespace;
    this.event = event;
    this.eventToSubscribe = eventToSubscribe;
    this.eventToUnsubscribe = eventToUnsubscribe;
  }

  toSubscribe() {
    return {
      namespace: this.namespace,
      event: this.eventToSubscribe.event,
      data: this.eventToSubscribe.payload,
    };
  }

  is(event) {
    return event.namespace === this.namespace && event.event === this.event;
  }

  toUnsubscribe() {
    return {
      namespace: this.namespace,
      event: this.eventToUnsubscribe.event,
      data: this.eventToUnsubscribe.payload,
    };
  }
}

export class ChangedSessionVerificationStageEvent extends AbstractEvent {
  constructor(payload) {
    super(
      'AUTH',
      'CHANGED_SESSION_VERIFICATION_STAGE',
      { event: 'SUB_CHANGE_SESSION_VERIFICATION_STAGE', payload },
      { event: 'UNSUB_CHANGE_SESSION_VERIFICATION_STAGE' }
    );
  }
}

export default class SubscriptionsService extends AbstractService {
  constructor(options) {
    super(options);

    this.websocket = null;
    this.subscriptions = new Map();
    this.queue = [];
  }

  isInit() {
    return this.websocket !== null;
  }

  init() {
    this.deinit();

    this.websocket = new WebSocket(process.env.NUXT_ENV_API_WS_URL);
    this.websocket.onopen = () => {
      this.queue.forEach(event =>
        this.websocket.send(JSON.stringify(event.toSubscribe()))
      );
      this.queue = [];
    };
    this.websocket.onmessage = ({ data }) => {
      const response = JSON.parse(data);

      for (const [event, subscription] of this.subscriptions) {
        if (event.is(response)) {
          subscription.cbs.forEach(cb => cb(response));
        }
      }
    };
    this.websocket.onerror = e => {
      console.error(e);
      this.deinit();
    };
    this.websocket.onclose = () => {
      this.deinit();
    };
  }

  deinit() {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;

      if (this.subscriptions.size) this.subscriptions.clear();
    }
  }

  subscribe(event, callback) {
    const existsCallbacks = this.subscriptions.get(event)?.cbs || [];

    this.subscriptions.set(event, { cbs: [...existsCallbacks, callback] });

    if (!this.websocket) {
      this.queue.push(event);
      this.init();
      return;
    }

    this.websocket.send(JSON.stringify(event.toSubscribe()));
  }

  hasSubscribed(event, callback) {
    if (!this.subscriptions.has(event)) return false;

    const existsCallbacks = this.subscriptions.get(event).cbs;

    return existsCallbacks.includes(callback);
  }

  unsubscribe(event, callback) {
    if (!this.subscriptions.has(event))
      throw new Error('The subscription is not exists');

    const existsCallbacks = this.subscriptions.get(event).cbs;
    const filteredCallbacks = existsCallbacks.filter(cb => cb !== callback);

    if (!filteredCallbacks.length) {
      this.subscriptions.delete(event);
    } else {
      this.subscriptions.set(event, { cbs: [...existsCallbacks, callback] });
    }

    if (this.websocket) {
      this.websocket.send(JSON.stringify(event.toUnsubscribe()));
    }

    if (!this.subscriptions.size) this.deinit();
  }
}
