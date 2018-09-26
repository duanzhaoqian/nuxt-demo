<template>
  <el-breadcrumb class="app-breadcrumb"
                 separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList"
                          v-if="item.meta.title"
                          :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1"
              class="no-redirect">{{ item.meta.title }}</span>
        <nuxt-link v-else
                   :to="item.redirect||item.path">{{ item.meta.title }}</nuxt-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import constantRouterMap from '@/assets/utils/menu.js'
export default {
  
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      if(!this.$route.name){
        return
      }
      //console.log(this.$route)
      let matched=[]
      let name= this.$route.name.split('-')
      constantRouterMap.filter(item=>{
        if(item.name==name[0]){
          matched.push(item)
        }
        if(item.children&&name.length>1){
          item.children.filter(c=>{
            if(c.name==name[1]){
              matched.push({name:c.name,path:c.path,meta:{title:this.$route.params[name[1]],icon:c.meta.icon}})
              //matched.push(c)
            }
          })
        }
      })
      const first = matched[0]
      if (first && first.name !== 'home') {
        matched = [{ path: '/', meta: { title: 'Dashboard' }}].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
