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
import constantRouterMap from '@/assets/utils/menu.js'
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
