// 编辑注册资料 registrationInforMange
<template>
  <div class="contentWrap registrationInforMange">
    
    
    <div class="contWrap" >
      <!-- <p class="statusTit">状态：<span class="cRed">审核通过</span></p> -->
      <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label-width="150px" label="状态:">
          <span class="cRed mrLeeft30">审核通过</span>
        </el-form-item>

        <el-form-item label-width="150px" label="公司全称:" prop="fullName">
          <el-input  v-if="editStatus.status1" v-model.trim="ruleForm.fullName" clearable placeholder="公司全称"></el-input>
          <span v-else class="inlineBlock">{{ruleForm.fullName}}</span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status1')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="统一信用代码:" prop="invoiceNum">
          <el-input v-if="editStatus.status2" v-model.trim="ruleForm.invoiceNum" clearable placeholder="请输入统一信用代码"></el-input>
          <span v-else class="inlineBlock">{{ruleForm.invoiceNum}} </span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status2')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="企业营业执照:" prop="businessLicense" >
          <!-- <img v-if="!editStatus.status1" :src="imgUrl" alt="" class="imgWrap" @click="handlePreviewImg(ruleForm.businessLicense.url)"> -->
          <img 
            alt="" 
            class="imgWrap"
            v-for="(ele, index2) in ruleForm.businessLicense"
            :key="index2+ele"
            :src="ele.url" 
            @click="handlePreviewImg(ele.url)">
          <span 
            v-if="editStatus.status3"
            class="btn"
            @click="handleUploadModal(ruleForm.businessLicense,1)">&nbsp;&nbsp;点击更换&nbsp;&nbsp;</span>
          <span v-else class="inlineBlock"></span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status3')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="企业法人:" prop="invoiceBank">
          <el-input v-if="editStatus.status4" v-model.trim="ruleForm.invoiceBank" clearable placeholder="请输入企业法人"></el-input>
          <span v-else class="inlineBlock">{{ruleForm.invoiceBank}}</span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status4')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="法人身份证号:" prop="title">
          <el-input v-if="editStatus.status5" v-model.trim="ruleForm.title" clearable placeholder="请输入法人身份证号"></el-input>
          <span v-else class="inlineBlock">{{ruleForm.title}}</span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status5')">编辑</span>
        </el-form-item>
        
        <el-form-item label-width="150px" label="法人证照:" prop="invoiceBankNum">
          <img 
            alt="" 
            class="imgWrap"
            v-for="(ele, index1) in ruleForm.invoiceBankNum"
            :key="index1+ele"
            :src="ele.url" 
            @click="handlePreviewImg(ele.url)">
          <span 
            v-if="editStatus.status6"
            class="btn"
            @click="handleUploadModal(ruleForm.invoiceBankNum,2)">&nbsp;&nbsp;点击更换&nbsp;&nbsp;</span>
          <span v-else class="inlineBlock"></span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status6')">编辑</span>
          <!-- <span 
              class="btn"
              v-for="(ele, index2) in ruleForm.invoiceBankNum"
              :key="index2+ele"
              @click="handlePreviewImg(ele.url)">法人证照{{index2+1}}</span> -->
        </el-form-item>

        <el-form-item label-width="150px" label="企业联系电话:" prop="mobile">
          <span v-if="editStatus.status7">
             <el-input v-model.trim="ruleForm.areaCode" clearable placeholder="区号" class="w111"></el-input>
             <el-input v-model.trim="ruleForm.mobile" clearable placeholder="固定号码" class="w112"></el-input>
             <span class="padlr5">或</span>
             <el-input v-model.trim="ruleForm.mobilePhone" clearable placeholder="输入手机号" class="w113"></el-input>
          </span>

          <span v-else class="inlineBlock">{{ ruleForm.mobile ? ruleForm.areaCode + '-' + ruleForm.mobile : ' '}} {{ruleForm.mobilePhone}} </span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status7')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="企业经营地址:" prop="address">
          <div  v-if="editStatus.status8">
            <el-cascader
              class="w40"
              placeholder="请选择省市"
              :options="options"
              v-model="ruleForm.address"
              @change="handleChange">
            </el-cascader>
            <el-input v-model.trim="ruleForm.address_1" clearable placeholder="请输入详细地址" class="w30"></el-input>
          </div>
          
          <span v-else class="inlineBlock">
            {{ruleForm.address[0] ? ruleForm.address[0]  + ruleForm.address[1] + ruleForm.address[2] : ''}}
            {{ruleForm.address_1}}
          </span>
        
           <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status8')">编辑</span>
        </el-form-item>
        

        <el-form-item label-width="150px" label="上海市装饰装修行业协会会员证书号:" prop="invoiceAmount">
          <el-input  v-if="editStatus.status9" v-model.trim="ruleForm.invoiceAmount" clearable placeholder="上海市装饰装修行业协会会员证书号"></el-input>
          <span v-else class="inlineBlock">{{ruleForm.invoiceAmount}}</span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status9')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="施工资质发放单位:" prop="invoiceType">
          <el-select v-if="editStatus.status10" v-model="ruleForm.invoiceType" placeholder="请选择">
            <el-option label="上海市装饰装修行业协会0" value="0"></el-option>
            <el-option label="上海市装饰装修行业协会1" value="1"></el-option>
          </el-select>
          <span v-else class="inlineBlock">{{ruleForm.invoiceType}}</span>

          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status10')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="施工资质证书编号:" prop="taxNumber">
          <el-input v-if="editStatus.status11" v-model.trim="ruleForm.taxNumber" clearable placeholder="上海市装饰装修行业协会会员证书号"></el-input>
          <span v-else class="inlineBlock">{{ruleForm.taxNumber}}</span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status11')">编辑</span>
        </el-form-item>

         <el-form-item label-width="150px" label="证书有效期:" prop="invoiceTime">
          <!-- <el-date-picker
            v-model="ruleForm.invoiceTime"
            type="date"
            placeholder="请选择证书有效期"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM-dd">
          </el-date-picker> -->

          <el-date-picker
             v-if="editStatus.status12"
            v-model="ruleForm.invoiceTime"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            placeholder="请选择证书有效期">
          </el-date-picker>

          <span v-else class="inlineBlock">{{ruleForm.invoiceTime}}</span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status12')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="施工资质或施工能力等级评价:" prop="invoiceAddress">
          <el-select v-if="editStatus.status13" v-model="ruleForm.invoiceAddress" placeholder="请选择">
            <el-option label="一级" value="0"></el-option>
            <el-option label="二级" value="1"></el-option>
          </el-select>
          <span v-else class="inlineBlock">{{ruleForm.invoiceAddress}}</span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status13')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="施工资质证书:" prop="img" style="border:none">
          <img 
            alt="" 
            class="imgWrap"
            v-for="(ele, index1) in ruleForm.img"
            :key="index1+ele"
            :src="ele.url" 
            @click="handlePreviewImg(ele.url)">
          <span 
            v-if="editStatus.status14"
            class="btn"
            @click="handleUploadModal(ruleForm.img,1)">&nbsp;&nbsp;点击更换&nbsp;&nbsp;</span>
          <span v-else class="inlineBlock"></span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status14')">编辑</span>
        </el-form-item>
       
      </el-form>
    </div>

    <div class="footerBtn">
      <!-- <span class="btn" style="margin-right:20px" @click="handleGoBack">返 回</span> -->
      <span class="btns btn10" @click="handleConfirmButtonClick">提 交</span>
      <!-- <p class="center lineHeight30 padTop22 cRed">审核通过后发送短信或电话通知，请留意信息与接听</p> -->
    </div>

    <!-- 图片预览弹窗 -->
    <el-dialog title="图片预览" :visible.sync="dialogTablePreview" class="previewImg">
      <img :src="PreviewImgUrl" alt="">
    </el-dialog>

    <!-- 上传照片弹窗 -->
    <el-dialog title="上传照片" :visible.sync="dialogUploadModal" class="perfectInformationUploadModal uploadModal">
      <el-upload
        ref="upload"
        action="string"
        accept="image/jpeg,image/gif,image/png"
        list-type="picture-card"
        :limit="maxNum"
        :on-exceed="myUploadOnExceed"
        :http-request="myUpload"
        :before-upload="onBeforeUpload"
        :on-remove="handleRemove"
        :on-preview="handlePreviewImg"
        :file-list="contractFileURLs"
        :multiple= true>
        <i class="el-icon-plus"></i>
      </el-upload>
      <div style="padding-top: 14px;line-height: 24px; color: #D9001B;">最多只能上传{{this.maxNum}}张jpg/png文件，且不超过4MB</div>
    </el-dialog>

    <!-- 确认收货提示_温馨提示 -->
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
      // 是否显示编辑按钮
      isHideBtn:true,
      editStatus:{
        status1:false,
        status2:false,
        status3:false,
        status4:false,
        status5:false,
        status6:false,
        status7:false,
        status8:false,
        status9:false,
        status10:false,
        status11:false,
        status12:false,
        status13:false,
        status14:false,

        status15:false,
        status16:false,
        status17:false,
        status18:false,
      },
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
      rules: {
        // 全称
        fullName:[
          { required: true, message: '请输入公司全称', trigger: 'change' },
        ],
        // 企业营业执照
        businessLicense:[
          { required: true, message: '请上传企业营业执照图片', trigger: 'change' },
        ],
        // 统一信用代码
        invoiceNum:[
          { required: true, message: '请输入统一信用代码', trigger: 'change' },
        ],
        // // 电话
        // mobile:[
        //   { required: true, message: '请输入企业联系电话', trigger: 'change' },
        // ],
        // 手机
        mobilePhone:[
          { required: true, message: '请输入手机号码', trigger: 'change' },
        ],
        // 地址
        address:[
          { required: true, message: '请选择地址', trigger: 'change' },
        ],
        // 详细地址
        address_1:[
          { required: true, message: '请输入详细地址', trigger: 'change' },
        ],
        // 上海市装饰装修行业协会会员证书号
        invoiceAmount: [
          { required: true, message: '请输入上海市装饰装修行业协会会员证书号', trigger: 'change' },
        ],

        // 上传施工资质证书
        img:[
          { required: true, message: '请上传施工资质证书', trigger: 'change' },
        ],
        // 施工资质发放单位
        invoiceType:[
          { required: true, message: '请输选择施工资质发放单位', trigger: 'change' },
        ],
        // 施工资质或施工能力等级评价 
        invoiceAddress:[
          { required: true, message: '请输选择施工资质或施工能力等级评价', trigger: 'change' },
        ],
        // 施工资质证书编号
        taxNumber:[
          { required: true, message: '请输入施工资质证书编号', trigger: 'change' },
        ],
        
        // 证书有效期
        invoiceTime:[
          { required: true, message: '请选择证书有效期', trigger: 'change' },
        ],
        // 企业法人
        invoiceBank:[
          { required: true, message: '请输入企业法人', trigger: 'change' },
        ],
        // 法人身份证号
        title:[
          { required: true, message: '请输入法人身份证号', trigger: 'change' },
        ],
        // 法人证照
        invoiceBankNum:[
          { required: true, message: '请上传法人证照', trigger: 'change' },
        ]
       
      },
      options: [
        {
          value: 'shengfen',
          label: '省份',
          children: [
            {
              value: 'chengshi',
              label: '城市',
              children: [
                {
                  value: 'xianji',
                  label: '县级'
                }
              ]
            }, 
            {
              value: '城市_1',
              label: '城市_1',
              children: [{
                value: 'xianji_1',
                label: '县级_1'
              }]
            }
          ]
        }, 
        {
          value: 'shengfen0',
          label: '省份0',
          children: [
            {
              value: '城市0',
              label: '城市0',
              children: [
                {
                  value: 'xianji0',
                  label: '县级0'
                }
              ]
            }, 
          ]
        }
      ],
     
      // 预览弹窗
      dialogTablePreview: false,
      // 确定注册弹窗
      dialogSubmitModal:false,
      // 上传照片
      dialogUploadModal: false,
      // 上传照片地址数组
      contractFileURLs:[],
      // 允许上传最大张数
      maxNum: 1,
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

  // beforeRouteLeave (to, from, next) {
  //   // 查看订单详情
  //   let oldData = {
  //     // 上传照片地址数组
  //     contractFileURLs:[],
  //     ruleForm:this.ruleForm,
  //   }
  //   sessionStorage.setItem('siw_registrationInforMange,JSON.stringify(oldData))
  //   next()
  // },

  

  created() {
    // let date = sessionStorage.getItem('siw_registrationInforMange)
    // sessionStorage.removeItem('siw_registrationInforMange)
    // if(date){
    //   date = JSON.parse(date)
    // }
  },

  methods: {
    handleIsShou(item){
      console.log(this.editStatus[item])
      this.editStatus[item]  = !this.editStatus[item]
      console.log(this.editStatus[item])
    },
    // 请选择省市
    handleChange(value) {
      
      console.log(value);
    },
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

    // 确定注册点击事件 
    handleConfirmButtonClick(){
      // 提交验证函数
      if(!this.handleSubmitValidation()){
        return
      }
      // 确认注册弹窗显示
      this.dialogSubmitModal = true
    },

    // 弹窗确定点击提交
    handleSubmit(){
      let param = Object.assign({},JSON.parse(JSON.stringify(this.ruleForm))) 
      // console.log(param,'param')
      this.loading = true;
      // return
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
          // 清空数据
          // this.$refs['ruleForm'].resetFields();
          // this.contractFileURLs = []
        }else{
          this.loading = false;
          this.dialogSubmitModal = false,
          this.$message({
            message: msg ? msg : '提交失败！',
            type: 'error'
          });
        }
      }).catch( error => {
        this.loading = false;
        this.dialogSubmitModal = false

        
      })
    },

  
    
   
    // 返回
    handleGoBack(){
      // this.$router.push({
      //   name:'query',
      // })
      // this.$router.go(-1)
      this.$router.back(-1)
    },

    // 图片预览
    handlePreviewImg(imgUrl){
      this.PreviewImgUrl = imgUrl.url || imgUrl ;
      this.dialogTablePreview = true
    },
    // 上传照片 点击弹窗
    handleUploadModal(row,maxNum){
      this.maxNum = maxNum;
      // console.log(row,'上传照片 点击弹窗')
      this.contractFileURLs =  row
      // setTimeout(()=>{
      //   this.dialogUploadModal = true;
      // },300)
      this.dialogUploadModal = true;
      
      
    },

    // 上传时再次校验数据 限制类型、大小
    onBeforeUpload(file){
      const isIMAGE = file.type == 'image/jpeg'||'image/gif'||'image/png';
      const isLt1M = file.size / 1024 / 1024 < 4;

      if (!isIMAGE) {
        this.$message({
            message: '上传文件只能是图片格式!',
            type: 'error'
          });
      }
      if (!isLt1M) {
        this.$message({
            message: '上传文件大小不能超过 4MB!',
            type: 'error'
          });
      }
      return isIMAGE && isLt1M;
    },
    // 上传个数超出限制
    myUploadOnExceed(file) {
        this.$message({
            message: '上传文件不能超过'+ this.maxNum +'张!',
            type: 'error'
          });
    },
    
    // 自定义上传
    myUpload(content) {
      let _this =this;
        const loading = this.$loading({
          lock: true,
          text: '上传中请稍候....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let reader = new FileReader();
            reader.readAsDataURL(content.file);//这个读法是异步的
            reader.onloadend = function () {
                // 这个事件在读取结束后，无论成功或者失败都会触发
                if (reader.error) {
                    console.log(reader.error,'上传错误');
                    // 上传错误时 应该删除
                    _this.removeUplodFileList(content.file.name);
                    loading.close();
                } else {

                   loading.close();
                    let data64 = reader.result;
                    data64 = data64.slice(data64.indexOf(',') + 1)
                    let param ={
                        base64Data:data64,
                        name:content.file.name
                    };
                    Api.fileUploadBase64(param).then(res => {
                      let  {code, name , url} = res
                      if(code ==200){
                        
                        _this.contractFileURLs.push({
                          "name":name,
                          "url":url
                        })
                        // _this.contractFileURLs.push(url)

                        // _this.contractFileURLs[0]={
                        //   "name":name,
                        //   "url":url
                        // }
                      }
                     
                    }).catch( error => {
                      _this.$message({
                        message: '照片上传失败！',
                        type: 'error'
                      });
                      loading.close();
                      // 请求错误时 应该删除
                      _this.removeUplodFileList(content.file.name);
                    })
                  
                }
            }
    },

    // 删除上传成功的照片
    handleRemove(file, fileList) {
      let index_ = ''
      this.contractFileURLs.forEach((item,index) => {
        if(item.name == file.name){
          index_ =index
        }
      });
      this.contractFileURLs.splice(index_,1)
    },

    // 上传失败 删除 显示列表的照片
    removeUplodFileList(name) {
      let index_ = ''
      this.$refs.upload.uploadFiles.forEach((item,index) => {
        if(item.name == name){
          index_ =index
        }
      });
      this.$refs.upload.uploadFiles.splice(index_,1)
    },
    
  },
  computed: {}
}
</script>
<style lang="scss">
.registrationInforMange{
  min-width:900px;
  margin: 0 auto;
  .el-form--inline .el-form-item{width: 100%; min-width: 300px;}
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
  .el-form--inline .el-cascader--medium.w40 {
    width: 180px;
  }
  .el-form--inline .el-input.w30 {
    width: calc(100% - 185px);
  }
  .el-form--inline .el-input.w111 {
    width: 80px;
  }
  .el-form--inline .el-input.w112 {
    width: 110px;
  }
  .el-form--inline .el-input.w113 {
    width: calc(100% - 230px);
  }

  .el-form--inline .el-form-item.w50 {
    .el-form-item__content{
        // width: 282px !important;
        // width: calc(100% - 150px);
        // min-width: 200px;
    }
   
  }
  
  .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
        border-color: #1890ff;
    }
}
.perfectInformationUploadModal {
  .el-upload-list--picture-card .el-upload-list__item-actions,
  .el-upload-list__item {
    transition: all 0s !important;
  }
}
</style>

<style lang="scss" scoped>
  @import './registrationInforMange.scss';
  .el-upload-list--picture-card .el-upload-list__item-actions {
    transition:0;
  }
  .registrationInforMange .el-form--inline .el-form-item {
    width: 100%;
    border-bottom: 1px dashed #ccc;
    padding: 12px 0;
    margin: 0;
    min-width: 300px;
  }
</style>
