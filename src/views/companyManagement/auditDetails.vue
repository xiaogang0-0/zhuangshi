// 公司详情 companyManagementdetails
<template>
  <div class="contentWrap companyManagementdetails" v-loading="loading">
    
    
    <div class="contWrap" >
      <!-- <span class="btns btn10 " @click="handleGoBack">返回</span> -->
      <!-- <p class="statusTit">状态：<span class="cRed">审核通过</span></p> -->
      <el-form :model="ruleForm" :inline="true" ref="ruleForm" class="demo-ruleForm">
        <div class="borderbot1">
          <el-form-item label-width="150px" label="状态:" class="relative w100">
            <span class="btns btn10 left160" @click="handleGoBack">返回</span>
            <span class="cRed mrLeeft30">审核通过1</span>
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="公司全称:">
            <span class="inlineBlock">{{ruleForm.fullName}}</span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item label-width="150px" :label="newForm.fullName ? '公司全称:' : ''">
            <span class="inlineBlock cRed">{{newForm.fullName}}</span>
          </el-form-item>
        </div>
        

        <!-- 分状态显示 -->
        <div class="borderbot1">
          <el-form-item label-width="150px" label="注册手机号:">
            <span class="inlineBlock">{{ruleForm.fullName}}</span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item label-width="150px" :label="newForm.fullName ? '注册手机号:' : ''">
            <span class="inlineBlock cRed">{{newForm.fullName}}</span>
          </el-form-item>
        </div>
        
        <div class="borderbot1">
          <el-form-item label-width="150px" label="统一信用代码:">
            <span class="inlineBlock">{{ruleForm.invoiceNum}} </span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item label-width="150px" :label="newForm.invoiceNum ? '统一信用代码:' : ''" >
            <span class="inlineBlock cRed">{{newForm.invoiceNum}} </span>
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="企业营业执照:">
            <img 
              alt="" 
              class="imgWrap"
              v-for="(ele, index2) in ruleForm.businessLicense"
              :key="index2+ele"
              :src="ele.url" 
              @click="handlePreviewImg(ele.url)">
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item label-width="150px" :label="newForm.businessLicense.length ? '企业营业执照:' : ''">
            <img 
              alt="" 
              class="imgWrap borderRed"
              v-for="(ele, index2) in newForm.businessLicense"
              :key="index2+ele"
              :src="ele.url" 
              @click="handlePreviewImg(ele.url)">
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="企业法人:">
            <span class="inlineBlock">{{ruleForm.invoiceBank}}</span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item label-width="150px" :label="newForm.invoiceBank ? '企业法人:' : ''">
            <span class="inlineBlock cRed">{{newForm.invoiceBank}}</span>
          </el-form-item>
        </div>
        
        <div class="borderbot1">
          <el-form-item label-width="150px" label="法人身份证号:">
            <span class="inlineBlock">{{ruleForm.title}}</span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item label-width="150px" :label="newForm.title ? '法人身份证号:' : ''">
            <span class="inlineBlock cRed">{{newForm.title}}</span>
          </el-form-item>
        </div>
        
        <div class="borderbot1">
          <el-form-item label-width="150px" label="法人证照:">
            <img 
              alt="" 
              class="imgWrap"
              v-for="(ele, index1) in ruleForm.invoiceBankNum"
              :key="index1+ele"
              :src="ele.url" 
              @click="handlePreviewImg(ele.url)">
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item label-width="150px" :label="newForm.invoiceBankNum.length ? '法人证照:' : ''">
            <img 
              alt="" 
              class="imgWrap borderRed"
              v-for="(ele, index1) in newForm.invoiceBankNum"
              :key="index1+ele"
              :src="ele.url" 
              @click="handlePreviewImg(ele.url)">
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="企业联系电话:">
            <span class="inlineBlock">{{ ruleForm.mobile ? ruleForm.areaCode + '-' + ruleForm.mobile : ' '}} {{ruleForm.mobilePhone}} </span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item label-width="150px" :label="newForm.mobile ? '企业联系电话:':
                                                    newForm.mobilePhone ? '企业联系电话:' : ''">
            <span class="inlineBlock cRed">{{ newForm.mobile ? newForm.areaCode + '-' + newForm.mobile : ' '}} {{newForm.mobilePhone}} </span>
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="企业经营地址:">
            <span class="inlineBlock">
              {{ruleForm.address[0] ? ruleForm.address[0]  + ruleForm.address[1] + ruleForm.address[2] : ''}}
              {{ruleForm.address_1}}
            </span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item label-width="150px" :label="newForm.address.length ? '企业经营地址:' : ''">
            <span class="inlineBlock cRed">
              {{newForm.address[0] ? newForm.address[0]  + newForm.address[1] + newForm.address[2] : ''}}
              {{newForm.address_1}}
            </span>
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="上海市装饰装修行业协会会员证书号:">
            <span class="inlineBlock">{{ruleForm.invoiceAmount}}</span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item label-width="150px" :label="newForm.invoiceAmount ? '上海市装饰装修行业协会会员证书号:' : ''">
            <span class="inlineBlock cRed">{{newForm.invoiceAmount}}</span>
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="施工资质发放单位:">
            <span class="inlineBlock">{{ruleForm.invoiceType}}</span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item label-width="150px" :label="newForm.invoiceType ? '施工资质发放单位:' : ''">
            <span class="inlineBlock cRed">{{newForm.invoiceType}}</span>
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="施工资质证书编号:">
            <span class="inlineBlock">{{ruleForm.taxNumber}}</span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item label-width="150px" :label="newForm.taxNumber ? '施工资质证书编号:' : ''">
            <span class="inlineBlock cRed">{{newForm.taxNumber}}</span>
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="证书有效期:">
            <span class="inlineBlock">{{ruleForm.invoiceTime}}</span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item label-width="150px" :label="newForm.invoiceTime ? '证书有效期:' : ''">
            <span class="inlineBlock cRed">{{newForm.invoiceTime}}</span>
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="施工资质或施工能力等级评价:">
            <span class="inlineBlock">{{ruleForm.invoiceAddress}}</span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item label-width="150px" :label="newForm.invoiceAddress ? '施工资质或施工能力等级评价:' : ''">
            <span class="inlineBlock cRed">{{newForm.invoiceAddress}}</span>
          </el-form-item>
        </div>
        <!-- 这里的class需要和线面的 原因显示 走相反的判断 -->
        <div :class="true ? 'borderbot1' : 'borderbot1'">
          <el-form-item label-width="150px" label="施工资质证书:">
            <img 
              alt="" 
              class="imgWrap"
              v-for="(ele, index1) in ruleForm.img"
              :key="index1+ele"
              :src="ele.url" 
              @click="handlePreviewImg(ele.url)">
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item label-width="150px" :label="newForm.img.length ? '施工资质证书:' : ''">
            <img 
              alt="" 
              class="imgWrap borderRed"
              v-for="(ele, index1) in newForm.img"
              :key="index1+ele"
              :src="ele.url" 
              @click="handlePreviewImg(ele.url)">
          </el-form-item>
        </div>

        
        <!-- 审核不通过时候显示 -->
        <el-form-item label-width="150px" label="审核意见:">
          <span class="inlineBlock">不通过原因一</span>
          <p>不通过原因一33333</p>
        </el-form-item>
       
      </el-form>
      
    </div>

    <div class="footerBtn" v-if="true">
      <span class="btns btn10" style="margin-right:20px" @click="handleAuditPassBtnClick">审核通过</span>
      <span class="btns btn10"  @click="handleRefuseToPassBtnClick">审核不通过</span>
      <!-- <p class="center lineHeight30 padTop22 cRed">审核通过后发送短信或电话通知，请留意信息与接听</p> -->
    </div>

    <!-- 图片预览弹窗 -->
    <el-dialog title="图片预览" :visible.sync="dialogTablePreview" class="previewImg">
      <img :src="PreviewImgUrl" alt="">
    </el-dialog>

    <!-- 审核通过_温馨提示 -->
    <el-dialog
      title="温馨提示"
      center
      :visible.sync="dialogSubmitModal"
      width="400px"
      class="submitModal">
      <span class="text">您确认提交吗？</span>
      <span slot="footer" class="dialog-footer">
        
        <el-button @click="dialogSubmitModal = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 拒绝通过弹窗 -->
    <el-dialog
      title="不通过原因"
      center
      :visible.sync="dialogRefuseToPassModal"
      width="500px"
      class="">
      <div class="refuse overflow">
        <span class="fl lineH30">驳回原因：</span>
        <div class="fl w300">
          <el-select v-model="form.refuseType" placeholder="请选择">
            <el-option
              v-for="(item,index) in rejectList"
              :key="index"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <el-input 
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请填写不通过原因"
            maxlength=""
            class="marTop12"
            v-model="form.refuseReason">
          </el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        
        <el-button @click="dialogRefuseToPassModal = false">取 消</el-button>
        <el-button type="primary" @click="handleRefuseToPassSubmit">确 定</el-button>
      </span>
    </el-dialog>
</div>
    
</template>

<script>
import * as Api from '@/api/registrationInforMange'
import { setTimeout } from 'timers';
import imgUrl from '@/assets/null.png'


export default {
  components: {
  },
  data() {
    return {
      
      imgUrl:imgUrl,
      loading:false,
      // 不通过提交表单
      form:{
        // 不通过类型
        refuseType:'',
        // 不通过原因
        refuseReason:'',
      },
      // 修改过得 列表数据
      newForm:{
        // 全称
        fullName:'1',
        // 企业营业执照  img
        businessLicense:[
          {
            name:'1',
            url:imgUrl
          }
        ],
        // 统一信用代码
        invoiceNum:'222222222',
        // 区号
        areaCode:"010",
        // 电话
        mobile:'1111111',
        // 手机
        mobilePhone:"18801012555",
        // 地址
        address:["shengfen0", "城市0", "xianji0"],
        // 详细地址
        address_1:'',
        // 上海市装饰装修行业协会会员证书号
        invoiceAmount:'',
        // 上传施工资质证书  img
        img:[],
        // 施工资质发放单位
        invoiceType:'',   // 0,1
        // 施工资质或施工能力等级评价
        invoiceAddress:'', // 0,1
        // 施工资质证书编号
        taxNumber:'', 
        // 证书有效期
        invoiceTime:'',
        // 企业法人
        invoiceBank:'',
        // 法人身份证号
        title:'',
        // 法人证照 img
        invoiceBankNum:[],
       
      },
      // 拒绝原因 (这里) 
      rejectList:[
        {
          name:'这里有两个原因 需要根据进来的地址进行区分 获取',
          code:'1'
        },
        {
          name:'原因2',
          code:'2'
        }
      ],
      // 未修改前的数据
      ruleForm:{
        // 全称
        fullName:'',
        // 企业营业执照  img
        businessLicense:[
          {
            name:'1',
            url:imgUrl
          }
        ],
        // 统一信用代码
        invoiceNum:'222222222',
        // 区号
        areaCode:"010",
        // 电话
        mobile:'1111111',
        // 手机
        mobilePhone:"18801012555",
        // 地址
        address:["shengfen0", "城市0", "xianji0"],
        // 详细地址
        address_1:'',
        // 上海市装饰装修行业协会会员证书号
        invoiceAmount:'',
        // 上传施工资质证书  img
        img:[],
        // 施工资质发放单位
        invoiceType:'',   // 0,1
        // 施工资质或施工能力等级评价
        invoiceAddress:'', // 0,1
        // 施工资质证书编号
        taxNumber:'', 
        // 证书有效期
        invoiceTime:'',
        // 企业法人
        invoiceBank:'',
        // 法人身份证号
        title:'',
        // 法人证照 img
        invoiceBankNum:[],
       
      },
     
      // 预览弹窗
      dialogTablePreview: false,
      // 确定注册弹窗
      dialogSubmitModal:false,
      // 拒绝弹窗
      dialogRefuseToPassModal:false,
      // 图片预览地址
      PreviewImgUrl:'',
      num:0,
    };
  },

  mounted() {
    // 获取抬头列表
    // this.handleInvoiceRiseList()
  },
  watch:{},



  

  created() {
    // let date = sessionStorage.getItem('siw_companyManagement)
    // sessionStorage.removeItem('siw_companyManagement)
    // if(date){
    //   date = JSON.parse(date)
    // }
  },

  methods: {
    // 提交验证函数
    handleSubmitValidation(){
      let onOff = true;
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          onOff = true;
        } else {
          // console.log('error submit!!');
          this.$message({
            message: '请将注册信息填写完整！',
            type: 'warning'
          });
          onOff = false;
        }
      });
      return onOff
    },
    // 审核不通过 按钮点击事件
    handleRefuseToPassBtnClick(){
      // 拒绝注册弹窗显示
      this.dialogRefuseToPassModal = true
    },
    // 确定注册点击事件  
    handleAuditPassBtnClick(){
      // 确认注册弹窗显示
      this.dialogSubmitModal = true
    },

    // 弹窗注册提交
    handleSubmit(){
      let param = Object.assign({},JSON.parse(JSON.stringify(this.ruleForm))) 
      this.loading = true;
      Api.invoicerrManager_saveInvoice(param).then(res => {
        this.loading = false;
        this.dialogSubmitModal = false
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.$message({
            message: msg,
            type: 'success'
          });
          setTimeout(() => {
            this.handleGoBack()
          }, 1500);
        }
      }).catch( error => {
        this.loading = false;
        this.dialogSubmitModal = false
      })
    },
    // 弹窗拒绝提交
    handleRefuseToPassSubmit(){
      let param = Object.assign({},JSON.parse(JSON.stringify(this.form))) 
      this.loading = true;
      Api.orderCorrelation_InvoiceCorrelationDetail().then(res => {
        this.loading = false;
        this.dialogRefuseToPassModal = false
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.$message({
            message: msg,
            type: 'success'
          });
          setTimeout(() => {
            this.handleGoBack()
          }, 1500);
        }
      }).catch( error => {
        this.loading = false;
        this.dialogRefuseToPassModal = false
      })
    },
   
    // 返回
    handleGoBack(){
      this.$router.back(-1)
    },

    // 图片预览
    handlePreviewImg(imgUrl){
      this.PreviewImgUrl = imgUrl.url || imgUrl ;
      this.dialogTablePreview = true
    },
    

    
 
    
  

    

    
  },
  computed: {}
}
</script>
<style lang="scss">
.companyManagementdetails{
  min-width:900px;
  margin: 0 auto;

  .el-form--inline .el-form-item{width: 49%; margin: 0;; min-width: 300px;}
  .el-form--inline .el-form-item.w100{
    width: 100%;
  }
  
  .el-autocomplete{
    width: 100%;
  }
  .el-form-item--medium .el-form-item__content {
      position:relative;
      width: 50%;
      min-width: 300px;
      max-width: 600px;
      line-height: 36px;
      // vertical-align: bottom;
  }
 
  
  
}

</style>

<style lang="scss" scoped>
  @import './companyManagement.scss';
  .companyManagementdetails{
    .el-form--inline .el-form-item{
      // border-bottom: 1px dashed #ccc;
      padding: 12px 0;
      margin: 0;
    }
  }
  

</style>
