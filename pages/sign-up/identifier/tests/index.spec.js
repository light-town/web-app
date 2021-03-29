import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import * as faker from 'faker';
import IndentifierPage from '../index.vue';
import AuthForm from '~/components/forms/auth/form';
import UiAlert from '~/ui/alert/index.vue';
import * as cacheActionTypes from '~/store/cache/types';

const router = new VueRouter();
const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

router.push = jest.fn();

describe('[Sign Up] [Indentifier Page] ...', () => {
  afterEach(() => jest.clearAllMocks());
  it('triggers input', async () => {
    const wrapper = mount(IndentifierPage, {
      store: new Vuex.Store({
        modules: {
          cache: {},
        },
      }),
      localVue,
      router,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

    const TEST_USERNAME = faker.random.word();

    const usernameInput = wrapper
      .findComponent(AuthForm)
      .find('input[type="text"]');
    usernameInput.setValue(TEST_USERNAME);
    usernameInput.trigger('input');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.username).toStrictEqual(TEST_USERNAME);
  });

  it('should set username when cache service is init and username is in the cache', async () => {
    const TEST_USERNAME = faker.random.word();

    const wrapper = mount(IndentifierPage, {
      store: new Vuex.Store({
        modules: {
          cache: {
            state: () => ({
              isInit: false,
              raws: {},
              error: null,
            }),
          },
        },
      }),
      localVue,
      router,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

    wrapper.vm.$store.state.cache.raws.username = TEST_USERNAME;
    wrapper.vm.$store.state.cache.isInit = true;

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isCacheServiceInit).toBeTruthy();
    expect(wrapper.vm.username).toStrictEqual(TEST_USERNAME);
  });

  it('should set username when cache service is init and username is in the cache', async () => {
    const TEST_USERNAME = faker.random.word();

    const wrapper = mount(IndentifierPage, {
      store: new Vuex.Store({
        modules: {
          cache: {
            state: () => ({
              isInit: false,
              raws: {},
              error: null,
            }),
          },
        },
      }),
      localVue,
      router,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

    wrapper.vm.$store.state.cache.raws.username = TEST_USERNAME;
    wrapper.vm.$store.state.cache.isInit = true;

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isCacheServiceInit).toBeTruthy();
    expect(wrapper.vm.username).toStrictEqual(TEST_USERNAME);
  });

  it('triggers next button', async () => {
    const TEST_USERNAME = faker.random.word();

    const store = new Vuex.Store({
      modules: {
        cache: {
          state: () => ({
            isInit: false,
            raws: {},
            error: null,
          }),
        },
      },
    });
    store.dispatch = jest.fn();

    const wrapper = mount(IndentifierPage, {
      store,
      localVue,
      router,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

    await wrapper.vm.$nextTick();

    wrapper.vm.$store.state.cache.raws.username = TEST_USERNAME;
    wrapper.vm.$store.state.cache.isInit = true;

    await wrapper.vm.$nextTick();

    await wrapper
      .findComponent(AuthForm)
      .find('button[type="submit"]')
      .trigger('submit');

    await wrapper.vm.$nextTick();

    expect(store.dispatch).toBeCalledTimes(1);
    expect(store.dispatch).toBeCalledWith(cacheActionTypes.SET_CACHE, {
      username: TEST_USERNAME,
    });
    expect(wrapper.vm.username).toStrictEqual(TEST_USERNAME);
  });

  it('should throw error when username length is short then 6 characters', async () => {
    const TEST_USERNAME = '1234';

    const store = new Vuex.Store({
      modules: {
        cache: {
          state: () => ({
            isInit: true,
            raws: {
              username: TEST_USERNAME,
            },
          }),
        },
      },
    });
    store.dispatch = jest.fn();

    const wrapper = mount(IndentifierPage, {
      store,
      localVue,
      router,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

    await wrapper
      .findComponent(AuthForm)
      .find('button[type="submit"]')
      .trigger('submit');

    await wrapper.vm.$nextTick();

    expect(store.dispatch).toBeCalledTimes(0);
    expect(wrapper.vm.error).toStrictEqual(
      new Error('The username must has length more 6 characters')
    );
    expect(wrapper.findComponent(UiAlert).vm.severity).toStrictEqual('error');
    expect(
      wrapper
        .findComponent(UiAlert)
        .vm.$slots.default.map(vnode => vnode.text.trim())[0]
    ).toStrictEqual(wrapper.vm.error.message);
  });
});
