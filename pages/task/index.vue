<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        placeholder="InstanceId"
        v-model="listQuery.processInstanceId"
        style="width: 200px;margin-right: 5px;"
        class="filter-item"
        @keyup.enter.native="handleFilter" />
      <el-select
        v-model="listQuery.sort"
        style="width: 140px;margin-right: 5px;"
        class="filter-item"
        @change="handleFilter">
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key" />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter">Search</el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload">Export</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%;min-height:500px;">
      <el-table-column label="ID" width="130">
        <template slot-scope="scope">
          {{ scope.row.id }}
          <el-button size="mini" type="warning" @click="reactive(scope.row.id)">reactive</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="INSTANCEID"
        width="110"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.processInstanceId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="NAME"
        width="200"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        label="DESCRIPTION"
        align="center">
        <template slot-scope="scope">
          {{ scope.row.description |stringless(60) }}
          <el-button v-if="scope.row.description" type="text" @click="showdes(scope.row.description)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="STATUS"
        width="110"
        align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusTagFilter">{{ scope.row.status |statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="RELAY"
        width="110"
        align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.relay |relayTagFilter">{{ scope.row.relay|relayFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="RUNNINGTIMES"
        width="110"
        align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.runningTimes }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="CREATETIME"
        width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime |datefmt('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.currentPage"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.pageSize"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import waves from '@/assets/waves' // 水波纹指令
import { datefmt } from '@/plugins/filters'
import request from '@/assets/utils/request'
export default {
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'Waiting',
        1: 'Started',
        2: 'Failure',
        3: 'Success'
      }
      return statusMap[status]
    },
    statusTagFilter(status) {
      const statusMap = {
        0: 'info',
        1: 'info',
        2: 'danger',
        3: 'success'
      }
      return statusMap[status]
    },
    relayFilter(relay) {
      const relayMap = {
        0: '不具备条件',
        1: '可运行',
        2: '运行中',
        3: '暂停中',
        4: '结束'
      }
      return relayMap[relay]
    },
    relayTagFilter(relay) {
      const relayMap = {
        0: 'info',
        1: 'success',
        2: 'warning',
        3: 'warning',
        4: 'success'
      }
      return relayMap[relay]
    },
    stringless(input, size) {
      if (input.length > size) {
        input = input.substring(0, size) + '...'
      }
      return input
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      total: null,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        importance: undefined,
        processInstanceId: undefined,
        type: undefined,
        sort: 'process_instance_id desc'
      },
      sortOptions: [
        { label: 'InstanceId Ascending', key: 'process_instance_id asc' },
        { label: 'InstanceId Descending', key: 'process_instance_id desc' }
      ],
      dialogPvVisible: false,
      downloadLoading: false
    }
  },
  created() {
    this.listQuery.processInstanceId = this.$route.query.processInstanceId
    this.fetchData()
  },
  methods: {
   async fetchData() {
      this.listLoading = true
      let response=await request({
        url: '/task/page',
        method: 'get',
        params:this.listQuery
      })
      this.list = response.items
      this.listLoading = false
      this.total = response.totalNumber
    },
    reactive(id) {
      this.$alert('reactive ' + id, 'reactive', {
        confirmButtonText: '确定',
        callback:async action => {
          if (action === 'confirm') {
            let data=await request({
              url: '/task/reactivate?taskId=' + id,
              method: 'get'
            })
            this.fetchData()
            this.$message({
              type: 'success',
              message: 'reactive ' + id
            })
          } else {
            this.$message({
              type: 'info',
              message: 'cancel '
            })
          }
        }
      })
    },
    showdes(val) {
      this.$alert(val, {
        confirmButtonText: '确定',
        customClass: 'custmsg'
      })
    },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.fetchData()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.fetchData()
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/assets/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', 'processInstanceId', 'status', 'relay', 'name', 'description', 'createTime']
        const filterVal = [
          'id',
          'processInstanceId',
          'status',
          'relay',
          'name',
          'description',
          'createTime'
        ]
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'task-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'createTime') {
            return datefmt(v[j], 'YYYY-MM-DD HH:mm:ss')
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>
<style>
.custmsg {
  width: 80%;
}
.custmsg .el-message-box__content {
  overflow-y: auto;
  max-height: 600px;
}
</style>
