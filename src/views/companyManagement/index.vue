// 公司管理
<template>
  <div class="contentWrap companyManagementList">
    <el-form ref="ruleForm" size="mini" :inline="true" :model="ruleForm" class="demo-ruleForm">

      <el-form-item label="公司全称:" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="公司全称"
        />
      </el-form-item>

      <el-form-item label="创建时间:">
        <el-date-picker
          v-model="establishDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSearch('ruleForm')">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

      <el-form-item label="状态:" style="width: 100%; margin-bottom:0;" prop="statusArray" class="orderStatus">
        <el-checkbox-group
          v-model="ruleForm.statusArray"
        >
          <el-checkbox v-for="city in statusArrayData" :key="city.id" :label="city.id">{{ city.name }}</el-checkbox>
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
        fixed="left"
        align="center"
        width="50"
      />

      <el-table-column
        prop="name"
        label="公司全称"
        align="center"
        min-width="140"
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
        min-width="95"
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
        min-width="95"
        label="企业联系电话"
      />

      <el-table-column
        align="center"
        prop="certificateNum"
        min-width="95"
        label="会员证书号"
      />

      <el-table-column
        align="center"
        prop="certificateNumEffectEnddate"
        min-width="95"
        label="会员有效期"
      />

      <el-table-column
        align="center"
        prop="status"
        min-width="80"
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
          <span>{{ scope.row.createTime.substring(0,16) }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="updateTime"
        label="修改时间"
        min-width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime.substring(0,16) }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="auditTime"
        label="审核时间"
        min-width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.auditTime.substring(0,16) }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="isDemoSite"
        min-width="100"
        label="示范工地资格"
      >
        <template slot-scope="scope">
          <!-- / 示范工地资格：1是，0否-->
          <span>{{ scope.row.isDemoSite ==1 ? '是' :
            scope.row.isDemoSite ==0 ? '否' : '' }}
          </span>
        </template>
      </el-table-column>
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
          >基本信息</el-button>
          <div>
            <el-button
              type="text"
              size="small"
              @click="handleQualifications(scope.row)"
            >示范资格</el-button>
          </div>

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

    <!-- 示范资格变更弹窗 -->
    <el-dialog
      title="示范资格变更"
      center
      :visible.sync="dialogQualifications"
      width="335px"
      class=""
    >
      <div class="refuse overflow">
        <!-- <span class="fl lineH30">有示范工地资格</span> -->
        <div class="fl w300">
          <el-checkbox-group v-model="form.isDemoSite">
            <el-checkbox label="1" name="isDemoSite">有示范工地资格</el-checkbox>
            <!-- <el-checkbox label="0" name="isDemoSite">无示范工地资格</el-checkbox> -->
          </el-checkbox-group>

        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogQualifications = false">取 消</el-button>
        <el-button type="primary" @click="handleQualificationsSubmit">提 交</el-button>
      </span>
    </el-dialog>
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
        // 开始日期
        startTime: '',
        // 结束日期
        endTime: '',
        // 状态：1(待审核),2(已审核通过),3(审核不通过)
        statusArray: []
      },
      // 状态数据
      statusArrayData: [{
        name: '待审核',
        id: 1
      }, {
        name: '审核通过',
        id: 2
      }, {
        name: '审核不通过',
        id: 3
      }],
      // 创建时间
      establishDate: '',
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
  watch: {
    // 时间变化的时候重置 记录数组
    'establishDate': {
      handler(newName, oldName) {
        this.handleSelectionTime()
      },
      immediate: true
    }
  },

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
        // 开始日期
        startTime: '',
        // 结束日期
        endTime: '',
        // 状态：0待审核，1审核通过，2审核不通过
        statusArray: []
      },
      this.establishDate = ''
      this.handleSearch()
    },

    // 请求数据列表
    handleGetlist(param) {
      this.loading = true
      Api.getUserCustomerSearch(param).then(res => {
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

    // 示范资格
    handleQualifications(item) {
      this.form.customerId = item.customerId

      if (item.isDemoSite == 1) {
        this.form.isDemoSite.push('1')
      } else {
        this.form.isDemoSite = []
      } // 示范资格-弹窗
      this.dialogQualifications = true
    },

    // 弹窗示范资格提交
    handleQualificationsSubmit() {
      const param = Object.assign({}, JSON.parse(JSON.stringify(this.form)))
      if (param.isDemoSite.length) {
        param.isDemoSite = 1
      } else {
        param.isDemoSite = 0
      }
      Api.setUpdateCustomerDemoSite(param).then(res => {
        this.dialogQualifications = false
        const { code, data, msg, total } = res
        if (code == 200) {
          this.$message({
            message: msg,
            type: 'success'
          })
          setTimeout(() => {
            this.handleGetlist(this.oldForm)
          }, 200)
        }
      }).catch(error => {
        this.dialogQualifications = false
      })
    },

    // 查看基本信息
    handeLookDetails(item) {
      this.$router.push({
        name: 'companyManagement_auditDetails',
        query: {
          customerId: item.customerId
          // status 1 是 查看详情 2 是审核
          // status:'1'
        }
      })
    },

    // 时间选中事件
    handleSelectionTime() {
      // console.log(this.establishDate,'22222')
      if (this.establishDate && this.establishDate.length) {
        // this.ruleForm.startTime = this.establishDate[0].substring(0,10) + ' 00:00:00';
        // this.ruleForm.endTime = this.establishDate[1].substring(0,10) + ' 23:59:59';
        this.ruleForm.startTime = this.establishDate[0].substring(0, 10)
        this.ruleForm.endTime = this.establishDate[1].substring(0, 10)
      } else {
        this.ruleForm.startTime = ''
        this.ruleForm.endTime = ''
      }
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

  .el-range-editor.el-input__inner {
    width: 240px;
  }
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
