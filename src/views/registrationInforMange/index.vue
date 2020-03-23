// 编辑注册资料 registrationInforMange
<template>
  <div class="contentWrap registrationInforMange">
    <div class="contWrap">
      <!-- <p class="statusTit">状态：<span class="cRed">审核通过</span></p> -->
      <el-form ref="ruleForm" :model="ruleForm" :inline="true" :rules="rules" class="demo-ruleForm">
        <el-form-item label-width="150px" label="状态:">
          <span class="cRed mrLeeft30">
            {{ ruleForm.status == 0 ? '新注册，等待完善资料' :
              ruleForm.status == 1 ? '待审核' :
              ruleForm.status == 2 ? '已审核通过' :
              ruleForm.status == 3 ? '审核不通过' :
              ruleForm.status == 4 ? '关闭' :
              ruleForm.status == 5 ? '停用' :
              ruleForm.status == 6 ? '冻结' : ''
            }}
          </span>
        </el-form-item>
        <el-form-item v-if="ruleForm.status==3" label-width="150px" label="审核意见:">
          <p class="cRed mrLeeft30">{{ ruleForm.refuseType }}</p>
          <p class="cRed mrLeeft30">{{ ruleForm.refuseReason }}</p>
        </el-form-item>

        <el-form-item label-width="150px" label="公司全称:" prop="fullName">
          <el-input v-if="editStatus.status1" v-model.trim="ruleForm.name" clearable placeholder="公司全称" />
          <span v-else class="inlineBlock">{{ ruleForm.name }}</span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status1')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="统一社会信用代码:" prop="creditCode">
          <el-input v-if="editStatus.status2" v-model.trim="ruleForm.creditCode" clearable placeholder="请输入统一社会信用代码" />
          <span v-else class="inlineBlock">{{ ruleForm.creditCode }} </span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status2')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="企业营业执照:" prop="businessLicense">
          <!-- <img v-if="!editStatus.status1" :src="imgUrl" alt="" class="imgWrap" @click="handlePreviewImg(ruleForm.businessLicense.url)"> -->
          <img
            v-for="(ele, index2) in ruleForm.businessLicense"
            :key="index2+ele.url"
            alt=""
            class="imgWrap"
            :src="ele.url"
            @click="handlePreviewImg(ele.url)"
          >
          <span
            v-if="editStatus.status3"
            class="btn"
            @click="handleUploadModal(ruleForm.businessLicense,1)"
          >&nbsp;&nbsp;点击更换&nbsp;&nbsp;</span>
          <span v-else class="inlineBlock" />
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status3')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="企业法人:" prop="legalPerson">
          <el-input v-if="editStatus.status4" v-model.trim="ruleForm.legalPerson" clearable placeholder="请输入企业法人" />
          <span v-else class="inlineBlock">{{ ruleForm.legalPerson }}</span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status4')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="法人身份证号:" prop="idNum">
          <el-input v-if="editStatus.status5" v-model.trim="ruleForm.idNum" clearable placeholder="请输入法人身份证号" />
          <span v-else class="inlineBlock">{{ ruleForm.idNum }}</span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status5')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="法人证照:" prop="PhotoList" class="imgBtnWrap">
          <div class="imgItem">
            <img
              v-for="(ele, index2) in ruleForm.facePhoto"
              :key="index2+ele.url"
              alt=""
              class="imgWrap"
              :src="ele.url"
              @click="handlePreviewImg(ele.url)"
            >

            <p>
              <span
                v-if="editStatus.status6"
                class="btn"
                @click="handleUploadModal(ruleForm.facePhoto,1)"
              >&nbsp;点击更换正面&nbsp;</span>
            </p>
          </div>
          <!-- 身份证反面 -->
          <div class="imgItem">
            <img
              v-for="(ele, index2) in ruleForm.backPhoto"
              :key="index2+ele.url"
              alt=""
              class="imgWrap"
              :src="ele.url"
              @click="handlePreviewImg(ele.url)"
            >
            <p>
              <span
                v-if="editStatus.status6"
                class="btn"
                @click="handleUploadModal(ruleForm.backPhoto,1)"
              >&nbsp;点击更换反面&nbsp;</span>
              <span v-else class="inlineBlock" />
            </p>
          </div>

          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status6')">编辑</span>

        </el-form-item>

        <el-form-item label-width="150px" label="企业联系电话:" prop="contactTel">
          <span v-if="editStatus.status7">
            <el-input v-model.trim="ruleForm.contactTel" clearable placeholder="区号-固定号码" class="w150" />
            <span class="padlr5">或</span>
            <el-input v-model.trim="ruleForm.contactPhone" clearable placeholder="输入手机号" class="w113" />
          </span>

          <span v-else class="inlineBlock">{{ ruleForm.contactTel }} {{ ruleForm.contactPhone }} </span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status7')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="企业经营地址:" prop="address">
          <div v-if="editStatus.status8">
            <el-select
              v-model="ruleForm.provinceId"
              class="w40"
              placeholder="请选择省市"
              @change="handleProvinceChange"
            >
              <el-option
                v-for="item in provinceData"
                :key="item.id + item.name"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
            <el-select
              v-model="ruleForm.cityId"
              class="w40"
              placeholder="请选择省市"
              @change="handleCityChange"
            >
              <el-option
                v-for="item in cityData"
                :key="item.id + item.name"
                :label="item.name"
                :value="item.id"
              />
            </el-select>

            <el-input v-model.trim="ruleForm.addr" clearable placeholder="请输入详细地址" class="w30" />
          </div>

          <span v-else class="inlineBlock">
            {{ ruleForm.provinceName }}
            {{ ruleForm.cityName }}
            {{ ruleForm.addr }}
          </span>

          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status8')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="上海市装饰装修行业协会会员证书号:" prop="certificateNum">
          <el-input v-if="editStatus.status9" v-model.trim="ruleForm.certificateNum" clearable placeholder="输入会员编号" class="w113" />
          <span v-else class="inlineBlock">{{ ruleForm.certificateNum }}</span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status9')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="会员有效期:" prop="certificateNumEffectEnddate">
          <el-date-picker
            v-if="editStatus.status15"
            v-model="ruleForm.certificateNumEffectEnddate"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="请选择证会员有效期"
          />
          <!-- <el-date-picker
            v-if="editStatus.status15"
            v-model="ruleForm.certificateNumEffectEnddate"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            placeholder="请选择证书有效期">
          </el-date-picker> -->

          <span v-else class="inlineBlock">{{ ruleForm.certificateNumEffectEnddate }}</span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status15')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="施工资质发放单位:" prop="qualificationUnit">
          <el-select
            v-if="editStatus.status10"
            v-model="ruleForm.qualificationUnit"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in qualificationUnitData"
              :key="item.dictionaryId + item.name"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
          <span v-else class="inlineBlock">{{ ruleForm.qualificationUnit }}</span>

          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status10')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="施工资质证书编号:" prop="qualificationNum">
          <el-input v-if="editStatus.status11" v-model.trim="ruleForm.qualificationNum" maxlength="15" clearable placeholder="输入施工资质证书编号" />
          <span v-else class="inlineBlock">{{ ruleForm.qualificationNum }}</span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status11')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="证书有效期:" prop="qualificationEffectEnddate">
          <el-date-picker
            v-if="editStatus.status12"
            v-model="ruleForm.qualificationEffectEnddate"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="请选择证书有效期"
          />
          <!-- <el-date-picker
            v-if="editStatus.status12"
            v-model="ruleForm.qualificationEffectEnddate"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            placeholder="请选择证书有效期">
          </el-date-picker> -->

          <span v-else class="inlineBlock">{{ ruleForm.qualificationEffectEnddate }}</span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status12')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="施工能力或施工资质等级:" prop="qualificationGrade">
          <el-select
            v-if="editStatus.status13"
            v-model="ruleForm.qualificationGrade"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in qualificationGradeData"
              :key="item.dictionaryId + item.name"
              :label="item.name"
              :value="item.name"
            />
          </el-select>

          <span v-else class="inlineBlock">{{ ruleForm.qualificationGrade }}</span>
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status13')">编辑</span>
        </el-form-item>

        <el-form-item label-width="150px" label="施工能力等级/资质证书:" prop="qualificationPhoto" style="border:none">
          <img
            v-for="(ele, index1) in ruleForm.qualificationPhoto"
            :key="index1+ele.url"
            alt=""
            class="imgWrap"
            :src="ele.url"
            @click="handlePreviewImg(ele.url)"
          >
          <span
            v-if="editStatus.status14"
            class="btn"
            @click="handleUploadModal(ruleForm.qualificationPhoto,1)"
          >&nbsp;&nbsp;点击更换&nbsp;&nbsp;</span>
          <span v-else class="inlineBlock" />
          <span v-show="isHideBtn" class="btns right" @click="handleIsShou('status14')">编辑</span>
        </el-form-item>

      </el-form>
    </div>

    <div
      v-if="ruleForm.isUpdate ==1 ? false :
        ruleForm.status == 2 || ruleForm.status == 3 ? true : false"
      class="footerBtn"
    >
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
        :multiple="true"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <div style="padding-top: 14px;line-height: 24px; color: #D9001B;">最多只能上传{{ this.maxNum }}张jpg/png文件，且不超过4MB</div>
    </el-dialog>

    <!-- 确认收货提示_温馨提示 -->
    <el-dialog
      title="温馨提示"
      center
      :visible.sync="dialogSubmitModal"
      width="400px"
      class="submitModal"
    >
      <span class="text">您确认提交吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSubmitModal = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import OSS from 'ali-oss'
import * as Api from '@/api/registrationInforMange'
import { setTimeout } from 'timers'
import imgUrl from '@/assets/null.png'

export default {
  components: {
  },
  data() {
    const validateAddress = (rule, value, callback) => {
      if (!this.ruleForm.provinceId || !this.ruleForm.cityId) {
        callback(new Error('请选择省市区不能为空'))
      } else if (!this.ruleForm.addr) {
        callback(new Error('详细地址不能为空！'))
      } else {
        callback()
      }
    }

    const validateContactTel = (rule, value, callback) => {
      // 固话正则
      const contactTelReg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
      // 手机号正则
      const contactPhoneReg = /^1[3456789]\d{9}$/
      if (!this.ruleForm.contactTel && !this.ruleForm.contactPhone) {
        callback(new Error('固定号码或手机号码必选其一！！'))
      } else if (this.ruleForm.contactTel && !contactTelReg.test(this.ruleForm.contactTel)) {
        callback(new Error('固定号码错误或格式错误 正确确格式：xxxx-xxxxxxxxx'))
      } else if (this.ruleForm.contactPhone && !contactPhoneReg.test(this.ruleForm.contactPhone)) {
        callback(new Error('手机号码有误，请重填'))
      } else {
        callback()
      }
    }

    // 会员证书号
    const validateCertificateNum = (rule, value, callback) => {
      // 正则  大写T 加 4位数字
      const certificateNumlReg = /^[T]\d{4}$/
      if (value == '') {
        callback(new Error('请输入上海市装饰装修行业协会会员证书号'))
      } else if (value && !certificateNumlReg.test(value)) {
        callback(new Error('会员证书号格式不正确,正确格式大写T加4位数字'))
      } else {
        callback()
      }
    }

    // 施工资质证书编号
    const validateQualificationNum = (rule, value, callback) => {
      // 正则  大写T 加 4位数字
      const certificateNumlReg = /^[C]\d{9}$/
      // if (value == '') {
      //   callback(new Error('请输入施工资质证书编号'));
      // } else
      if (value && !certificateNumlReg.test(value)) {
        callback(new Error('证书编号格式不正确,正确格式大写C加9位数字'))
      } else {
        callback()
      }
    }

    const validateCreditCode = (rule, value, callback) => {
      const res = /^[A-Z0-9]{18}$/
      if (!value) {
        callback(new Error('统一社会信用代码不能为空'))
      } else if (value && !res.test(value)) {
        callback(new Error('统一社会信用代码由18位数字或大写字母组成'))
      } else {
        callback()
      }
    }

    return {
      imgUrl: imgUrl,
      // 上一页注册成功的信息
      oldInfor: {},
      loading: false,
      // 是否显示编辑按钮
      isHideBtn: false,
      editStatus: {
        status1: false,
        status2: false,
        status3: false,
        status4: false,
        status5: false,
        status6: false,
        status7: false,
        status8: false,
        status9: false,
        status10: false,
        status11: false,
        status12: false,
        status13: false,
        status14: false,
        status15: false,

        status16: false,
        status17: false,
        status18: false
      },
      // 备份数据
      details: {},
      // 提交数据
      ruleForm: {
        // 企业名称
        name: '',
        // 企业id
        customerId: '',
        // 统一社会信用代码
        creditCode: '',
        // 联系电话
        contactTel: '',
        // 联系手机号
        contactPhone: '',
        // 企业经营地址省id
        provinceId: '',
        // 企业经营地址省名称
        provinceName: '',
        // 企业经营地址市id
        cityId: '',
        // 企业经营地址市名称
        cityName: '',
        // 详细地址
        addr: '',
        // 行业协会会员证书号
        certificateNum: '',
        // 施工资质发放单位
        qualificationUnit: '',
        // 资质或能力等级
        qualificationGrade: '',
        // 施工资质证书编号
        qualificationNum: '',
        // 施工资质有效期
        qualificationEffectEnddate: '',
        // 会员有效期
        certificateNumEffectEnddate: '',
        // 法人
        legalPerson: '',
        // 法人身份证号
        idNum: '',

        // ++++++++++++   数据类型转换的++++++++++
        // 营业执照
        businessLicense: [

        ],
        // 身份证正面照
        facePhoto: [

        ],
        // 身份证反面照
        backPhoto: [

        ],
        // 施工资质证书url
        qualificationPhoto: [

        ]
      },
      rules: {
        // 企业营业执照
        // businessLicense:[
        //   { required: true, message: '请上传企业营业执照图片', trigger: 'change' },
        // ],
        // // 统一社会信用代码
        // creditCode:[
        // { required: true,  trigger: 'change', validator: validateCreditCode},

        // ],
        // // 电话
        // contactTel:[
        //   { required: true, trigger: 'change', validator: validateContactTel },
        //   // { required: true, message: '请输入企业联系电话', trigger: 'change' },
        // ],
        // // 手机
        // contactPhone:[
        //   { required: true, message: '请输入手机号码', trigger: 'change' },
        // ],
        // // 地址
        // address:[
        //   // { required: true, message: '请选择地址', trigger: 'change' },
        //   { required: true, trigger: 'change', validator: validateAddress },
        // ],
        // // 上海市装饰装修行业协会会员证书号
        // certificateNum: [
        //   { required: true, trigger: 'change', validator: validateCertificateNum },
        // ],
        //  // 施工资质证书编号
        // qualificationNum:[
        //  // { validator: validateQualificationNum, trigger: 'change'},
        // { min: 0, max: 15, message: '编号不能超过15个字符',}
        // ],

        // 上传施工资质证书
        // qualificationPhoto:[
        //   { required: true, message: '请上传施工能力等级/资质证书', trigger: 'change' },
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
        // // 企业法人
        // legalPerson:[
        //   { required: true, message: '请输入企业法人', trigger: 'change' },
        // ],
        // // 法人身份证号
        // idNum:[
        //   { required: true, message: '请输入法人身份证号', trigger: 'change' },
        // ],
        // // 法人证照
        // PhotoList:[
        //   { required: true, message: '请上传法人证照', trigger: 'change' },
        // ]

      },
      options: [],
      // 省级显示列表
      provinceData: [
        // {
        //   child: [],
        //   id: 1,
        //   name: "北京",
        // }
      ],
      // 市级列表
      cityData: [],
      // 施工资质发放单位列表
      qualificationUnitData: [],
      // 施工资质或施工能力等级评价列表
      qualificationGradeData: [],
      // 预览弹窗
      dialogTablePreview: false,
      // 确定注册弹窗
      dialogSubmitModal: false,
      // 上传照片
      dialogUploadModal: false,
      // 上传照片地址数组
      contractFileURLs: [],
      // 允许上传最大张数
      maxNum: 1,
      // 图片预览地址
      PreviewImgUrl: '',
      // 阿里云上传服务端签名
      aliyunOssSign: {
        accessid: '',
        policy: '',
        signature: '',
        dir: '',
        host: '',
        expire: ''
      }
    }
  },
  computed: {},
  watch: {},

  mounted() {},

  created() {
    // 获取公用列表
    this.init()
  },

  methods: {
    init() {
      // 获取企业信息, 登录时
      this.handeGetCustomerDetailByLoginUser()
      // 根据层级获取行政区域, 0为省级, 1为市级
      this.handleGetListByLevel(0)
      // 施工资质发放单位接口
      this.handleGetDictionaryList1()
      // 施工资质证书等级接口
      this.handleGetDictionaryList2()
    },

    // 获取企业信息, 登录时
    handeGetCustomerDetailByLoginUser() {
      const param = {
        customerName: this.ruleForm.name
      }
      Api.getCustomerDetailByLoginUser().then(res => {
        const { code, data, msg, total } = res
        if (code == 200) {
          // 数据类型转换
          data.businessLicense = data.businessLicense ? [{ name: '', url: data.businessLicense }] : []
          data.facePhoto = data.facePhoto ? [{ name: '', url: data.facePhoto }] : []
          data.backPhoto = data.backPhoto ? [{ name: '', url: data.backPhoto }] : []
          data.qualificationPhoto = data.qualificationPhoto ? [{ name: '', url: data.qualificationPhoto }] : []
          // 控制按钮
          // 状态:0(新注册，等待完善资料),1(待审核),2(已审核通过),3(审核不通过),4(关闭),5(停用),6(冻结)
          // data.status = 1
          // data.isUpdate = 1
          // console.log(data.status)

          this.details = Object.assign({}, JSON.parse(JSON.stringify(data)))
          this.ruleForm = data

          // 获取市级 列表 参数（1:区级id  2:是否清空区级id ）
          this.handleGetListByParentId(this.ruleForm.provinceId, 1)

          if (data.isUpdate == 1) {
            this.isHideBtn = false
            return
          }
          if (data.status == 1) {
            this.isHideBtn = false
          } else if (data.status == 2) {
            // 已审核通过 显示
            this.isHideBtn = true
          } else if (data.status == 3) {
            // 审核不通过 不显示按钮显示编辑状态
            this.isHideBtn = false
            Object.keys(this.editStatus).forEach(key => {
              this.editStatus[key] = true
            })
          } else {
            // 只显示页面
            this.isHideBtn = false
            Object.keys(this.editStatus).forEach(key => {
              this.editStatus[key] = false
            })
          }

          // console.log(data)
        }
      }).catch(error => {
      })
    },

    // 上传照片 点击弹窗
    handleUploadModal(row, maxNum) {
      // console.log(row)
      this.maxNum = maxNum
      this.contractFileURLs = row
      this.dialogUploadModal = true
    },

    // 阿里云上传服务端签名接口
    handleGetAliyunOssSign(file) {
      Api.getAliyunOssSign().then(res => {
        // let {accessid, policy, signature, dir, host, expire } = res.data
        const { accessKeySecret, assessKeyId, bucket, path, region, stsToken } = res.data
        const client = new OSS.Wrapper({
          accessKeyId: assessKeyId,
          accessKeySecret: accessKeySecret,
          stsToken: stsToken,
          region,
          bucket,
          secure: true
        })
        // 上传到阿里云
        const name = new Date().getTime() + ''
        const suffix = file.name.substr(file.name.lastIndexOf('.') + 1)
        client.multipartUpload(`${path}/${name}.${suffix}`, file, {
          progress: function * (percentage) {}
        })
          .then(res => {
            const imgUrl = `https://${bucket}.${region}.aliyuncs.com/${res.name}`
            this.contractFileURLs.push({
              'name': name,
              'url': imgUrl
            })
          })
          .catch(err => {
            this.$message({
              message: '照片上传失败！',
              type: 'error'
            })
            // 请求错误时 应该删除
            this.removeUplodFileList(file.name)
          })
      }).catch(error => {
      })
    },

    // 施工资质发放单位接口
    handleGetDictionaryList1() {
      Api.getDictionaryList1().then(res => {
        const { code, data, msg, total } = res
        if (code == 200) {
          this.qualificationUnitData = data
        }
      }).catch(error => {
      })
    },
    // 施工资质证书等级接口
    handleGetDictionaryList2() {
      Api.getDictionaryList2().then(res => {
        const { code, data, msg, total } = res
        if (code == 200) {
          this.qualificationGradeData = data
        }
      }).catch(error => {
      })
    },
    // 根据层级获取行政区域, 0为省级, 1为市级
    handleGetListByLevel(param) {
      // 0为省级, 1为市级
      Api.getListByLevel(param).then(res => {
        const { code, data, msg, total } = res
        if (code == 200) {
          this.provinceData = data
        }
      }).catch(error => {
      })
    },

    // 按上级id获取下一级区域接口  参数（1:区级id  2:是否清空区级id ）
    handleGetListByParentId(param, onOff) {
      const isClear = !onOff
      if (isClear) {
        this.ruleForm.cityName = ''
        this.ruleForm.cityId = ''
      }
      Api.getListByParentId(param).then(res => {
        const { code, data, msg, total } = res
        if (code == 200) {
          this.cityData = data
        }
      }).catch(error => {
      })
    },

    // 省份change事件
    handleProvinceChange() {
      const item = this.provinceData.filter(item => item.id == this.ruleForm.provinceId)[0]
      this.ruleForm.provinceName = item.name
      // 获取市级 city
      this.handleGetListByParentId(this.ruleForm.provinceId)
    },

    // 市级选中事件
    handleCityChange() {
      const item = this.cityData.filter(item => item.id == this.ruleForm.cityId)[0]
      this.ruleForm.cityName = item.name
    },

    // 确定注册点击事件
    handleConfirmButtonClick() {
      // 提交验证函数
      if (!this.handleSubmitValidation()) {
        return
      }
      // 确认注册弹窗显示
      this.dialogSubmitModal = true
    },

    // 提交验证函数
    handleSubmitValidation() {
      let onOff = true
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          onOff = true
        } else {
          // console.log('error submit!!');
          this.$message({
            message: '请将必填信息填写完整！',
            type: 'warning'
          })
          onOff = false
        }
      })
      return onOff
    },

    // 弹窗确定点击提交
    handleSubmit() {
      // 状态:0(新注册，等待完善资料),1(待审核),2(已审核通过),3(审核不通过),4(关闭),5(停用),6(冻结)
      if (this.ruleForm.status == 3) {
        // 审核不通过走完善提交资料接
        this.handlePerfectPsot()
      } else {
        // 走审核通过提交接口
        this.handleModifyPost()
      }
    },

    // 审核不通过走完善提交资料接
    handlePerfectPsot() {
      // console.log('审核不通过走完善提交资料接')
      const param = Object.assign({}, JSON.parse(JSON.stringify(this.ruleForm)))
      // console.log(param,'param')
      this.loading = true
      param.backPhoto = param.backPhoto.length ? param.backPhoto[0].url : ''
      param.facePhoto = param.facePhoto.length ? param.facePhoto[0].url : ''
      param.businessLicense = param.businessLicense.length ? param.businessLicense[0].url : ''
      param.qualificationPhoto = param.qualificationPhoto.length ? param.qualificationPhoto[0].url : ''

      // return
      Api.subUserCustomerComplete(param).then(res => {
        this.loading = false
        this.dialogSubmitModal = false
        const { code, data, msg, total } = res
        if (code == 200) {
          this.$message({
            message: '注册成功请耐心等待平台审核',
            type: 'success'
          })
          setTimeout(() => {
            // 刷新页面
            this.$router.go(0)
          }, 1000)
          // setTimeout(() => {
          //   this.handleGoBack()
          // }, 1500);
        }
      }).catch(error => {
        this.loading = false
        this.dialogSubmitModal = false
      })
    },

    // 走审核通过提交接口
    handleModifyPost() {
      // console.log('走审核通过提交接口')
      const obj1 = Object.assign({}, JSON.parse(JSON.stringify(this.ruleForm)))
      const obj2 = Object.assign({}, JSON.parse(JSON.stringify(this.details)))
      obj1.backPhoto = obj1.backPhoto.length ? obj1.backPhoto[0].url : ''
      obj1.facePhoto = obj1.facePhoto.length ? obj1.facePhoto[0].url : ''
      obj1.businessLicense = obj1.businessLicense.length ? obj1.businessLicense[0].url : ''
      obj1.qualificationPhoto = obj1.qualificationPhoto.length ? obj1.qualificationPhoto[0].url : ''

      obj2.backPhoto = obj2.backPhoto.length ? obj2.backPhoto[0].url : ''
      obj2.facePhoto = obj2.facePhoto.length ? obj2.facePhoto[0].url : ''
      obj2.businessLicense = obj2.businessLicense.length ? obj2.businessLicense[0].url : ''
      obj2.qualificationPhoto = obj2.qualificationPhoto.length ? obj2.qualificationPhoto[0].url : ''
      // console.log(obj1,obj2,'22222222222')
      const param = {}
      Object.keys(obj1).forEach(key => {
        if (obj1[key] != obj2[key]) {
          param[key] = obj1[key]
          // if(key == 'backPhoto' || key == 'businessLicense' || key == 'facePhoto' || key == 'qualificationPhoto'){
          //   if(obj1[key] == obj2[key]){
          //      param[key] = obj1[key]
          //   }
          // }
          // else{
          //   param[key] = this.ruleForm[key]
          // }
        }
      })
      this.loading = true
      // console.log(param)
      // return
      Api.subUserCustomerChange(param).then(res => {
        this.loading = false
        this.dialogSubmitModal = false
        const { code, data, msg, total } = res
        if (code == 200) {
          this.$message({
            message: '注册成功请耐心等待平台审核',
            type: 'success'
          })
          setTimeout(() => {
            // 刷新页面
            this.$router.go(0)
          }, 1000)
        }
      }).catch(error => {
        this.loading = false
        this.dialogSubmitModal = false
      })
    },

    // 显示编辑
    handleIsShou(item) {
      // console.log(this.editStatus[item])
      this.editStatus[item] = !this.editStatus[item]
      // console.log(this.editStatus[item])
    },
    // 请选择省市

    // 确定注册点击事件
    handleConfirmButtonClick() {
      // 提交验证函数
      if (!this.handleSubmitValidation()) {
        return
      }
      // 确认注册弹窗显示
      this.dialogSubmitModal = true
    },

    // 返回
    handleGoBack() {
      // this.$router.push({
      //   name:'query',
      // })
      // this.$router.go(-1)
      this.$router.back(-1)
    },

    // 图片预览
    handlePreviewImg(imgUrl) {
      this.PreviewImgUrl = imgUrl.url || imgUrl
      this.dialogTablePreview = true
    },

    // 上传时再次校验数据 限制类型、大小
    onBeforeUpload(file) {
      const isIMAGE = file.type == 'image/jpeg' || 'image/gif' || 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 4

      if (!isIMAGE) {
        this.$message({
          message: '上传文件只能是图片格式!',
          type: 'error'
        })
      }
      if (!isLt1M) {
        this.$message({
          message: '上传文件大小不能超过 4MB!',
          type: 'error'
        })
      }
      return isIMAGE && isLt1M
    },
    // 上传个数超出限制
    myUploadOnExceed(file) {
      this.$message({
        message: '上传文件不能超过' + this.maxNum + '张!',
        type: 'error'
      })
    },

    // 自定义上传
    myUpload(content) {
      const _this = this
      const loading = this.$loading({
        lock: true,
        text: '上传中请稍候....',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const reader = new FileReader()
      reader.readAsDataURL(content.file)// 这个读法是异步的
      reader.onloadend = function() {
        // 这个事件在读取结束后，无论成功或者失败都会触发
        if (reader.error) {
          console.log(reader.error, '上传错误')
          // 上传错误时 应该删除
          _this.removeUplodFileList(content.file.name)
          loading.close()
        } else {
          loading.close()
          let data64 = reader.result
          data64 = data64.slice(data64.indexOf(',') + 1)
          const param = {
            base64Data: data64,
            name: content.file.name
          }

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
      this.contractFileURLs.forEach((item, index) => {
        if (item.name == file.name) {
          index_ = index
        }
      })
      this.contractFileURLs.splice(index_, 1)
    },

    // 上传失败 删除 显示列表的照片
    removeUplodFileList(name) {
      let index_ = ''
      this.$refs.upload.uploadFiles.forEach((item, index) => {
        if (item.name == name) {
          index_ = index
        }
      })
      this.$refs.upload.uploadFiles.splice(index_, 1)
    }

  }
}
</script>
<style lang="scss">
.registrationInforMange{
  min-width:900px;
  margin: 0 auto;

  .imgBtnWrap {
    overflow: hidden;
    .el-form-item__label {vertical-align: top;}
    .imgItem {
      float: left;
      text-align: center;
      margin-right: 12px;
    }
  }

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
  .el-form--inline .el-input.w113 {
    width: calc(100% - 230px);
  }

  .el-form--inline .el-input.w150 {
    width: 150px;
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
    padding: 8px 0;
    padding-bottom: 17px;
    margin: 0;
    min-width: 300px;
  }
</style>
