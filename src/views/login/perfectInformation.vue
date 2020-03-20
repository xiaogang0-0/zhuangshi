// 完善注册信息 perfectInformation  
<template>
  <div class="contentWrap perfectInformation">
    <!-- 公用表头 -->
    <loginHeader/>

    <div class="contWrap" >
      <div class="contHead">完善注册信息</div>
      <p class="center lineHeight30 cRed">非上海市装饰装修行业协会会员的企业完善企业资料前，需要通过电话：021-52375377 办理入会成为会员，再在线提交完善企业资料信息。</p>
      <el-form :model="ruleForm" sizi="mini" :inline="true" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <h2 class="itemTitle">企业基本资料：</h2>
        <el-form-item label-width="150px" label="企业营业执照:" prop="businessLicense" >
          <img 
            alt="" 
            class="imgWrap"
            v-for="(ele, index2) in ruleForm.businessLicense"
            :key="index2+ele.url"
            :src="ele.url" 
            @click="handlePreviewImg(ele.url)">
          <span 
            class="btn"
            @click="handleUploadModal(ruleForm.businessLicense,1)">&nbsp;&nbsp;点击上传&nbsp;&nbsp;</span>
           
        </el-form-item>

        <el-form-item label-width="150px" label="统一社会信用代码:" prop="creditCode">
          <el-input v-model.trim="ruleForm.creditCode" clearable placeholder="请输入统一社会信用代码" class="w113"></el-input>
        </el-form-item>

        <el-form-item label-width="150px" label="企业联系电话:" prop="contactTel">
          <el-input v-model.trim="ruleForm.contactTel" clearable placeholder="区号-固定号码" class="w150"></el-input>
          <span class="padlr5">或</span>
          <el-input v-model.trim="ruleForm.contactPhone" clearable placeholder="输入手机号" class="w113"></el-input>
        </el-form-item>
        <el-form-item label-width="150px" label="企业经营地址:" prop="address">
          <el-select 
            class="w40"
            v-model="ruleForm.provinceId" 
            placeholder="请选择省市"
            @change="handleProvinceChange">
            <el-option
              v-for="item in provinceData"
              :key="item.id + item.name"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select 
            class="w40"
            v-model="ruleForm.cityId" 
            placeholder="请选择省市"
            @change="handleCityChange">
            <el-option
              v-for="item in cityData"
              :key="item.id + item.name"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          
          <el-input v-model.trim="ruleForm.addr" clearable placeholder="请输入详细地址" class="w30"></el-input>
        </el-form-item>

        <el-form-item label-width="150px" label="企业法人:" prop="legalPerson">
          <el-input v-model.trim="ruleForm.legalPerson" clearable placeholder="请输入企业法人" class="w113"></el-input>
        </el-form-item>

        <el-form-item label-width="150px" label="法人身份证号:" prop="idNum">
          <el-input v-model.trim="ruleForm.idNum" clearable placeholder="请输入法人身份证号" class="w113"></el-input>
        </el-form-item>
        
        <el-form-item label-width="150px" label="法人证照:" prop="PhotoList" class="w100 imgBtnWrap" style="border:none">
          <div class="imgItem">
            <img 
            alt="" 
            class="imgWrap"
            v-for="(ele, index2) in ruleForm.facePhoto"
            :key="index2+ele.url"
            :src="ele.url" 
            @click="handlePreviewImg(ele.url)">
            <p><span class="btn" @click="handleUploadModal(ruleForm.facePhoto,1)">&nbsp;身份证正面&nbsp;</span></p>
          </div>
          <!-- 身份证反面 -->
          <div class="imgItem">
            <img 
              alt="" 
              class="imgWrap"
              v-for="(ele, index2) in ruleForm.backPhoto"
              :key="index2+ele.url"
              :src="ele.url" 
              @click="handlePreviewImg(ele.url)">
            <p><span class="btn" @click="handleUploadModal(ruleForm.backPhoto,1)">&nbsp;身份证反面照&nbsp;</span></p>
          </div>
          
        </el-form-item>

        
        <h2 class="itemTitle">资质信息：</h2>

        <el-form-item label-width="150px" label="上海市装饰装修行业协会会员编号:" prop="certificateNum">
          <el-input v-model.trim="ruleForm.certificateNum" clearable placeholder="输入会员编号" class="w113"></el-input>
        </el-form-item>

        <el-form-item label-width="150px" label="上传施工能力等级或施工资质证书:" prop="qualificationPhoto" class="lableWidth">
          <img 
            alt="" 
            class="imgWrap"
            v-for="(ele, index2) in ruleForm.qualificationPhoto"
            :key="index2+ele.url"
            :src="ele.url" 
            @click="handlePreviewImg(ele.url)">
          <span 
            class="btn"
            @click="handleUploadModal(ruleForm.qualificationPhoto,1)">&nbsp;&nbsp;点击上传&nbsp;&nbsp;</span>
          
        </el-form-item>

        <el-form-item label-width="150px" label="证书发放单位:" prop="qualificationUnit">
          <el-select 
            clearable
            v-model="ruleForm.qualificationUnit" 
            placeholder="请选择">
            <el-option
              v-for="item in qualificationUnitData"
              :key="item.dictionaryId + item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label-width="150px" label="施工能力或施工资质等级:" prop="qualificationGrade">
          <el-select 
            clearable
            v-model="ruleForm.qualificationGrade" 
            placeholder="请选择">
            <el-option
              v-for="item in qualificationGradeData"
              :key="item.dictionaryId + item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>

         <el-form-item label-width="150px" label="证书编号:" prop="qualificationNum">
          <el-input v-model.trim="ruleForm.qualificationNum" maxlength="15" clearable placeholder="施工资质证书编号" class="w113"></el-input>
        </el-form-item>

         <el-form-item label-width="150px" label="证书有效期:" prop="qualificationEffectEnddate">
          <el-date-picker
            v-model="ruleForm.qualificationEffectEnddate"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="请选择证书有效期">
          </el-date-picker>
          <!-- <el-date-picker
            v-model="ruleForm.qualificationEffectEnddate"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            placeholder="请选择证书有效期">
          </el-date-picker> -->
        </el-form-item>

        
      </el-form>
    </div>

    <div class="footerBtn">
      <!-- <span class="btn" style="margin-right:20px padding: 8px 26px;font-size: 16px;" @click="handleGoBack">返 回</span> -->
      <span class="btn" style="padding: 8px 26px;font-size: 16px;" @click="handleConfirmButtonClick">提交信息</span>
      <p class="center lineHeight30 padTop22 cRed">请留意接听协会的核实电话，审核通过时发送短信通知</p>
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
import OSS from 'ali-oss';
import * as Api from '@/api/perfectInformation'
import imgUrl from '@/assets/null.png'
import { setTimeout } from 'timers';
import LoginHeader from '@/components/loginHeader'


export default {
  name:'perfectInformation',
  components: {
    LoginHeader,
  },
  data() {
    
    const validateAddress = (rule, value, callback) => {
      if(!this.ruleForm.provinceId || !this.ruleForm.cityId){
        callback(new Error('请选择省市区不能为空'))
      }else if(!this.ruleForm.addr){
        callback(new Error('详细地址不能为空！'))
      }else{
        callback()
      }
    }

    const validateContactTel = (rule, value, callback) => {
      // 固话正则
      let contactTelReg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
      // 手机号正则
      let contactPhoneReg =/^1[3456789]\d{9}$/;
      if(!this.ruleForm.contactTel && !this.ruleForm.contactPhone){
        callback(new Error('固定号码或手机号码必选其一！！'))
      }else if(this.ruleForm.contactTel && !contactTelReg.test(this.ruleForm.contactTel )){
        callback(new Error('固定号码错误或格式错误 正确确格式：xxxx-xxxxxxxxx'))

      }else if(this.ruleForm.contactPhone && !contactPhoneReg.test(this.ruleForm.contactPhone )){
        callback(new Error('手机号码有误，请重填'))
      }else{
        callback()
      }
    }

    // 会员证书号
    const validateCertificateNum = (rule, value, callback) => {
      // 正则  大写T 加 4位数字
      let certificateNumlReg = /^[T]\d{4}$/;
      if (value == '') {
        callback(new Error('请输入上海市装饰装修行业协会会员证书号'));
      } else if(value && !certificateNumlReg.test(value)){
        callback(new Error('会员证书号格式不正确,正确格式大写T加4位数字'));
      }else{
        callback()
      }
    }

    // 施工资质证书编号
    const validateQualificationNum = (rule, value, callback) => {
      // 正则  大写T 加 4位数字
      let certificateNumlReg = /^[C]\d{9}$/;
      // if (value == '') {
      //   callback(new Error('请输入施工资质证书编号'));
      // } else 
      if(value && !certificateNumlReg.test(value)){
        callback(new Error('证书编号格式不正确,正确格式大写C加9位数字'));
      }else{
        callback()
      }
    }
    // 身份正验证
    const validatePhotoList = (rule, value, callback) => {
      if(this.ruleForm.facePhoto.length == 0){
        callback(new Error('请上传身份证正面面照！！'))
      }else if(this.ruleForm.backPhoto.length==0){
        callback(new Error('请上传身份证反面照！！'))
      }else{
        callback()
      }
    }
    const validateCreditCode = (rule, value, callback) => {
      let res = /^[A-Z0-9]{18}$/;
      if(!value){
         callback(new Error('统一社会信用代码不能为空'));
      }else if(value && !res.test(value)){
        callback(new Error('统一社会信用代码由18位数字或大写字母组成'));
      }else{
        callback()
      }
    }

    return {
      imgUrl:imgUrl,
      // 上一页注册成功的信息
      oldInfor:{},
      loading:false,
      ruleForm:{
        // 企业名称
        name:'',
        // 企业id
        customerId:'',
        // 统一社会信用代码
        creditCode:'',
        // 联系电话
        contactTel:'',
        // 联系手机号
        contactPhone:'',
        // 企业经营地址省id
        provinceId:'',
        // 企业经营地址省名称
        provinceName:'',
        // 企业经营地址市id
        cityId:'',
        // 企业经营地址市名称
        cityName:'',
        // 详细地址
        addr:'',
        // 行业协会会员证书号
        certificateNum:'',
        // 施工资质发放单位
        qualificationUnit:'',
        // 资质或能力等级
        qualificationGrade:'',
        // 施工资质证书编号
        qualificationNum:'',
        // 施工资质有效期
        qualificationEffectEnddate:'',
        // 法人
        legalPerson:'',
        // 法人身份证号
        idNum:'',
        
        // ++++++++++++   数据类型转换的++++++++++
        // 营业执照
        businessLicense:[ 
          // {
          //   name:'1',
          //   url:imgUrl
          // }
        ],
        // 身份证正面照
        facePhoto:[ 
          // {
          //   name:'1',
          //   url:imgUrl
          // }
        ],
        // 身份证反面照
        backPhoto:[ 
          // {
          //   name:'1',
          //   url:imgUrl
          // }
        ],
        // 施工资质证书url
        qualificationPhoto:[ 
          // {
          //   name:'1',
          //   url:imgUrl
          // }
        ],
      }, 

      rules: {
        // 企业营业执照
        businessLicense:[
          { required: true, message: '请上传企业营业执照图片', trigger: 'change' },
        ],
        // 统一社会信用代码
        creditCode:[
          { required: true,  trigger: 'change', validator: validateCreditCode},
        ],
        // 电话
        contactTel:[
          { required: true, trigger: 'change', validator: validateContactTel },
          // { required: true, message: '请输入企业联系电话', trigger: 'change' },
        ],
        // 手机
        contactPhone:[
          { required: true, message: '请输入手机号码', trigger: 'change' },
        ],
        // 地址
        address:[
          // { required: true, message: '请选择地址', trigger: 'change' },
          { required: true, trigger: 'change', validator: validateAddress },
        ],
       
        // 上海市装饰装修行业协会会员证书号
        certificateNum: [
          { required: true, trigger: 'change', validator: validateCertificateNum },
        ],

         // 施工资质证书编号
        qualificationNum:[
          // { validator: validateQualificationNum, trigger: 'change'},
          { min: 0, max: 15, message: '编号不能超过15个字符',}
        ],

        // 上传施工资质证书
        // qualificationPhoto:[
        //   { required: true, message: '请上传施工能力等级或施工资质证书', trigger: 'change' },
        // ],
        // // 施工资质发放单位
        // qualificationUnit:[
        //   { required: true, message: '请输选择施工资质发放单位', trigger: 'change' },
        // ],
        // // 施工资质或施工能力等级评价 
        // qualificationGrade:[
        //   { required: true, message: '请输选择施工资质或施工能力等级评价', trigger: 'change' },
        // ],
       
        
        // // 证书有效期
        // qualificationEffectEnddate:[
        //   { required: true, message: '请选择证书有效期', trigger: 'change' },
        // ],
        // 企业法人
        legalPerson:[
          { required: true, message: '请输入企业法人', trigger: 'change' },
        ],
        // 法人身份证号
        idNum:[
          { required: true, message: '请输入法人身份证号', trigger: 'change' },
        ],
        // 法人证照
        PhotoList:[
          { required: true,trigger: 'change', validator: validatePhotoList },
          // { required: true, message: '请上传企业营业执照图片', trigger: 'change' }
        ]
       
      },
      // 省级显示列表
      provinceData:[
        // {
        //   child: [],
        //   id: 1,
        //   name: "北京",
        // }
      ],
      // 市级列表
      cityData:[],
      // 施工资质发放单位列表
      qualificationUnitData:[],
      // 施工资质或施工能力等级评价列表
      qualificationGradeData:[],
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
      // 阿里云上传服务端签名
     aliyunOssSign:{
       accessid:'',
       policy:'',
       signature:'',
       dir:'',
       host:'',
       expire:''
     },
      num:0,
    };
  },

  mounted() {},
  watch:{
    // 省级id
    // 'ruleForm.provinceId':{
    //     handler(newName, oldName) {
    //       console.log(newName, oldName)
    //       this.ruleForm.cityName =""
    //       this.ruleForm.cityId =""
    //     },
    //     immediate: true
    // },
  },

  created() {
    let date = sessionStorage.getItem('siw_registerInfor')
    if(date){
      this.oldInfor = JSON.parse(date)
      this.ruleForm.customerId = this.oldInfor.customerId ? this.oldInfor.customerId : ''
      this.ruleForm.name = this.oldInfor.customerName
      this.ruleForm.contactPhone = this.oldInfor.mobile
    }
    // 获取公用列表
    this.init()
  },

  methods: {
    init(){
      // 获取企业信息, 未登录时
      this.handeGetCustomerDetailByLoginUser()
      // 根据层级获取行政区域, 0为省级, 1为市级
      this.handleGetListByLevel(0)
      // 施工资质发放单位接口
      this.handleGetDictionaryList1()
      // 施工资质证书等级接口 
      this.handleGetDictionaryList2()
    },

    // 获取企业信息, 未登录时
    handeGetCustomerDetailByLoginUser(){
      let param = {
        customerName:this.ruleForm.name
      }
      Api.getCustomerDetailByName(param).then(res => {
        let  {code, data , msg, total} = res
        if(code == 200) {
          // 企业id
          ruleForm.customerId = data.customerId
        }
      }).catch( error => { 
      })
    },
    
    // 上传照片 点击弹窗
    handleUploadModal(row,maxNum){
      this.maxNum = maxNum;
      this.contractFileURLs = row
      this.dialogUploadModal = true;
    },

    // 阿里云上传服务端签名接口
    handleGetAliyunOssSign(file){
      Api.getAliyunOssSign().then(res => {
        // let {accessid, policy, signature, dir, host, expire } = res.data
        let {accessKeySecret, assessKeyId, bucket, path, region, stsToken } = res.data
        let client = new OSS.Wrapper({
          accessKeyId: assessKeyId,
          accessKeySecret: accessKeySecret,
          stsToken: stsToken,
          region,
          bucket,
          secure:true
        });
        // 上传到阿里云
        let name = new Date().getTime() + '';
        let suffix = file.name.substr(file.name.lastIndexOf(".") + 1);  
        client.multipartUpload(`${path}/${name}.${suffix}`, file, {
            progress: function* (percentage) {}
        })
          .then(res => {
            let imgUrl = `https://${bucket}.${region}.aliyuncs.com/${res.name}`;
            this.contractFileURLs.push({
              "name":name,
              "url":imgUrl
            })
          })
          .catch(err => {
            this.$message({
              message: '照片上传失败！',
              type: 'error'
            });
            // 请求错误时 应该删除
            this.removeUplodFileList(file.name);
        });
        
      }).catch( error => { 
      })

    },
    
    // 施工资质发放单位接口
    handleGetDictionaryList1(){
      Api.getDictionaryList1().then(res => {
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.qualificationUnitData = data
        }
      }).catch( error => { 
      })
    },
    // 施工资质证书等级接口 
    handleGetDictionaryList2(){
      Api.getDictionaryList2().then(res => {
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.qualificationGradeData = data
        }
      }).catch( error => { 
      })

    },
    // 根据层级获取行政区域, 0为省级, 1为市级
    handleGetListByLevel(param){
      // 0为省级, 1为市级
      Api.getListByLevel(param).then(res => {
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.provinceData = data
        }
      }).catch( error => { 
      })
    },

    // 按上级id获取下一级区域接口
    handleGetListByParentId(param){
      // 清空区级选择
      this.ruleForm.cityName =""
      this.ruleForm.cityId =""
      Api.getListByParentId(param).then(res => {
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.cityData = data
        }
      }).catch( error => { 
      })
    },

    // 省份change事件
    handleProvinceChange(){
      let item = this.provinceData.filter(item => item.id==this.ruleForm.provinceId)[0]
      // console.log(item)
      this.ruleForm.provinceName = item.name 
      // 获取市级 city
      this.handleGetListByParentId(this.ruleForm.provinceId)
    },

    // 市级选中事件
    handleCityChange(){
      let item = this.cityData.filter(item => item.id==this.ruleForm.cityId)[0]
      this.ruleForm.cityName = item.name 
      // console.log(item)
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

    // 提交验证函数
    handleSubmitValidation(){
      let onOff = true;
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          onOff = true;
        } else {
          // console.log('error submit!!');
          this.$message({
            message: '请将必填信息填写完整！',
            type: 'warning'
          });
          onOff = false;
        }
      });
      return onOff
    },


    // 弹窗确定点击提交
    handleSubmit(){
      let param = Object.assign({},JSON.parse(JSON.stringify(this.ruleForm))) 
      // console.log(param,'param')
      this.loading = true;
      param.backPhoto = param.backPhoto.length ? param.backPhoto[0].url :''
      param.facePhoto = param.facePhoto.length ? param.facePhoto[0].url :''
      param.businessLicense = param.businessLicense.length ? param.businessLicense[0].url :''
      param.qualificationPhoto = param.qualificationPhoto.length ? param.qualificationPhoto[0].url :''
      
      // return  
      Api.subUserCustomerComplete(param).then(res => {
        this.loading = false;
        this.dialogSubmitModal = false
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.$message({
            message: '注册成功请耐心等待平台审核',
            type: 'success',
            duration:5000
          });
          this.$alert('提交成功！请进入首页登录系统查看注册信息！！', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.handleGoBack()
              }
          });
        }
      }).catch( error => {
        this.loading = false;
        this.dialogSubmitModal = false

        
      })
    },
   
    // 返回
    handleGoBack(){
      this.$router.push({
        name:'login',
      })
      // this.$router.back(-1)
    },

    // 图片预览
    handlePreviewImg(imgUrl){
      this.PreviewImgUrl = imgUrl.url || imgUrl ;
      this.dialogTablePreview = true
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

                    // 获取阿里云上传服务端签名接口
                    _this.handleGetAliyunOssSign(content.file)
                    // 上传图片
                    // Api.fileUploadBase64(param).then(res => {
                    //   let  {code, name , url} = res
                    //   if(code ==200){
                        
                    //     _this.contractFileURLs.push({
                    //       "name":name,
                    //       "url":url
                    //     })
                    //   }
                    
                    // }).catch( error => {
                    //   _this.$message({
                    //     message: '照片上传失败！',
                    //     type: 'error'
                    //   });
                    //   loading.close();
                    //   // 请求错误时 应该删除
                    //   _this.removeUplodFileList(content.file.name);
                    // })
                  
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
.perfectInformation{
  
  width:975px;
  margin: 0 auto;
  margin-top: 70px;
  .imgBtnWrap {
    overflow: hidden;
    .el-form-item__label {vertical-align: top;}
    .imgItem {
      float: left;
      text-align: center;
      margin-right: 12px;
    }
  }
  .itemTitle {
    font-size: 16px;
    font-weight: 800;
    padding: 8px;
    color: #000;
    color: #2E74D1;

  }
  .lableWidth{
    label {padding-left:13px;}
  }
  .loginHeader {
    background-color: #2E74D1;
    color: #fff;
    .navList>a{color: #fff;}
  }
  .el-form--inline .el-form-item{width: 100%; min-width: 300px;}
  .el-autocomplete{
    width: 100%;
  }
  .el-form-item--medium .el-form-item__content {
      width: 50%;
      min-width: 300px;
      max-width: 600px;
      line-height: 36px;
      vertical-align: bottom;
  }
  .el-form-item--medium.w100 .el-form-item__content {
      width: 100%;
      max-width: 100;
  }
  .el-select.w40 {
    width: 110px;
  }
  .el-form--inline .el-input.w30 {
    width: calc(100% - 230px);
  }
  .el-form--inline .el-input.w111 {
    width: 80px;
  }
  .el-form--inline .el-input.w112 {
    width: 110px;
  }
  .el-form--inline .el-input.w150 {
    width: 150px;
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

  @import './perfectInformation.scss';
  .el-upload-list--picture-card .el-upload-list__item-actions {
    transition:0;
  }
  .perfectInformation .el-form--inline .el-form-item {
    width: 100%;
    border-bottom: 1px dashed #ccc;
    padding: 8px 0;
    padding-bottom: 20px;
    margin: 0;
    min-width: 300px;
  }
</style>
