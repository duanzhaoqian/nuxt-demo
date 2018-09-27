<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.processInstanceId"
                      placeholder="processInstanceId"
                      style="width: 200px;margin-right: 5px;"
                      class="filter-item"
                      @keyup.enter.native="handleFilter" />
            <el-input v-model="listQuery.productInstanceCode"
                      placeholder="productInstanceCode"
                      style="width: 200px;margin-right: 5px;"
                      class="filter-item"
                      @keyup.enter.native="handleFilter" />
            <el-input v-model="listQuery.tenantCode"
                      placeholder="tenantCode"
                      style="width: 200px;margin-right: 5px;"
                      class="filter-item"
                      @keyup.enter.native="handleFilter" />
            <el-select v-model="listQuery.sort"
                       style="width: 140px;margin-right: 5px;"
                       class="filter-item"
                       @change="handleFilter">
                <el-option v-for="item in sortOptions"
                           :key="item.key"
                           :label="item.label"
                           :value="item.key" />
            </el-select>
            <el-button class="filter-item"
                       type="primary"
                       icon="el-icon-search"
                       @click="handleFilter">search</el-button>
        </div>
        <el-table v-loading="listLoading"
                  :key="tableKey"
                  :data="list"
                  element-loading-text="Loading"
                  border
                  fit
                  highlight-current-row
                  style="width: 100%;min-height:500px;">>
            <el-table-column prop="requestCode"
                             label="REQUESTCODE"
                             width="180" />
            <el-table-column label="PROCESSINSTANCEID"
                             width="180">
                <template slot-scope="scope">
                    <router-link :to="{ path: '/task/table', query: { processInstanceId: scope.row.processInstanceId}}">
                        <el-button :type="scope.row.status | statusTagFilter"
                                   size="mini">{{ scope.row.processInstanceId }}</el-button>
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column prop="productInstanceCode"
                             label="PRODUCTINSTANCECODE" />
            <el-table-column prop="tenantCode"
                             label="TENANTCODE" />
            <el-table-column prop="operationType"
                             label="OPERATIONTYPE" />
            <el-table-column label="REQUESTTIME">
                <template slot-scope="scope">
                    <i class="el-icon-time" /> {{ scope.row.requestTime | datefmt('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column label="PARAM"
                             align="center">
                <template slot-scope="scope">
                    {{ scope.row.param |productIdFilter }}
                    <el-button v-if="scope.row.param"
                               type="text"
                               @click="showdes(scope.row.param)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination :current-page="listQuery.currentPage"
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
import request from '@/assets/utils/request'
export default {
  layout:"Layout",
  filters: {
    statusTagFilter(status) {
      const statusMap = {
        0: 'warning',
        1: 'info',
        2: 'danger',
        3: 'success'
      }
      return statusMap[status]
    },
    stringless(input, size) {
      if (input.length > size) {
        input = input.substring(0, size) + '...'
      }
      return input
    },
    productIdFilter(input) {
      return JSON.parse(input).productId
    }
  },
  data() {
    return {
      listQuery: {
        processInstanceId: undefined,
        productInstanceCode: undefined,
        tenantCode: undefined,
        sort: 'process_instance_id desc',
        currentPage: 1,
        pageSize: 10
      },
      total: 0,
      tableKey: 0,
      listLoading: true,
      sortOptions: [
        { label: 'InstanceId Ascending', key: 'process_instance_id asc' },
        { label: 'InstanceId Descending', key: 'process_instance_id desc' },
        { label: 'Id Ascending', key: 'id asc' },
        { label: 'Id Descending', key: 'id desc' }
      ],
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
   async fetchData() {
      this.listLoading = true
        let data=await request({
            url: '/request/page',
            method: 'get',
            params:this.listQuery
        })
        console.log(data)
        this.list = data.items
        this.total = data.totalNumber
        this.listLoading = false
    //   getRequestProcessPage(this.listQuery).then(res => {
    //     this.list = res.items
    //     this.listLoading = false
    //     this.total = res.totalNumber
    //   }).catch(e => {
    //     console.log(e)
    //   })
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
