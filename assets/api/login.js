import request from '@/assets/utils/request';

export function login(username, password) {
  return request({
    url: 'login',
    method: 'post',
    data: {
      username,
      password,
    },
    transformResponse: function(data) {
      // 对 data 进行任意转换处理
      return {
        code: 20000,
        data: { token: (((1 + Math.random()) * 0x10000) | 0).toString(16) },
      };
    },
    validateStatus: function(status) {
      return true; // 默认的
    },
  });
}

export function getInfo(token) {
  return request({
    url: 'getInfo',
    method: 'get',
    params: { token },
    transformResponse: function(data) {
      // 对 data 进行任意转换处理
      return {
        code: 20000,
        data: {
          roles: ['admin'],
          name: 'admin',
          avatar:
            'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        },
      };
    },
    validateStatus: function(status) {
      return true; // 默认的
    },
  });
}

export function logout() {
  return request({
    url: 'logout',
    method: 'post',
    transformResponse: function(data) {
      // 对 data 进行任意转换处理
      return { code: 20000, data: {} };
    },
    validateStatus: function(status) {
      return true; // 默认的
    },
  });
}
