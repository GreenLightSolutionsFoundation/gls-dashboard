import Vue from 'vue';
import VueRouter from 'vue-router';
import { shallowMount } from '@vue/test-utils';
import App from '../../src/App.vue';

describe('App.vue', () => {
  Vue.use(VueRouter);
  it('renders app', () => {
    const wrapper = shallowMount(App);
    expect(wrapper).toBeDefined();
  });
});
