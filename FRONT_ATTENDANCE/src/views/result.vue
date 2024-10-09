<template>
    <div class="lucky-popup">
        <!-- header -->
        <div class="header">
            <div>幸运儿出现了 ！</div>
            <img src="../assets/image/close.png" alt="" class="icon" @click="close">
        </div>

        <div class="lucky-info">
            <img src="../assets/image/group.svg" alt="" class="lucky-icon">
            <div class="student-id">{{ studentId }}</div>
            <div class="student-name">{{ studentName }}</div>
            <div class="student-msg" v-if="nameOrQuestion === '提问'">{{ message }}</div>
        </div>

        <!-- 选择分数 -->
        <div class="score-buttons" v-if="nameOrQuestion === '提问'">
            <button 
                v-for="(score, index) in qsScores" 
                :key="index"
                :class="['score-btn', { active: selectedScore === score.value }]"
                @click="selectScore(score.value)"
            >
                {{ score.label }}
                <input 
                v-if="index === 2" 
                type="number" 
                v-model="customScore"
                @input="selectCustomScore"
                ><div v-if="index === 2">分</div>
            </button>
        </div>
        <!-- 点名的选项 -->
        <div class="score-buttons" v-else-if="nameOrQuestion === '点名'">
            <button 
                v-for="(score, index) in dmScores" 
                :key="index"
                :class="['score-btn', { active: selectedScore === score.value }]"
                @click="selectScore(score.value)"
            >
                {{ score.label }}
            </button>
        </div>

        <!-- 底部 -->
        <div class="bottom">
            <div class="confirm" @click="confirmAdjustment">确认</div>
            <div class="cancel" @click="close">取消</div>
        </div>

    </div>
  </template>
  
  <script>
  import axios from '@/utils/axiosConfig'; 
  import router from '@/router';
  
  export default {
    data() {
      return {
        studentId: '102201338',
        studentName: '令狐新锐',
        message: '赌徒事件--学生可以在回答问题前下注一定数量的积分，如果回答正确，则按赌注倍数获得积分；如果错误，则失去赌注积分',
        selectedScore: null,
        customScore: '',

        // 规则设置的值
        nameOrQuestion:'',
        triggerRandomEvent:'',
        enableFateWheel:'',

        qsScores: [
          { label: '+0.5分', value: 0.5 },
          { label: '-1分', value: -1 },
          { label: '', value: null }
        ],

        dmScores: [
          { label: '已到达课堂，加1分', value: 1 },
          { label: '未到达课堂，减1分', value: -1 },
        ],
      };
    },
    mounted() {
      this.loadStudentData();
    },
    methods: {
      async loadStudentData () {
        this.nameOrQuestion = localStorage.getItem('nameOrQuestion');
        console.log('nameOrQuestion的值为：' + this.nameOrQuestion)
        this.triggerRandomEvent = localStorage.getItem('triggerRandomEvent');
        console.log('triggerRandomEvent的值为：' + this.triggerRandomEvent)
        this.enableFateWheel = localStorage.getItem('enableFateWheel');
        console.log('enableFateWheel的值为：' + this.enableFateWheel)
        const data = {
          rollCallMode: this.nameOrQuestion,
          triggerRandomEvent: this.triggerRandomEvent,
          wheelOfFortune: this.enableFateWheel,
        }

        // 发送给后端，接收点名结果
        try {
            const response = await axios.post('/rollcall/start', data); 
            console.log('后端响应:', response.data);
            this.studentId = response.studentId;
            this.studentName = response.name;
            this.message = response.message;
        } catch (error) {
            console.error('发送请求时出错:', error);
        }


      },

      // 保存选择分数的函数
      selectScore(value) {
        this.selectedScore = value;
        if (value !== null) {
          this.customScore = '';
        }
      },
      selectCustomScore() {
        if (this.customScore !== '') {
          this.selectedScore = parseFloat(this.customScore);
        } else {
          this.selectedScore = null;
        }
      },

      // 点击确认
      async confirmAdjustment() {
        let pointsDelta = this.selectedScore;
        if (this.customScore !== '') {
          pointsDelta = parseFloat(this.customScore);
        }
        if (pointsDelta === null || isNaN(pointsDelta)) {
          alert('请选择或输入有效的调整分数');
          return;
        }
        try {
          // const response = await axios.post('/students/${this.studentId}/adjustPoints', pointsDelta)
          await axios.put(`http://localhost:8080/api/students/${this.studentId}/adjustPoints`, {
            pointsDelta: pointsDelta
          });
          alert('积分调整成功');
          this.close();
        } catch (error) {
          console.error('积分调整失败:', error);
          alert('积分调整失败，请重试');
        }
      },
      close() {
        this.$router.push('/home')
      }
    }
  };
  </script>
  
  <style scoped>
    @import '../assets/css/result.css'
  </style>