import request from '@/utils/request'

export function getList(params) {
  return request({
    //  url: 'https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin/table/list',
    url: '/task/page',
    method: 'get',
    params
  })
}
export function reactive(id) {
  return request({
    //  url: 'https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin/table/list',
    url: '/task/reactivate?taskId=' + id,
    method: 'get'
  })
}
