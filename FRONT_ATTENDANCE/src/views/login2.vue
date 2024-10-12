<template>
    <div class="login-register-container">
      <div class="form-box">
        <h2>让我们开始点名</h2>
        <div class="tab-switch">
          <span 
            :class="{ active: activeTab === 'login' }" 
            @click="switchTab('login')"
          >
            登录
          </span>
          <span 
            :class="{ active: activeTab === 'register' }" 
            @click="switchTab('register')"
          >
            注册
          </span>
        </div>
        
        <!-- 登录表单 -->
        <form v-if="activeTab === 'login'" @submit.prevent="handleLogin">
          <div class="input-group">
            <img src="../assets/image/person.png" alt="" class="input-icon">
            <input 
              v-model="loginForm.phone" 
              type="text" 
              placeholder="请输入您的手机号"
              placeholder-class="placeholder"
            >
          </div>

          <div class="input-group">
            <img src="../assets/image/password.png" alt="" class="input-icon">
            <input 
              v-model="loginForm.password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="请输入您的密码"
            >
            <img src="../assets/image/eye.png"
            v-if="showPassword"
             class="input-icon"
            @click="togglePasswordVisibility"
            style="cursor: pointer;margin-right: 15px;"
            >
            <img src="../assets/image/eyeClose.png"
            v-if="!showPassword"
             class="input-icon"
            @click="togglePasswordVisibility"
            style="cursor: pointer;margin-right: 15px;"
            >
          </div>
          <div class="forgot-password">
            <!-- <a href="#">忘记密码?</a> -->
          </div>
          <button type="submit" class="submit-btn">登 录</button>
        </form>
  
        <!-- 注册表单 -->
        <form v-else @submit.prevent="handleRegister">
          <div class="input-group">
            <img src="../assets/image/person.png" alt="" class="input-icon">
            <input 
              v-model="registerForm.phone" 
              type="text" 
              placeholder="请输入您的手机号"
            >
          </div>

          <div class="input-group">
            <img src="../assets/image/password.png" alt="" class="input-icon">
            <input 
              v-model="registerForm.password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="请输入您的密码"
            >
            <img src="../assets/image/eye.png"
            v-if="showPassword"
             class="input-icon"
            @click="togglePasswordVisibility"
            style="cursor: pointer;margin-right: 15px;"
            >
            <img src="../assets/image/eyeClose.png"
            v-if="!showPassword"
             class="input-icon"
            @click="togglePasswordVisibility"
            style="cursor: pointer;margin-right: 15px;"
            >
          </div>

          <div class="input-group">
            <img src="../assets/image/password.png" alt="" class="input-icon">
            <input 
              v-model="registerForm.confirmPassword" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="再次确认密码"
            >
            <img src="../assets/image/eye.png"
            v-if="showPassword"
             class="input-icon"
            @click="togglePasswordVisibility"
            style="cursor: pointer;margin-right: 15px;"
            >
            <img src="../assets/image/eyeClose.png"
            v-if="!showPassword"
             class="input-icon"
            @click="togglePasswordVisibility"
            style="cursor: pointer;margin-right: 15px;"
            >
          </div>
          <button type="submit" class="submit-btn" style="margin-top: 25px;">注册</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '@/utils/axiosConfig';
  import {getToken, setToken} from '@/token/auth'
  export default {
    data() {
      return {
        activeTab: 'login',
        showPassword: false,
        showConfirmPassword: false,
        loginForm: {
          phone: '',
          password: ''
        },
        registerForm: {
          phone: '',
          password: '',
          confirmPassword: ''
        }
      }
    },
    methods: {
      switchTab(tab) {
        this.activeTab = tab;
      },
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      },
      // 登录逻辑
      async handleLogin() {
        try {
          const response = await axios.post('/teacher/login', null, {
            params: {
              username: this.loginForm.phone,
              password: this.loginForm.password
            }

          });
          console.log('登录成功', response)
          // 假设token在响应的data字段中
          // !!存疑！!
          const token = response.token;
          // 存储token
          setToken(token);
          // console.log( 'token是：' + getToken() )


          // 登录成功后的操作，比如跳转到主页
          this.$router.push('/home');
        } catch (error) {
          // 处理登录错误
          console.error('登录错误:', error);
        }
      },
      // 注册逻辑
      async handleRegister() {
        if (this.registerForm.password !== this.registerForm.confirmPassword) {
          alert('两次输入的密码不一致');
          return;
        }
        try {
          // 这里调用后端注册接口
          const response = await axios.post('/teacher/register', null, {
            params:{
              username: this.registerForm.phone,
              password: this.registerForm.password,
            }
          });
          // 处理注册成功逻辑
          alert('注册成功');
          console.log('注册成功', response);
        } catch (error) {
          // 处理注册失败逻辑
          console.error('注册失败', error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  @import '../assets/css/login.css'
  </style>