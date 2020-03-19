// 人员列表 personnelDatabaseManagement
<template>
  <div class="contentWrap personnelDatabaseManagement">
    <el-form size="mini" :inline="true" :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="身份信息:" style="margin-bottom:0;" class="orderStatus">
          <el-checkbox-group 
            v-model="ruleForm.stationArray">
            <el-checkbox v-for="city in stationArrayData" :label="city.name" :key="city.id">{{city.name}}</el-checkbox>
          </el-checkbox-group>
      </el-form-item>
      
      <el-form-item label="人员状态:" style="margin-bottom:0;" class="orderStatus">
          <el-checkbox-group 
            v-model="ruleForm.isWorkArray">
            <el-checkbox v-for="city in isWorkArrayData" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
          </el-checkbox-group>
      </el-form-item>
      
      <el-form-item label="人员姓名:">
        <el-input 
          v-model="ruleForm.ename"
          placeholder="输入人员姓名"
        ></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="handleSearch('ruleForm')">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      size="mini" 
      v-loading="loading"
      style="width:100%;"
      border
      max-height="450"
      :data="tableList">

      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="50">
      </el-table-column>

      <el-table-column
        prop="ename"
        label="姓名"
        align="center"
        min-width="150">
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
        prop="sex"
        min-width="50"
        label="性别">
      </el-table-column>

      <el-table-column
        align="center"
        prop="idNum"
        min-width="150"
        label="身份证号">
      </el-table-column>

      <el-table-column
        align="center"
        prop="phone"
        min-width="120"
        label="主联系电话">
      </el-table-column>

      <el-table-column
        align="center"
        prop="phone2"
        min-width="120"
        label="辅联系电话">
      </el-table-column>

      <el-table-column
        align="center"
        prop="station"
        min-width="120"
        label="身份信息">
      </el-table-column>

      <el-table-column
        align="center"
        prop="isWork"
        min-width="70"
        label="人员状态">
        <template slot-scope="scope">
          {{
            scope.row.isWork == 0 ? "历史人员" :
            scope.row.isWork == 1 ? "在岗" : ""
          }}
          <!-- {{scope.row.createTime.substring(0,16)}} -->
        </template>
      </el-table-column>
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
            size="small">修改资料</el-button>
          <el-button
            @click="handeLookDetails(scope.row)"
            type="text"
            size="small">移到历史</el-button>
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
import * as Api from '@/api/personnelDatabaseManagement'
import { setToken } from '@/utils/auth'

export default {
  components: {
    paging //分页
  },
  data() {
    return {
      loading:false,
      ruleForm: {
        // 企业id
        customerId:'',
        // 身份信息
        stationArray:[],
        // 人员状态：0历史人员，1在岗
        isWorkArray:[],
        // 姓名 模糊查询
        ename:'',
      },
      // 身份信息
      stationArrayData:[{
          name:'工程人员',
          id:1
        },{
          name:'项目经理',
          id:2
        },{
          name:'施工队长',
          id:3
        },{
          name:'施工人员',
          id:4
        },{
          name:'临时人员',
          id:5
        }
      ],
      // 状态数据
      isWorkArrayData:[{
          name:'在岗人员',
          id:1
        },{
          name:'历史人员',
          id:0
        }
      ],
      tableList: [],
      form:{
        // 记录id
        customerId:'', 
        // 示范工地资格：1是，0否
        isDemoSite:[]
      },
      
      
      oldForm:{},
      // 示范资格-弹窗
      dialogQualifications:false,
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
      let param =Object.assign({},this.ruleForm, this.paging);
      // let param =Object.assign({},this.ruleForm,);
      this.oldForm = Object.assign({}, param);
      this.handleGetlist(this.oldForm);
    },

    // 重置
    resetForm(formName) {
      this.ruleForm = {
        // 企业id
        customerId:'',
        // 身份信息
        stationArray:[],
        // 人员状态：0历史人员，1在岗
        isWorkArray:[],
        // 姓名 模糊查询
        ename:'',
      },
      this.handleSearch();
    },

    // 请求数据列表
    handleGetlist(param){
      this.loading = true;
      Api.getCustomerUpdateRecordSearch(param).then(res => {
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

   
    // 审核点击
    handeLookDetails(item){
      this.$router.push({
        name:'dataAuditManagement_auditDetails',
        query:{
          customerId:item.customerId,
          id:item.id,
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
.personnelDatabaseManagement {
  .el-date-editor .el-range-separator{
    width: auto;
  }
}
</style>
<style lang="scss" scoped>
.personnelDatabaseManagement {
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
