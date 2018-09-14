<template>
  <div>
    <ul>
      <li v-for="(n,i) in data"
          :key="i">
        <nuxt-link :to="{name:'task-id',params:{id:n}}">
          <el-button>{{n}}</el-button>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      data:[1,2,3,4]
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style scoped>
</style>