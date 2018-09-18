import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import { Message } from 'element-ui';
import { getToken } from '@/assets/utils/auth'; // 验权

export default ({ app }) => {
  const whiteList = ['/login']; // 不重定向白名单
  app.router.beforeEach((to, from, next) => {
    // NProgress.start();
    if (getToken()) {
      if (to.path === '/login') {
        next({ path: '/' });
        // NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
      } else {
        if (app.store.state.user.roles.length === 0) {
          app.store
            .dispatch('user/GetInfo')
            .then(res => {
              // 拉取用户信息
              next();
            })
            .catch(err => {
              app.store.dispatch('user/FedLogOut').then(() => {
                Message.error(err || 'Verification failed, please login again');
                next({ path: '/' });
              });
            });
        } else {
          next();
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next('/login');
        // NProgress.done();
      }
    }
  });

  app.router.afterEach(() => {
    // NProgress.done(); // 结束Progress
  });
};
