import Vue from 'vue';
import moment from 'moment'; // date format
export function datefmt(input, fmt) {
  return moment(input).format(fmt);
}

export default () => {
  //   Object.keys(filters).forEach(key => {
  //     Vue.filter(key, filters[key]);
  //   });
  Vue.filter('datefmt', datefmt);
};
