import auth from '~/assets/utils/auth';
export default function({ route, req, res, redirect, store }) {
  const whiteList = ['/login']; // 不重定向白名单

  let isClient = process.client;
  let isServer = process.server;
  let redirectURL = '/login';
  var token, path;

  //在服务端
  if (isServer) {
    let cookies = auth.getTokenInServer(req);
    path = req.originalUrl;
    token = cookies;
  }
  //在客户端判读是否需要登陆
  if (isClient) {
    token = auth.getTokenInClient();
    path = route.path;
  }

  if (path) {
    redirectURL = redirectURL + '?ref=' + encodeURIComponent(path);
  }
  if (whiteList.indexOf(path.split('?')[0]) !== -1) {
    return;
  }
  //需要进行权限判断的页面开头
  if (!token) {
    redirect(redirectURL);
  }
  if (!store.state.user.name) {
    store.dispatch('user/GetInfo');
  }
}
