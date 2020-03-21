// 公司详情 companyManagementdetails  
<template>
  <div class="contentWrap companyManagementdetails" v-loading="loading">
    <div class="contWrap">
      <el-form :model="ruleForm" :inline="true" ref="ruleForm" class="demo-ruleForm">
        <div class="borderbot1">
          <el-form-item label-width="150px" label="状态:" class="relative w100">
            <span class="btns btn10 left160" @click="handleGoBack">返回</span>
            <span class="cRed mrLeeft30">{{ruleForm.status ==0 ? '新注册，等待完善资料' : 
                                           ruleForm.status ==1 ? '待审核' :
                                           ruleForm.status ==2 ? '已审核通过' :
                                           ruleForm.status ==3 ? '审核不通过' : ''}}</span>

          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="公司全称:">
            <span class="inlineBlock">{{ruleForm.name}}</span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item v-show="newForm.name" label-width="150px" label="公司全称:">
            <span class="inlineBlock cRed">{{newForm.name}}</span>
          </el-form-item>
        </div>
        

        <!-- 分状态显示 -->
        <div class="borderbot1">
          <el-form-item label-width="150px" label="注册手机号:">
            <span class="inlineBlock">{{ruleForm.registerPhone}}</span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item v-show="newForm.registerPhone" label-width="150px" label="注册手机号:">
            <span class="inlineBlock cRed">{{newForm.registerPhone}}</span>
          </el-form-item>
        </div>
        
        <div class="borderbot1">
          <el-form-item label-width="150px" label="统一社会信用代码:">
            <span class="inlineBlock">{{ruleForm.creditCode}} </span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item v-show="newForm.creditCode" label-width="150px" label="统一社会信用代码:" >
            <span class="inlineBlock cRed">{{newForm.creditCode}} </span>
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="企业营业执照:">
            <img 
              alt="" 
              class="imgWrap"
              :src="ruleForm.businessLicense" 
              @click="handlePreviewImg(ruleForm.businessLicense,{ name:'统一社会信用代码', target:'ruleForm',tit:'creditCode'})">

          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item v-show="newForm.businessLicense" label-width="150px" label="企业营业执照:">
            <img 
              v-show="newForm.businessLicense"
              alt="" 
              class="imgWrap borderRed"
              :src="newForm.businessLicense" 
              @click="handlePreviewImg(newForm.businessLicense, { name:'统一社会信用代码', target:'newForm',tit:'creditCode'})">
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="企业法人:">
            <span class="inlineBlock">{{ruleForm.legalPerson}}</span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item v-show="newForm.legalPerson" label-width="150px" label="企业法人:">
            <span class="inlineBlock cRed">{{newForm.legalPerson}}</span>
          </el-form-item>
        </div>
        
        <div class="borderbot1">
          <el-form-item label-width="150px" label="法人身份证号:">
            <span class="inlineBlock">{{ruleForm.idNum}}</span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item v-show="newForm.idNum" label-width="150px" label="法人身份证号:">
            <span class="inlineBlock cRed">{{newForm.idNum}}</span>
          </el-form-item>
        </div>
        
        <div class="borderbot1">
          <el-form-item label-width="150px" label="企业法人证照:">
            <img 
              alt="" 
              class="imgWrap"
              :src="ruleForm.facePhoto" 
              @click="handlePreviewImg(ruleForm.facePhoto, { name:'法人身份证号', target:'ruleForm',tit:'idNum'})">
            <img 
              alt="" 
              class="imgWrap"
              :src="ruleForm.backPhoto" 
              @click="handlePreviewImg(ruleForm.backPhoto,{ name:'法人身份证号', target:'ruleForm',tit:'idNum'})">
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item v-show="(newForm.facePhoto || newForm.backPhoto )" label-width="150px" label="企业法人证照:">
            <img 
              v-show="newForm.facePhoto"
              alt="" 
              class="imgWrap borderRed"
              :src="newForm.facePhoto" 
              @click="handlePreviewImg(newForm.facePhoto,{ name:'法人身份证号', target:'newForm',tit:'idNum'})">
            <img 
              v-show="newForm.backPhoto"
              alt="" 
              class="imgWrap borderRed"
              :src="newForm.backPhoto" 
              @click="handlePreviewImg(newForm.backPhoto,{ name:'法人身份证号', target:'newForm',tit:'idNum'})">
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="企业联系电话:">
            <span class="inlineBlock">{{ruleForm.contactTel}} {{ruleForm.contactPhone}} </span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item v-show="(newForm.contactTel || newForm.contactPhone)" label-width="150px" label="企业联系电话:">
            <span class="inlineBlock cRed">{{newForm.contactTel}} {{newForm.contactPhone}} </span>
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="企业经营地址:">
            <span class="inlineBlock">
              {{ruleForm.provinceName}}{{ruleForm.cityName}} {{ruleForm.addr}}
            </span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item v-show="(newForm.provinceName || newForm.cityName || newForm.addr)" label-width="150px" label="企业经营地址:">
            <span class="inlineBlock cRed">
              {{newForm.provinceName}}{{newForm.cityName}} {{newForm.addr}}
             
            </span>
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="上海市装饰装修行业协会会员证书号:">
            <span class="inlineBlock">{{ruleForm.certificateNum}}</span>
          </el-form-item>
          <!--  更新后的  -->
          <el-form-item v-show="newForm.certificateNum" label-width="150px" label="上海市装饰装修行业协会会员证书号">
            <span class="inlineBlock cRed">{{newForm.certificateNum}}</span>
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="施工资质发放单位:">
            <span class="inlineBlock">{{ruleForm.qualificationUnit}}</span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item v-show="newForm.qualificationUnit" label-width="150px" label="'施工资质发放单位:">
            <span class="inlineBlock cRed">{{newForm.qualificationUnit}}</span>
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="施工资质或施工能力等级评价:">
            <span class="inlineBlock">{{ruleForm.qualificationGrade}}</span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item v-show="newForm.qualificationGrade" label-width="150px" label="施工资质或施工能力等级评价:">
            <span class="inlineBlock cRed">{{newForm.qualificationGrade}}</span>
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="施工资质证书编号:">
            <span class="inlineBlock">{{ruleForm.qualificationNum}}</span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item v-show="newForm.qualificationNum" label-width="150px" label="施工资质证书编号:">
            <span class="inlineBlock cRed">{{newForm.qualificationNum}}</span>
          </el-form-item>
        </div>

        <div class="borderbot1">
          <el-form-item label-width="150px" label="证书有效期:">
            <span class="inlineBlock">{{ruleForm.qualificationEffectEnddate}}</span>
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item v-show="newForm.qualificationEffectEnddate" label-width="150px" label="证书有效期:">
            <span class="inlineBlock cRed">{{newForm.qualificationEffectEnddate}}</span>
          </el-form-item>
        </div>

        <div :class="(ruleForm.status == 3 || ruleForm.status == 1 )? 'borderbot1' : ''">
          <el-form-item label-width="150px" label="施工能力等级/资质证书:">
            <img 
              alt="" 
              class="imgWrap"
              :src="ruleForm.qualificationPhoto" 
              @click="handlePreviewImg(ruleForm.qualificationPhoto,{ name:'施工资质证书编号', target:'ruleForm',tit:'qualificationNum'})">
          </el-form-item>
          <!-- 更新后的 -->
          <el-form-item v-show="newForm.qualificationPhoto" label-width="150px" label="施工能力等级/资质证书:">
            <img 
              v-show="newForm.qualificationPhoto"
              alt="" 
              class="imgWrap borderRed"
              :src="newForm.qualificationPhoto" 
              @click="handlePreviewImg(newForm.qualificationPhoto,{ name:'施工资质证书编号', target:'newForm',tit:'qualificationNum'})">
          </el-form-item>
        </div>

        
        <!-- 审核不通过时候显示 -->
        <div v-if="ruleForm.status == 3" class="borderbot1">
          <el-form-item  label-width="150px" label="审核意见:">
            <span class="inlineBlock">{{ruleForm.refuseType}}</span>
            <p>{{ruleForm.refuseReason}}</p>
          </el-form-item>
        </div>

        <div v-if="ruleForm.status == 1" class="borderbot1">
          <el-form-item  label-width="150px" label="示范资格:">
            <el-checkbox-group v-model="form.isDemoSite">
              <el-checkbox label="1" name="isDemoSite">有示范工地资格</el-checkbox>
              <!-- <el-checkbox label="0" name="isDemoSite">无示范工地资格</el-checkbox> -->
            </el-checkbox-group>
          </el-form-item>
        </div>
       
      </el-form>
      
    </div>

    <div class="footerBtn" v-if="ruleForm.status == 1">
      <span class="btns btn10" style="margin-right:20px" @click="handleAuditPassBtnClick">审核通过</span>
      <span class="btns btn10"  @click="handleRefuseToPassBtnClick">审核不通过</span>
      <!-- <p class="center lineHeight30 padTop22 cRed">审核通过后发送短信或电话通知，请留意信息与接听</p> -->
    </div>

    <!-- 图片预览弹窗 -->
    <el-dialog title="图片预览" :visible.sync="dialogTablePreview" class="previewImg">
      <p 
        class="previewImgTit"
        v-show="PreviewData.isShow">
        {{PreviewData.name}}：{{PreviewData.numbe}}
      </p>

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
        <span class="fl lineH30">不通过原因：</span>
        <div class="fl w300">
          <el-select v-model="form.refuseType" placeholder="请选择">
            <el-option
              v-for="(item,index) in rejectList"
              :key="item.dictionaryId"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <el-input 
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入"
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
import * as Api from '@/api/companyManagement'
import { setTimeout } from 'timers';
import imgUrl from '@/assets/null.png'


export default {
  components: {
  },
  data() {
    return {
      
      imgUrl:imgUrl,
      loading:false,
      // 未修改前的数据
      ruleForm:{},
      // 修改过得 列表数据
      newForm:{},
      // 拒绝原因 (这里) 
      rejectList:[],

      // 不通过提交表单
      form:{
        // 企业id
        customerId:'',
        // 拒绝下拉框，审核通过时可不传
        refuseType:'',
        // 拒绝原因，审核通过时可不传
        refuseReason:'',
        // 状态：2(已审核通过),3(审核不通过)
        status:'',
        // 是否示范工地：1是，0否
        isDemoSite:[]
      },
      
     
      // 预览弹窗
      dialogTablePreview: false,
      // 确定注册弹窗
      dialogSubmitModal:false,
      // 拒绝弹窗
      dialogRefuseToPassModal:false,
      // 图片预览地址
      PreviewImgUrl:'',
      // 预览数据
      PreviewData:{
        // 是否显示
        isShow:false,
        // 显示名字
        name:'',
        // 显示码
        numbe:''
      },
      num:0,
    };
  },

  mounted() {},
  watch:{},

  created() {
    // 企业id 
    this.form.customerId = this.$route.query.customerId;
    this.init();
  },

  methods: {

    init(){
      // 获取详情
      this.handleGetDetail()
      // 获取拒绝原因列表
      this.handleGetListTypeid4()
    },

    // 获取详情
    handleGetDetail(){
      let param = this.form.customerId;
      Api.getCustomerGetById(param).then(res => {
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.ruleForm = data

          // 模拟数据
          // this.ruleForm.businessLicense = "https://ywt-oss-files.oss-cn-hangzhou.aliyuncs.com/ywt/images/1584427321288.png"
          // this.ruleForm.facePhoto = "https://ywt-oss-files.oss-cn-hangzhou.aliyuncs.com/ywt/images/1584427321288.png"
          // this.ruleForm.qualificationPhoto = "https://ywt-oss-files.oss-cn-hangzhou.aliyuncs.com/ywt/images/1584427321288.png"
          // this.ruleForm.backPhoto = "https://ywt-oss-files.oss-cn-hangzhou.aliyuncs.com/ywt/images/1584427321288.png"
          // this.ruleForm.qualificationNum = "11111"
          // this.ruleForm.idNum = "1122222111"

          
          // this.newForm = Object.assign({},JSON.parse(JSON.stringify(data)))
        }
      }).catch( error => {
        
      })
    },

    // 获取拒绝原因列表
    handleGetListTypeid4(){
      Api.getListTypeid4().then(res => {
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.rejectList = data
        }
      }).catch( error => {
        
      })
    },

   
    
    // 审核通过点击事件  
    handleAuditPassBtnClick(){
      // 审核通过弹窗显示
      this.dialogSubmitModal = true
    },

    // 审核不通过 按钮点击事件
    handleRefuseToPassBtnClick(){
      // 拒绝注册弹窗显示
      this.dialogRefuseToPassModal = true
    },

    // 弹窗审核通过提交
    handleSubmit(){
      let param = {
        customerId:this.form.customerId,
        // 状态：2(已审核通过),3(审核不通过)
        status:2,
        isDemoSite:''
      }
      if(this.form.isDemoSite.length){
        param.isDemoSite = 1
      }else{
        param.isDemoSite = 0
      }
      // console.log(param)
      Api.subCustomerAudit(param).then(res => {
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
        this.dialogSubmitModal = false
      })
    },
    // 弹窗拒绝提交
    handleRefuseToPassSubmit(){
      let param = {
        customerId:this.form.customerId,
        // 状态：2(已审核通过),3(审核不通过)
        status:3,
        refuseType:this.form.refuseType,
        refuseReason:this.form.refuseReason,
      }
      // console.log(param)
      if(!param.refuseType){
        return this.$message({
            message: '请选择不通过原因',
            type: 'warning'
          });
      }
      if(!param.refuseReason){
        return this.$message({
            message: '请选输入原因',
            type: 'warning'
          });
      }
      Api.subCustomerAudit(param).then(res => {
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
        this.dialogRefuseToPassModal = false
      })
    },
   
    // 返回
    handleGoBack(){
      this.$router.back(-1)
    },

    // 图片预览
    // handlePreviewImg(imgUrl){
    //   this.PreviewImgUrl = imgUrl.url || imgUrl ;
    //   this.dialogTablePreview = true
    // },
    // 图片预览 data { name:'统一社会信用代码', target:ruleForm,(对应数据) tit:'creditCode'(对应字段)}   
    handlePreviewImg(imgUrl,data){
      // console.log(data)
      // console.log(this[data.target][data.tit])
      // { "name":'统一社会信用代码',tit:'creditCode', target:'old'}
      // 重置状态
      this.PreviewData={
        // 是否显示 默认不显示
        isShow:false,
        // 显示名字
        name:'',
        // 显示码
        numbe:'',
      }
      
      if(data){
          this.PreviewData.name = data.name
          this.PreviewData.numbe = this[data.target][data.tit] ? this[data.target][data.tit] : this.ruleForm[data.tit]
          this.PreviewData.isShow = this.PreviewData.numbe ? true : false 
      }

      this.PreviewImgUrl = imgUrl.url || imgUrl ;
      // 显示弹窗
      this.dialogTablePreview = true

      // console.log(this.PreviewData)

    },
  },
  computed: {}
}
</script>
<style lang="scss">
.companyManagementdetails{
  min-width:900px;
  margin: 0 auto;

  .el-form--inline .el-form-item{
    width: 49%; 
    width: 95%;
    margin: 0; min-width: 300px;}
  .el-form--inline .el-form-item.w100{
    width: 100%;
  }
  
  .el-autocomplete{
    width: 100%;
  }
  .el-form-item--medium .el-form-item__content {
      position:relative;
      // width: 50%;
      width: calc(100% - 150px);
      // min-width: 300px;
      // max-width: 600px;
      line-height: 36px;
      // vertical-align: bottom;
  }

  .previewImg {
    .el-dialog__body{padding-top: 0;}
  }
 
  
  
}

</style>

<style lang="scss" scoped>
  @import './companyManagement.scss';
  .companyManagementdetails{
    .el-form--inline .el-form-item{
      // border-bottom: 1px dashed #ccc;
      // padding: 12px 0;
      padding: 3px 0;
      margin: 0;
    }
  }
  

</style>
