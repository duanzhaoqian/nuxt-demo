import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon'; // svg组件

export default () => {
  // register globally
  Vue.component('svg-icon', SvgIcon);

  const requireAll = requireContext =>
    requireContext.keys().map(requireContext);
  const req = require.context('@/static/svg', false, /\.svg$/);
  requireAll(req);
};
// register globally
// Vue.component('svg-icon', SvgIcon)

// const requireAll = requireContext => requireContext.keys().map(requireContext)
// const req = require.context('@/assets/svg', false, /\.svg$/)
// requireAll(req)
