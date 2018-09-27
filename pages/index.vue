<template>
  <div>
    <el-select v-model="intervalTime"
               placeholder="intervalTime">
      <el-option v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value" />
    </el-select>
    <div class="chart-container">
      <chart :time-data="timeData"
             :process-data="processData"
             :sucess-data="sucessData"
             :error-data="errorData"
             height="100%"
             width="100%" />
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Charts/lineMarker'
import moment from 'moment'// date format
import request from '@/assets/utils/request'
export default {
  name: 'LineChart',
  layout:"Layout",
  components: { Chart },
  data() {
    return {
      timeData: [],
      processData: [],
      sucessData: [],
      errorData: [],
      intervalid: undefined,
      intervalTime: 60000 * 10 * 1,
      xSize: 6,
      options: [
        { value: 30000, label: '30s' },
        { value: 60000, label: '1min' },
        { value: 60000 * 10 * 1, label: '10min' },
        { value: 60000 * 60 * 1, label: '1h' },
        { value: 60000 * 60 * 3, label: '3h' },
        { value: 60000 * 60 * 24, label: '24h' }
      ]
    }
  },
  watch: {
    intervalTime(newVale, oldValue) {
      // console.log(newVale)
      this.timeData = []
      this.processData = []
      this.sucessData = []
      this.errorData = []
      this.initData()
      this.createInterval()
    }
  },
  created() {
    this.initData()
    this.createInterval()
  },
  beforeDestroy() {
    this.clearInterval()
  },
  methods: {
    initData() {
      this.getData(new Date(), this.xSize)
    },
   async getData(time, num) {
      if (num < 1) {
        return
      }
      const tmpTime = new Date()
      tmpTime.setTime(time.getTime() - this.intervalTime * (num - 1))
      const beginTime = new Date()
      beginTime.setTime(tmpTime.getTime() - this.intervalTime)
      const endTime = new Date()
      endTime.setTime(tmpTime.getTime())
     let res= await request({
            url: '/request/count',
            method: 'get',
            params:{ beginTime: beginTime.getTime(), endTime: endTime.getTime() }
          })
          this.processData.push(res.processNum)
        if (this.processData.length > this.xSize) {
          this.processData.shift()
        }
        this.sucessData.push(res.successNum)
        if (this.sucessData.length > this.xSize) {
          this.sucessData.shift()
        }
        this.errorData.push(res.errorNum)
        if (this.errorData.length > this.xSize) {
          this.errorData.shift()
        }
        this.timeData.push(moment(tmpTime).format('YYYY-MM-DD HH:mm:ss'))
        if (this.timeData.length > this.xSize) {
          this.timeData.shift()
        }
        this.getData(time, --num)
      // getCountProcess({ beginTime: beginTime.getTime(), endTime: endTime.getTime() }).then(res => {
      //   this.processData.push(res.processNum)
      //   if (this.processData.length > this.xSize) {
      //     this.processData.shift()
      //   }
      //   this.sucessData.push(res.successNum)
      //   if (this.sucessData.length > this.xSize) {
      //     this.sucessData.shift()
      //   }
      //   this.errorData.push(res.errorNum)
      //   if (this.errorData.length > this.xSize) {
      //     this.errorData.shift()
      //   }
      //   this.timeData.push(moment(tmpTime).format('YYYY-MM-DD HH:mm:ss'))
      //   if (this.timeData.length > this.xSize) {
      //     this.timeData.shift()
      //   }
      //   this.getData(time, --num)
      // }).catch(e => { console.log(e) })
    },
    createInterval() {
      if (this.intervalid) {
        this.clearInterval()
      }
      this.intervalid = setInterval(() => {
        this.getData(new Date(), 1)
      }, this.intervalTime)
    }, clearInterval() { clearInterval(this.intervalid) }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
/* .filter-container {
  margin-top: 20px;
} */
</style>