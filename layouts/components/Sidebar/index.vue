<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :show-timeout="200"
             :default-active="$route.path"
             :collapse="isCollapse"
             mode="vertical"
             background-color="#304156"
             text-color="#bfcbd9"
             active-text-color="#409EFF">
      <sidebar-item v-for="route in routes"
                    :key="route.name"
                    :item="route"
                    :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from './SidebarItem'
export const constantRouterMap = [
  {
    path: '/',
   // name: 'Home',
   // hidden: false,
   // meta: { title: 'Home', icon: 'example' },
    children: [{
        path: '',
        name: '',
        meta: { title: 'Home', icon: 'example' }
      }]
  },
  {
    path: '/request',
   // name: 'Request',
  //  meta: { title: 'RequestProcess', icon: 'tree' },
    children: [
      {
        path: '',
        name: 'process',
        meta: { title: 'Request', icon: 'tree' }
      }
    ]
  },
  {
    path: '/task',
   name: 'Task',
   meta: { title: 'Task', icon: 'example' },
    children: [
      {
        path: '',
        name: 'index',
        meta: { title: 'Task', icon: 'example' }
      },
      // {
      //   path: 'id',
      //   name: 'id',
      //   meta: { title: 'Task/Id', icon: 'example' }
      // }
    ]
  }
]
export default {
  components: { SidebarItem },
  computed: {
      sidebar(){
        return this.$store.state.app.sidebar
        },
    routes() {
      return constantRouterMap
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
