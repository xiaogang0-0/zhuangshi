// 资料 编辑 详情
<template>
  <div class="contentWrap personneEdit" v-loading="loading">
    <el-form :model="ruleForm" label-width="160px" sizi="mini" :inline="false" :rules="rules" ref="ruleForm" class="demo-ruleForm" style="width:682px;margin:0 auto;">
      <div class="titleWrap">
        <h2 class="title">基本信息</h2>
        <div class="overflow">
          <div class="leftWrap">
            <el-form-item label="身份证号:" prop="idNum">
              <el-input v-model="ruleForm.idNum" ref="idNumClass" @blur="handleGetdata" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item label="姓名:" prop="ename">
              <el-input v-model="ruleForm.ename" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item label="性别:" prop="sex">
              <el-select v-model="ruleForm.sex" placeholder="请选择性别" :disabled="!isEdit">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="rightWrap">
            <el-form-item label="人员头像:" prop="headPhoto" class="imgBtnWrap" label-width="90px">
              <div class="imgItem" style="margin:0">
                <img 
                alt="" 
                class="imgWrap"
                v-for="(ele, index2) in ruleForm.headPhoto"
                :key="index2+ele.url"
                :src="ele.url" 
                @click="handlePreviewImg(ele.url)">
                <!-- <p><span class="btn" @click="handleUploadModal(ruleForm.headPhoto,1)">&nbsp;上传头像&nbsp;</span></p> -->
                <p v-show="isEdit"><el-button type="primary" size="mini" @click="handleUploadModal(ruleForm.headPhoto,1)">&nbsp;上传头像&nbsp;</el-button></p>
              </div>
            </el-form-item>
          </div>
        </div>

        <el-form-item label="身份证照片:" prop="PhotoList" class="w100">
          <div class="imgItem">
            <img 
            alt="" 
            class="imgWrap"
            v-for="(ele, index2) in ruleForm.facePhoto"
            :key="index2+ele.url"
            :src="ele.url" 
            @click="handlePreviewImg(ele.url)">
            <!-- <p><span class="btn" @click="handleUploadModal(ruleForm.facePhoto,1)">&nbsp;身份证正面&nbsp;</span></p> -->
            <p v-show="isEdit"><el-button type="primary" size="mini" @click="handleUploadModal(ruleForm.facePhoto,1)">&nbsp;正面照片&nbsp;</el-button></p>

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
            <!-- <p><span class="btn" @click="handleUploadModal(ruleForm.backPhoto,1)">&nbsp;身份证反面照&nbsp;</span></p> -->
            <p v-show="isEdit"><el-button type="primary" size="mini" @click="handleUploadModal(ruleForm.backPhoto,1)">&nbsp;反面照片&nbsp;</el-button></p>
          </div>
        </el-form-item>
        <el-form-item label="主联系电话:" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="副联系电话:" prop="phone2">
          <el-input v-model="ruleForm.phone2"></el-input>
        </el-form-item>

      </div>

      <div class="titleWrap" style="padding: 10px;">
        <h2 class="title">身份信息</h2>
        <el-form-item label=" " label-width="80px" prop="station" class="w100" style="margin:0">
           <el-radio-group v-model="ruleForm.station">
            <el-radio 
              v-for="item in stationData"
              :label="item.name">{{item.name}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <div class="titleWrap" v-if="ruleForm.station =='项目经理'">
        <h2 class="title">资质信息</h2>
         
        <el-form-item prop="certificateNum">
          <span slot="label"><i class="cRed">*</i> 人员资质证书号:</span>
          <el-input v-model="ruleForm.certificateNum"></el-input>
        </el-form-item>

        <el-form-item label="" prop="certificatePhoto" class="w100">
          <span slot="label"><i class="cRed">*</i> 人员资质证书照片:</span>
          <!-- 正面照片 -->
          <div class="imgItem">
            <img 
              alt="" 
              class="imgWrap"
              v-for="(ele, index2) in ruleForm.certificatePhoto"
              :key="index2+ele.url"
              :src="ele.url" 
              @click="handlePreviewImg(ele.certificatePhoto)">
            <p><el-button type="primary" size="mini" @click="handleUploadModal(ruleForm.certificatePhoto,1)">&nbsp;正面照片&nbsp;</el-button></p>
          </div>
        </el-form-item>

        <el-form-item label="" prop="certificateEffectEnddate">
          <span slot="label"><i class="cRed">*</i> 有效期至:</span>
          <el-date-picker
            v-model="ruleForm.certificateEffectEnddate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="请选择证书有效期">
          </el-date-picker>
          <!-- <el-date-picker
            v-model="ruleForm.certificateEffectEnddate"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            placeholder="请选择证书有效期">
          </el-date-picker> -->
        </el-form-item>

        <el-form-item label="" prop="certificateUnit">
          <span slot="label"><i class="cRed">*</i> 发证机构:</span>
          <el-select v-model="ruleForm.certificateUnit" placeholder="请选择机构">
            <el-option 
              v-for="item in certificateUnitData"
              :key="item.name" 
              :label="item.name" 
              :value="item.name"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="" prop="certificateGrade">
          <span slot="label"><i class="cRed">*</i> 人员资质等级:</span>
          <el-select v-model="ruleForm.certificateGrade" placeholder="请选择等级">
             <el-option 
              v-for="item in certificateGradeData"
              :key="item.name" 
              :label="item.name" 
              :value="item.name"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="titleWrap workTypeArray"  v-if="ruleForm.station =='施工队长' || ruleForm.station =='施工人员'">
        <h2 class="title">分配工种</h2>
         
        <el-form-item label="分配工种:" prop="workTypeArray">
          <el-checkbox-group v-model="ruleForm.workTypeArray">
            <el-checkbox 
              v-for="item in workTypeArrayData"
              :key="item.name" 
              :label="item.name" 
              :value="item.name">
            </el-checkbox>
           
            <!-- <el-checkbox label="选中且禁用" disabled></el-checkbox> -->
          </el-checkbox-group>
        </el-form-item>
      </div>

      <div class="titleWrap workTypeArray"  v-if="ruleForm.station =='工程管理'">
        <h2 class="title">分配身份</h2>
         
        <el-form-item label="分配身份:" prop="stationDetailArray">
          <el-checkbox-group v-model="ruleForm.stationDetailArray">
            <el-checkbox 
              v-for="item in stationDetailArrayData"
              :key="item.name" 
              :label="item.name" 
              :value="item.name">
            </el-checkbox>
           
            <!-- <el-checkbox label="选中且禁用" disabled></el-checkbox> -->
          </el-checkbox-group>
        </el-form-item>
      </div>
    </el-form>

    
     <div class="footerBtn center" v-if="empOrtherId || empId">
      <el-button @click="handleGoBack">返 回</el-button >
      <el-button type="primary" @click="handleConfirmButtonClick">确定并提交</el-button>
      <el-button v-show="ruleForm.isWork == 1" type="primary" @click="handeMove">移到历史</el-button>
      <el-button v-show="ruleForm.isWork == 0" type="primary" @click="handeMove">移出历史</el-button>
    </div>
    <div v-else class="footerBtn center">
      <el-button type="primary" @click="handleConfirmButtonClick">确定并提交</el-button>
      <el-button type="primary" @click="handleRefresh">&nbsp;&nbsp;清空&nbsp;&nbsp;</el-button>
    </div>

    <!-- 图片预览弹窗 -->
    <el-dialog title="图片预览" :visible.sync="dialogTablePreview" class="previewImg">
      <img :src="PreviewImgUrl" alt="">
    </el-dialog>

    <!-- 上传照片弹窗 -->
    <el-dialog title="上传照片" :visible.sync="dialogUploadModal" class="personneEditUploadModal uploadModal">
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
import * as Api from '@/api/personnelDatabaseManagement'
import imgUrl from '@/assets/null.png'
import { setTimeout } from 'timers';
import LoginHeader from '@/components/loginHeader'


export default {
  name:'personneEdit',
  components: {
    LoginHeader,
  },
  data() {
    // 身份证号验证
    const validateIdNum = (rule, value, callback) => {
      // 正则  
      let idNumReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
      if (!value) {
        callback(new Error('请输入身份证号'));
      } else if(!idNumReg.test(value)){
        callback(new Error('身份证格式有误,请重新填写...'));
      }else{
        callback()
      }
    }

    // 身份证照片验证
    const validatePhotoList = (rule, value, callback) => {
      if(this.ruleForm.facePhoto.length == 0){
        callback(new Error('请上传身份证正面面照！！'))
      }else if(this.ruleForm.backPhoto.length == 0){
        callback(new Error('请上传身份证反面照！！'))
      }else{
        callback()
      }
    }
    const validateContactTel2 = (rule, value, callback) => {
      // 手机号正则
      let contactPhoneReg =/^1[3456789]\d{9}$/;
      if(value && !contactPhoneReg.test(value)){
        callback(new Error('手机号码格式有误，请重填'))
      }else{
        callback()
      }
    }

    const validateContactTel = (rule, value, callback) => {
      // 手机号正则
      let contactPhoneReg =/^1[3456789]\d{9}$/;
      if(!value){
        callback(new Error('请输入电话号码！！'))
      }else if(!contactPhoneReg.test(value)){
        callback(new Error('手机号码格式有误，请重填'))
      }else{
        callback()
      }
    }
 
    
    

    return {
      imgUrl:imgUrl,
      
      loading:false,
      // 人员主信息id
      empId:'',
      // 人员副信息id
      empOrtherId:'',
      // 是否允许编辑 true 为人员添加 false 为编辑
      isEdit:true,
      ruleForm:{
        // 公司id
        customerId:'',
        // 人员主信息id
        empId:'',
        // 名称
        ename:'',
        // 身份证号
        idNum:'',
        // 性别
        sex:'',
        // 主联系电话
        phone:'',
        // 副联系电话
        phone2:'',
        // 身份信息
        station:'',
        // 分配工种
        workTypeArray:[],
        // 分配身份
        stationDetailArray:[],
        // ++++++++++++   数据类型转换的++++++++++
        // 头像
        headPhoto:[],
        // 身份证正面照url
        facePhoto:[],
        // 身份证背面照url
        backPhoto:[],
        // 人员资质证书照片
        certificatePhoto:[],
      },
      rules: {
        // 身份证号
        idNum: [
          { required: true, trigger: 'blur', validator: validateIdNum },
        ],
        // 姓名
        ename: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        // 性别
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' },
        ],
        // 人员头像
        // headPhoto: [
        //   { required: true, message: '请上传人员头像', trigger: 'change' },
        // ],
        // 身份证照片
        PhotoList:[
          { required: true,trigger: 'change', validator: validatePhotoList },
          // { required: true, message: '请上传企业营业执照图片', trigger: 'change' }
        ],
        // 主联系电话
        phone: [
          { required: true, trigger: 'change', validator: validateContactTel },
        ],
        // 副联系电话
        phone2: [
          { trigger: 'blur', validator: validateContactTel2 },
        ],
      },

      // 身份信息列表
      stationData:[],
      // 发证机构
      certificateUnitData:[],
      // 人员资质等级 
      certificateGradeData:[],
      // 工种接口
      workTypeArrayData:[],
      // 身份列表
      stationDetailArrayData:[],


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
  watch:{},

  created() {
    this.empId = this.$route.query.empId;
    this.empOrtherId = this.$route.query.empOrtherId;
    // 是否允许编辑 true 为人员添加 false 为编辑
    this.isEdit =  this.empId || this.empOrtherId ? false : true
    
    // 获取公用列表
    this.init()
  },

  methods: {
    init(){
      // 身份信息列表
      this.handleGetDictionaryListTypeid9()
      // 人员资质发证机构接口 
      this.handleGetDictionaryListTypeid5()
      // 人员资质等级
      this.handleGetDictionaryListTypeid6()
      // 工种接口
      this.handleGetDictionaryListTypeid7()
      // 分配身份
      this.handleGetDictionaryListTypeid8()
      
      // console.log(this.isEdit,' 是否允许编辑 true 为人员添加 false 为编辑')
      if(!this.isEdit){
        // 获取详情
        this.handleGetDetail()
        // 清空主表验证
        // this.rules={}
      }
      

    },

    // 获取详情
    handleGetDetail(){
      let param = {
        empId :this.empId,
        empOrtherId :this.empOrtherId
      }
      Api.getEmpDetail(param).then(res => {
        let  {code, data , msg, total} = res
        if(code == 200) {
           // 数据类型转换
          this.ruleForm = this.handleConversionType(data,1)
          // this.ruleForm = Object.assign({}, this.handleConversionType(data,1))
          // console.log(this.ruleForm )
        }
      }).catch( error => {
        
      })
    },

    // 数据类型转换
    handleConversionType(data,type){
      // type =1 是获取时 的信息转化 type=2  为提交时 保存的类型转换  默认为获取转换
      type = type ? type : '1'
      if(type == 1){
         data.headPhoto = data.headPhoto ?  [{name:'', url:data.headPhoto}] : []
         data.facePhoto = data.facePhoto ?  [{name:'', url:data.facePhoto}] : []
         data.backPhoto = data.backPhoto ?  [{name:'', url:data.backPhoto}] : []
         data.certificatePhoto = data.certificatePhoto ?  [{name:'', url:data.certificatePhoto}] : []
         return data
      }
      if(type == 2){
        data.headPhoto = data.headPhoto.length ? data.headPhoto[0].url :''
        data.facePhoto = data.facePhoto.length ? data.facePhoto[0].url :''
        data.backPhoto = data.backPhoto.length ? data.backPhoto[0].url :''
        data.certificatePhoto = data.certificatePhoto.length ? data.certificatePhoto[0].url :''

        return data
      }
    },
    
    // 身份证失去焦点事件
    handleGetdata(){
      let idNumReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
      if(this.ruleForm.idNum && idNumReg.test(this.ruleForm.idNum)){
        let param = this.ruleForm.idNum;
        Api.getUserEmp(param).then(res => {
          let  {code, data , msg, total} = res
          if(code == 200) {
            // data =1
            if(data == ''){
             return 
            }
            this.$confirm('此人员已是平台注册人员，是否读取信息?', '', {
              confirmButtonText: '读取',
              cancelButtonText: '修改身份证号',
            }).then(() => {
              // 数据类型转换
              this.ruleForm = this.handleConversionType(data,1)
              // 不允许编辑
              this.isEdit = false;
              // 清空主表验证
              // this.rules={}
            }).catch(() => {
              this.$refs.idNumClass.focus()
            });
          }
        }).catch( error => {
        })
      }
    },

    // 人员资质发证机构接口
    handleGetDictionaryListTypeid5(){
      Api.getDictionaryListTypeid5().then(res => {
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.certificateUnitData = data
        }
      }).catch( error => {
      })
    },

    // 人员资质等级接口 
    handleGetDictionaryListTypeid6(){
      Api.getDictionaryListTypeid6().then(res => {
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.certificateGradeData = data
        }
      }).catch( error => {
      })
    },
    
    // 身份信息列表
    handleGetDictionaryListTypeid9(){
      Api.getDictionaryListTypeid9().then(res => {
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.stationData = data
          // 增加默认选中（成为必选项）
          this.ruleForm.station = data[0].name
        }
      }).catch( error => {
      })
    },

    // 工种接口
    handleGetDictionaryListTypeid7(){
      Api.getDictionaryListTypeid7().then(res => {
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.workTypeArrayData = data
        }
      }).catch( error => {
      })
    },

    // 分配身份
    handleGetDictionaryListTypeid8(){
      Api.getDictionaryListTypeid8().then(res => {
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.stationDetailArrayData = data
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

    // 确定提交点击事件 
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
          if(this.ruleForm.station == "项目经理"){
            if(!this.ruleForm.certificateNum){
              this.$message({
                message: '人员资质证书号不能为空！！',
                type: 'warning'
              });
              onOff = false;
            }else if(!this.ruleForm.certificatePhoto.length){
              this.$message({
                message: '请上传资质证书照片!!!',
                type: 'warning'
              });
              onOff = false;
            }else if(!this.ruleForm.certificateEffectEnddate){
              this.$message({
                message: '证书有效期不能为空!!!',
                type: 'warning'
              });
              onOff = false;
            }else if(!this.ruleForm.certificateUnit){
              this.$message({
                message: '发证机构不能为空!!!',
                type: 'warning'
              });
              onOff = false;
            }else if(!this.ruleForm.certificateGrade){
              this.$message({
                message: '人员资质等不级能为空!!!',
                type: 'warning'
              });
              onOff = false;
            }else{
              onOff = true;
            }

          }else{
            onOff = true;
          }
          
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
      this.loading = true;
      // 数据类型转换
      param = this.handleConversionType(param,2)
      // console.log(param)
      // return  
      if(this.empOrtherId || this.empId){
        // 编辑提交
        this.handleEditSubMit(param)
      }else{
        this.handleAddSubMit(param)
      }
      
    },
    // 添加接口
    handleAddSubMit(param){
      Api.subUserEmpAddEmp(param).then(res => {
        this.loading = false;
        this.dialogSubmitModal = false
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.$message({
            message: '人员添加成功',
            type: 'success'
          });

          this.$confirm('添加成功！！', '提示', {
            confirmButtonText: '继续添加', // 成功
            cancelButtonText: '查看人员信息', //取消
          }).then(() => {
            // 继续添加 清空操作
            this.handleRefresh()
          }).catch(() => {
            // 查看人员信息
            this.$router.push({
              name:'personnelSearch'
            })
          });


          
        }
      }).catch( error => {
        this.loading = false;
        this.dialogSubmitModal = false
      })
    },

    // 编辑接口
    handleEditSubMit(param){
      Api.subUserEmpUdpateEmpOrther(param).then(res => {
        this.loading = false;
        this.dialogSubmitModal = false
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.$message({
            message: '人员修改成功',
            type: 'success'
          });
          setTimeout(()=>{
            // 清空操作
            this.handleGoBack()
          },1000)
          
        }
      }).catch( error => {
        this.loading = false;
        this.dialogSubmitModal = false
      })
    },

    // 移入、移出到历史
    handeMove(){
      this.$confirm('此操作会改变人员状态请谨慎操作！！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // type: 'warning'
      }).then(() => {
        // 移动到历史请求
        this.handleMoveSub()
      }).catch(() => { });
     
    },
    
    // 移动到历史请求
    handleMoveSub(){
      let param = {
        // 人员副表id
        empOrtherId:this.ruleForm.empOrtherId,
        // 人员状态：0历史人员，1在岗
        isWork:this.ruleForm.isWork == 1 ? 0 : 1 
      }
      Api.subEmpUdpateIsWork(param).then(res => {
        this.loading = false;
        let  {code, data , msg, total} = res
        if(code == 200) {
          this.ruleForm.isWork = param.isWork
          
          this.$message({
            type: 'success',
            message: msg
          });
        }
      }).catch( error => {
      })
    },
   
    // 返回
    handleGoBack(){
      this.$router.push({
        name:'personnelSearch'
      })
      // this.$router.back(-1)
    },
    handleRefresh(){
      
      this.isEdit = true
      this.ruleForm = {
        // 公司id
        customerId:'',
        // 人员主信息id
        empId:'',
        // 名称
        ename:'',
        // 身份证号
        idNum:'',
        // 性别
        sex:'',
        // 主联系电话
        phone:'',
        // 副联系电话
        phone2:'',
        // 身份信息
        station:'',
        // 分配工种
        workTypeArray:[],
        // 分配身份
        stationDetailArray:[],
        // ++++++++++++   数据类型转换的++++++++++
        // 头像
        headPhoto:[],
        // 身份证正面照url
        facePhoto:[],
        // 身份证背面照url
        backPhoto:[],
        // 人员资质证书照片
        certificatePhoto:[],
      };
      this.ruleForm.station = this.stationData[0].name

      // this.$router.go(0)
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
<style lang="scss" scoped>
.personneEdit{
  min-width:900px;
  margin: 0 auto;
  .cRed {color: #ff4949;}
  .overflow{overflow: hidden;}
  .footerBtn {text-align: center; padding:10px;}
  .previewImg {
    img {width:100%;}
  }
  .imgItem {
      float: left;
      width: 140px;
      text-align: center;
      margin: 0 43px;
      img{ 
        width: 100%;
      }
    }

  .imgBtnWrap {
    overflow: hidden;
    .el-form-item__label {vertical-align: top;}
  }

  .titleWrap{
    position: relative;
    display: inline-block;
    min-width: 682px;
    padding: 18px;
    padding-left: 0;
    margin-bottom:30px;
    border:1px solid #ccc;
    .title {
      position: absolute;
      top: -12px;
      left: 17px;
      padding: 0px 5px;
      background: #fff;
      font-size: 16px;
    }
  }
  .leftWrap{
    float: left;
    width:340px;
  }
  .rightWrap{ float: left;}
  .el-form--inline .el-form-item{
    // padding: 3px 0;
    // margin: 0;
  }
}
.el-upload-list--picture-card .el-upload-list__item-actions {
  transition:0;
}
</style>

<style lang="scss">
  .personneEdit{
    .el-form-item__content {
      max-width: 190px;
    }
    .el-form-item.w100 .el-form-item__content{
      max-width: 100%;
    }
    .el-date-editor.el-input{
      width: 100%;
    }
  }
  .workTypeArray {
    .el-checkbox {width: 100%;}
  }
  .personneEditUploadModal {
    .el-upload-list--picture-card .el-upload-list__item-actions,
    .el-upload-list__item {
      transition: all 0s !important;
    }
  }
</style>
