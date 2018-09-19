<template>
  <div>
    <h1>hello nuxt</h1>
    <svg-icon icon-class="user" />
    <icon icon-class="user" ></icon>
  </div>
</template>

<script>
import icon from '~/components/SvgIcon'
export default {
 // middleware:'auth',
  components:{icon}
}
</script>

<style>
</style>