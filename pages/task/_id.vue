<template>
    <div>{{id}}</div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        id:this.$route.params.id
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