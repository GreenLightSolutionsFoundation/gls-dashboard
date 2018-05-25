import { shallowMount } from '@vue/test-utils';
import App from '../../src/App.vue';

describe('App.vue', () => {
  it('renders app', () => {
    const wrapper = shallowMount(App);
    expect(wrapper).toBeDefined();
  });
});
