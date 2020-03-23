// 注册资料审核
<template>
  <div class="contentWrap companyManagementList">
    <el-form ref="ruleForm" size="mini" :inline="true" :model="ruleForm" class="demo-ruleForm">

      <el-form-item label="公司全称:" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="公司全称"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSearch('ruleForm')">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

      <el-form-item label="状态:" style="width: 100%; margin-bottom:0;" prop="recordStatusArray" class="orderStatus">
        <el-checkbox-group
          v-model="ruleForm.recordStatusArray"
        >
          <el-checkbox v-for="city in recordStatusArrayData" :key="city.id" :label="city.id">{{ city.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

    </el-form>

    <el-table
      v-loading="loading"
      size="mini"
      style="width:100%;"
      border
      max-height="450"
      :data="tableList"
    >

      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="50"
      />

      <el-table-column
        prop="name"
        label="公司全称"
        align="center"
        min-width="150"
      >
        <!-- <template slot-scope="scope">
          <el-button
            @click.native.prevent="handeLookDetails(scope.row)"
            type="text"
            size="small">
            {{scope.row.name}}
          </el-button>
        </template> -->
      </el-table-column>

      <el-table-column
        align="center"
        prop="registerPhone"
        min-width="120"
        label="注册手机号"
      />

      <el-table-column
        align="center"
        prop="creditCode"
        min-width="130"
        label="统一社会信用代码"
      />

      <el-table-column
        align="center"
        prop="legalPerson"
        min-width="70"
        label="法人代表"
      />

      <el-table-column
        align="center"
        prop="contactTel"
        min-width="115"
        label="企业联系电话"
      />

      <el-table-column
        align="center"
        prop="status"
        min-width="100"
        label="状态"
      >
        <template slot-scope="scope">
          <!-- / 状态：1(待审核),2(已审核通过),3(审核不通过) -->
          <span>{{ scope.row.status ==1 ? '待审核' :
            scope.row.status ==2 ? '已审核通过' :
            scope.row.status ==3 ? '审核不通过' : '' }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="createTime"
        label="创建时间"
        min-width="120"
      >
        <template slot-scope="scope">
          <!-- / 状态：1(待审核),2(已审核通过),3(审核不通过) -->
          <span>{{ scope.row.createTime.substring(0,16) }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="createUser"
        min-width="100"
        label="创建人"
      />
      <!-- 操作 -->
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="120"
      >
        <template slot-scope="scope">

          <el-button
            type="text"
            size="small"
            @click="handeLookDetails(scope.row)"
          >审核</el-button>

        </template>
      </el-table-column>

    </el-table>

    <paging
      v-if="tableList.length"
      :page="paging.pageNum"
      :size="paging.pageSize"
      :count="total"
      @change="changePage"
    />

  </div>
</template>

<script>
import paging from '@/components/pages/pagination.vue'
import * as Api from '@/api/companyManagement'
import { setToken } from '@/utils/auth'

export default {
  components: {
    paging // 分页
  },
  data() {
    return {
      loading: false,
      ruleForm: {
        // 公司全称
        name: '',
        // 状态：1(待审核),2(已审核通过),3(审核不通过)
        recordStatusArray: []
      },
      // 状态数据
      recordStatusArrayData: [{
        name: '待审核',
        id: 1
      }, {
        name: '审核通过',
        id: 2
      }, {
        name: '审核不通过',
        id: 3
      }],
      tableList: [],
      form: {
        // 记录id
        customerId: '',
        // 示范工地资格：1是，0否
        isDemoSite: []
      },

      oldForm: {},
      // 示范资格-弹窗
      dialogQualifications: false,
      // 页码
      paging: {
        pageNum: 1,
        pageSize: 20
      },
      total: 0
    }
  },

  computed: {
  },
  watch: {},

  mounted() {},

  created() {
    this.handleSearch()
  },

  methods: {

    // 搜索
    handleSearch(formName) {
      this.paging.pageNum = 1
      const param = Object.assign({}, this.ruleForm, this.paging)
      // let param =Object.assign({},this.ruleForm,);
      this.oldForm = Object.assign({}, param)
      this.handleGetlist(this.oldForm)
    },

    // 重置
    resetForm(formName) {
      this.ruleForm = {
        // 公司全称
        name: '',
        // 状态：0待审核，1审核通过，2审核不通过
        recordStatusArray: []
      },
      this.handleSearch()
    },

    // 请求数据列表
    handleGetlist(param) {
      this.loading = true
      Api.getCustomerUpdateRecordSearch(param).then(res => {
        this.loading = false
        const { code, data, msg, total } = res
        if (code == 200) {
          this.tableList = data
          this.total = total
        }
      }).catch(error => {
        this.loading = false
        this.tableList = []
      })
    },

    // 审核点击
    handeLookDetails(item) {
      this.$router.push({
        name: 'dataAuditManagement_auditDetails',
        query: {
          customerId: item.customerId,
          id: item.id
        }
      })
    },

    // 页码
    changePage({ type, page, size }) {
      this.paging.pageNum = page
      this.paging.pageSize = size
      this.oldForm = Object.assign({}, this.oldForm, this.paging)
      this.handleGetlist(this.oldForm)
    }

  }
}
</script>

<style lang="scss" >
.companyManagementList {
  .el-date-editor .el-range-separator{
    width: auto;
  }
}
</style>
<style lang="scss" scoped>
.companyManagementList {
  padding: 20px;

  .w100.el-select{width:100px;}
  .w110.el-select{width:110px;}
  .w120.el-input--medium {width:110px;}
  .orderStatus {
  //  .el-form-item__content {width: 90% !important;}
   .el-form-item__content {width: calc(100% - 100px)};
  }
  .el-form{
    padding: 15px;
    padding-bottom:0;
    margin-bottom: 10px;
    background: #f7f7f7;
    border-radius:5px;
  }
  .btnWrap{
    padding: 5px 0;
    // background: #ddd;
  }
}
</style>
