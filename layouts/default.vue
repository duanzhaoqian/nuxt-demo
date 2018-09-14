<template>
  <div>
    <ul>
      <li v-for="(r,index) in reoutes"
          :key="index">
        <nuxt-link :to="{name:r.name}">
          <el-button>
            {{r.name}}
          </el-button>
        </nuxt-link>
      </li>
    </ul>
    <nuxt/>
  </div>
</template>
<script>
export default {
  data(){
    return {
      router:this.$router.options
    }
  },
  computed:{
    reoutes(){
      return this.router.routes.filter(c=>c.path.indexOf(':')<0)
    }
  },
  created(){
  }
}
</script>

<style>
</style>
