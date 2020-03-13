// 公司管理
<template>
  <div class="contentWrap companyManagementList">
    <el-form :inline="true" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      
      <el-form-item label="公司全称:" prop="serialNumber">
        <el-input 
          v-model="ruleForm.serialNumber"
          placeholder="公司全称"
        ></el-input>
      </el-form-item>

      
      <el-form-item>
        <el-button type="primary" @click="handleSearch('ruleForm')">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

      <el-form-item label="状态:" label-width="100px" style="width: 100%; margin-bottom:0;" prop="connectStatus" class="orderStatus">
          <el-checkbox-group 
            v-model="ruleForm.connectStatus">
            <el-checkbox v-for="city in connectStatusData" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
          </el-checkbox-group>
      </el-form-item>

    </el-form>

   
    <el-table
      v-loading="loading"
      style="width:100%;"
      border
      max-height="450"
      :data="tableList">

      <el-table-column
        type="index"
        label="序号"
        fixed="left"
        align="center"
        width="50">
      </el-table-column>

      <el-table-column
        prop="serialNumber"
        label="公司全称"
        align="center"
        min-width="150">
        <!-- <template slot-scope="scope">
          <el-button
            @click.native.prevent="handeLookDetails(scope.row)"
            type="text"
            size="small">
            {{scope.row.serialNumber}}
          </el-button>
        </template> -->
      </el-table-column>

      <el-table-column
        align="center"
        prop="paymentAmount"
        min-width="120"
        label="注册手机号">
      </el-table-column>

      <el-table-column
        align="center"
        prop="businessTypeName"
        min-width="120"
        label="统一社会信用代码">
      </el-table-column>

      <el-table-column
        align="center"
        prop="customer"
        min-width="150"
        label="法人代表">
      </el-table-column>
      <!-- <el-table-column
        align="center"
        prop="customer"
        min-width="150"
        label="企业联系电话">
      </el-table-column> -->

      <el-table-column
        align="center"
        prop="businessType"
        min-width="120"
        label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.businessType ==1 ? '待审核' : 
                  scope.row.businessType ==2 ? '已审核' : ''}}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="paymentTime"
        label="创建时间"
        min-width="100">
      </el-table-column>

      <!-- <el-table-column
        align="center"
        prop="createUser"
        min-width="100"
        label="创建人">
      </el-table-column> -->
      <!-- 操作 -->
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="120">
        <template slot-scope="scope">
            
          <el-button
            @click="handeLookDetails(scope.row)"
            type="text"
            size="small">基本信息</el-button>
           
        </template>
      </el-table-column>
     
    </el-table>

    <paging
      v-if="tableList.length"
      :page="paging.pageNum"
      :size="paging.pageSize"
      :count="total"
      @change="changePage"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/pages/pagination.vue";
import * as Api from '@/api/registrationInforMange'
import { setToken } from '@/utils/auth'

export default {
  components: {
    paging //分页
  },
  data() {
    return {
      loading:false,
      ruleForm: {
        // 公司全称
        serialNumber:'',
        // 状态：0待审核，1审核通过，2审核不通过
        connectStatus: [],
        
      },
      // 状态数据
      connectStatusData:[{
          name:'待审核',
          id:'0'
        },{
          name:'审核通过',
          id:'1'
        },{
          name:'审核不通过',
          id:'2'
        }],
      tableList: [],
      
      oldForm:{},
      // 页码
      paging: {
        pageNum: 1,
        pageSize: 20
      },
      total: 0,
    };
  },
  watch:{},

  mounted() {},


  created(){
      this.handleSearch()
  },

  methods: {
    
    // 搜索
    handleSearch(formName) {
      this.paging.pageNum =1;
      let connectStatus = this.ruleForm.connectStatus.join(',');
      let param =Object.assign({},this.ruleForm,
                               {connectStatus:connectStatus},
                               this.paging);
      this.oldForm = Object.assign({}, param);
      this.handleGetlist(this.oldForm);
    },
    // 重置
    resetForm(formName) {
      this.ruleForm = {
        // 公司全称
        serialNumber:'',
        // 状态：0待审核，1审核通过，2审核不通过
        connectStatus: [],
      },
      this.handleSearch();
    },
    // 请求数据列表
    handleGetlist(param){
      this.loading = true;
      Api.financeManage_search(param).then(res => {
        this.loading = false;
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.tableList = data;
          this.total = total;
        }
      }).catch( error => {
        this.loading = false;
        this.tableList=[];
      })
    },

   
    // 查看基本信息
    handeLookDetails(item){
      this.$router.push({
        name:'companyManagement_auditDetails',
        query:{
          paymentId:item.paymentId,
        }
      })
    },

    // 页码
    changePage({ type, page, size }) {
      this.paging.pageNum = page;
      this.paging.pageSize = size;
      this.oldForm = Object.assign({}, this.oldForm, this.paging);
      this.handleGetlist(this.oldForm);
    },

    
  },
  
  computed: {
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
