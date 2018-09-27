export const constantRouterMap = [
  {
    path: '/',
    name: 'home',
    // hidden: false,
    // meta: { title: 'Home', icon: 'example' },
    children: [
      {
        path: '/',
        name: 'home',
        meta: { title: 'Home', icon: 'example' },
      },
    ],
  },
  {
    path: '/request',
    name: 'request',
    meta: { title: 'Request', icon: 'tree' },
    children: [
      {
        path: '/request',
        name: 'request',
        meta: { title: 'Request', icon: 'tree' },
      },
    ],
  },
  {
    path: '/task',
    name: 'task',
    meta: { title: 'Task', icon: 'example' },
    children: [
      {
        path: '/task',
        name: 'index',
        meta: { title: 'Task', icon: 'example' },
      },
    ],
  },
];
export default constantRouterMap;
