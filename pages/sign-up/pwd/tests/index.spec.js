import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import * as faker from 'faker';
import PwdPage from '../index.vue';
import AuthFormSkeleton from '~/components/forms/auth/skeleton.vue';
import * as authActionTypes from '~/store/auth/types';

const router = new VueRouter();
const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

router.push = jest.fn();

describe('[Sign Up] [Pwd Page] ...', () => {
  afterEach(() => jest.clearAllMocks());
  it('should load username from cache', async () => {
    const TEST_USERNAME = faker.random.word();

    const store = new Vuex.Store({
      modules: {
        cache: {
          state: () => ({
            isInit: true,
            raws: {
              username: TEST_USERNAME,
            },
            error: null,
          }),
        },
      },
    });
    const wrapper = mount(PwdPage, {
      localVue,
      store,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.cachedUsername).toStrictEqual(TEST_USERNAME);
    expect(wrapper.vm.showAuthForm).toBeTruthy();
  });

  it('should show skeleton when cache service is not init', async () => {
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
    const wrapper = mount(PwdPage, { localVue, store });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.showAuthForm).toBeFalsy();
    expect(wrapper.findComponent(AuthFormSkeleton).exists()).toBeTruthy();
  });

  it('should show skeleton when username is not in cache', async () => {
    const store = new Vuex.Store({
      modules: {
        cache: {
          state: () => ({
            isInit: true,
            raws: {},
            error: null,
          }),
        },
      },
    });
    const wrapper = mount(PwdPage, {
      localVue,
      store,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.showAuthForm).toBeFalsy();
    expect(wrapper.findComponent(AuthFormSkeleton).exists()).toBeTruthy();
  });

  it('should redirect to /sign-up when username was not found in cache', async () => {
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
    const wrapper = mount(PwdPage, {
      localVue,
      store,
      router,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

    wrapper.vm.$store.state.cache.isInit = true;

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$router.push).toBeCalledTimes(1);
    expect(wrapper.vm.$router.push).toBeCalledWith('/sign-up');
  });

  it('triggers next button', async () => {
    const TEST_PASSWORD = '123456789';
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

    const wrapper = mount(PwdPage, {
      localVue,
      store,
      router,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

    wrapper.vm.$store.state.cache.raws.username = faker.random.word();
    wrapper.vm.$store.state.cache.isInit = true;

    await wrapper.vm.$nextTick();

    const form = await wrapper.find('form');
    const passwordField = await form.find(
      'input[type="password"][placeholder="Enter a password"]'
    );
    const confirmPasswordField = await form.find(
      'input[type="password"][placeholder="Confirm your password"]'
    );
    const nextButton = await form.find('button[type="submit"]');

    passwordField.setValue(TEST_PASSWORD);
    confirmPasswordField.setValue(TEST_PASSWORD);

    await wrapper.vm.$nextTick();

    nextButton.trigger('submit');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.password).toStrictEqual(TEST_PASSWORD);
    expect(wrapper.vm.repeatPassword).toStrictEqual(TEST_PASSWORD);
    expect(wrapper.vm.localError).toBeNull();

    expect(wrapper.vm.$router.push).toBeCalledTimes(1);
    expect(wrapper.vm.$router.push).toBeCalledWith('/sign-up/verify');

    expect(store.dispatch).toBeCalledTimes(1);
    expect(store.dispatch).toBeCalledWith(authActionTypes.SIGN_UP, {
      password: TEST_PASSWORD,
    });
  });

  it('should throw error when passwords is not match', async () => {
    const TEST_FIRST_PASSWORD = '123456789';
    const TEST_SECOND_PASSWORD = '987654321';
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

    const wrapper = mount(PwdPage, {
      localVue,
      store,
      router,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

    wrapper.vm.$store.state.cache.raws.username = faker.random.word();
    wrapper.vm.$store.state.cache.isInit = true;

    await wrapper.vm.$nextTick();

    const form = await wrapper.find('form');
    const passwordField = await form.find(
      'input[type="password"][placeholder="Enter a password"]'
    );
    const confirmPasswordField = await form.find(
      'input[type="password"][placeholder="Confirm your password"]'
    );
    const nextButton = await form.find('button[type="submit"]');

    passwordField.setValue(TEST_FIRST_PASSWORD);
    confirmPasswordField.setValue(TEST_SECOND_PASSWORD);

    await wrapper.vm.$nextTick();

    nextButton.trigger('submit');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.password).toStrictEqual(TEST_FIRST_PASSWORD);
    expect(wrapper.vm.repeatPassword).toStrictEqual(TEST_SECOND_PASSWORD);

    expect(wrapper.vm.error).toStrictEqual(
      new Error('The passwords is not match')
    );

    expect(wrapper.vm.$router.push).toBeCalledTimes(0);

    expect(store.dispatch).toBeCalledTimes(0);
  });

  it('should throw error when password has less then 8 characters', async () => {
    const TEST_PASSWORD = '1234567';
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

    const wrapper = mount(PwdPage, {
      localVue,
      store,
      router,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

    wrapper.vm.$store.state.cache.raws.username = faker.random.word();
    wrapper.vm.$store.state.cache.isInit = true;

    await wrapper.vm.$nextTick();

    const form = await wrapper.find('form');
    const passwordField = await form.find(
      'input[type="password"][placeholder="Enter a password"]'
    );
    const confirmPasswordField = await form.find(
      'input[type="password"][placeholder="Confirm your password"]'
    );
    const nextButton = await form.find('button[type="submit"]');

    passwordField.setValue(TEST_PASSWORD);
    confirmPasswordField.setValue(TEST_PASSWORD);

    await wrapper.vm.$nextTick();

    nextButton.trigger('submit');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.password).toStrictEqual(TEST_PASSWORD);
    expect(wrapper.vm.repeatPassword).toStrictEqual(TEST_PASSWORD);

    expect(wrapper.vm.error).toStrictEqual(
      new Error('The password must has more 8 characters')
    );

    expect(wrapper.vm.$router.push).toBeCalledTimes(0);

    expect(store.dispatch).toBeCalledTimes(0);
  });

  it('should throw error when not all field was filled', async () => {
    const TEST_PASSWORD = '123456789';
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

    const wrapper = mount(PwdPage, {
      localVue,
      store,
      router,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

    wrapper.vm.$store.state.cache.raws.username = faker.random.word();
    wrapper.vm.$store.state.cache.isInit = true;

    await wrapper.vm.$nextTick();

    const form = await wrapper.find('form');
    const passwordField = await form.find(
      'input[type="password"][placeholder="Enter a password"]'
    );
    const nextButton = await form.find('button[type="submit"]');

    passwordField.setValue(TEST_PASSWORD);

    await wrapper.vm.$nextTick();

    nextButton.trigger('submit');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.password).toStrictEqual(TEST_PASSWORD);
    expect(wrapper.vm.repeatPassword).toStrictEqual('');

    expect(wrapper.vm.error).toStrictEqual(
      new Error('All fields is required to fill')
    );

    expect(wrapper.vm.$router.push).toBeCalledTimes(0);

    expect(store.dispatch).toBeCalledTimes(0);
  });

  it('triggers back button', async () => {
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

    const wrapper = mount(PwdPage, {
      localVue,
      store,
      router,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

    wrapper.vm.$store.state.cache.raws.username = faker.random.word();
    wrapper.vm.$store.state.cache.isInit = true;

    await wrapper.vm.$nextTick();

    const form = await wrapper.find('form');
    const backButton = await form.find('button[type="button"]');

    await wrapper.vm.$nextTick();

    backButton.trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$router.push).toBeCalledTimes(1);
    expect(wrapper.vm.$router.push).toBeCalledWith('/sign-up');
  });
});
