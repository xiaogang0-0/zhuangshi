<template>
  <div class="dashboard-editor-container">

    <div class="dashboard-text"><img class="welcomeImg" :src='img'/></div>
    
   
  </div>
</template>

<script>
import welcomell from "@/assets/welcome.png";

import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      // 显示哪个首页  user 为客户端   admin 为后台登录
      isShow:'user',
      img:welcomell,
      lineChartData: lineChartData.newVisitis
    }
  },
  mounted() {
    // this.isShow = localStorage.getItem ('Siw-userInfo',JSON.stringify(res.data)) ? localStorage.getItem ('Siw-userInfo',JSON.stringify(res.data)) : 'user'
    // this.isShow = localStorage.getItem ('Siw-userInfo',JSON.stringify(res.data)) ? localStorage.getItem ('Siw-userInfo',JSON.stringify(res.data)) : 'admin'
    // 显示哪个首页  user 为客户端   admin 为后台登录
    if(this.isShow == 'user'){
        console.log(111)
        this.$router.push({
        name:'registrationInforMange'
      })
    }
    if(this.isShow == 'admin'){
        console.log(222)
        this.$router.push({
        name:'companyManagement'
      })
    }
  },
  methods: {
    // handleSetLineChartData(type) {
    //   this.lineChartData = lineChartData[type]
    // }
    
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .dashboard-text{
    text-align: center;
    display: flex;
    justify-content:center;
    align-items:Center;
    min-height: calc(100vh - 152px);
    // min-height: calc(100vh - 115px);
    
  }
  .welcomeImg {
    width:450px;
    height: 450px;
  }
}

</style>
