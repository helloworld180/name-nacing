<template>
    <div class="beginCall">
      <img src="../assets/image/coffee.png" alt="Coffee Image">
      <div class="text-container">
        <div
          v-for="(text, index) in texts"
          :key="index"
          class="text"
          :style="text.style"
          @animationend="removeText(index)"
        >
          {{ text.content }}
        </div>
      </div>

      <div class="btnBack" @click="back">返回</div>
      <div class="btnStop" @click="stop">暂停</div>

    </div>
  </template>
  
  <script>
import axios from '@/utils/axiosConfig';
import { ref } from 'vue';

  export default {
    data() {
      // const names = ref([])
      return {
        // 防止文字变得越来越多
        maxTexts: 80,
        names: [],
        texts: [],
      };
    },
    mounted() {
        this.fetchNames();
        // this.names = ['文字1', '文字2', '文字3', '文字4', '文字5'];
        this.startRain();
    },
    methods: {
        // 获取names
        async fetchNames() {
            try {
                const response = await axios.get('/students/names',null); 
                // this.names = response.data;
                // console.log('后端响应：' + response)
                if (Array.isArray(response)) {
                    this.names = response;
                    console.log('后端传值response：', this.names);
                } else if (typeof response === 'object' && Array.isArray(response.data))  {
                  this.names = response.data;
                }else{
                  console.error('后端返回的数据不是数组格式');
                    this.names = ['文字1', '文字2', '文字3', '文字4', '文字5']; // 设置为空数组作为默认值
                    console.log('实际接收到的数据：', response.data);
                }
                if (this.names.length === 0 || this.names.every(name => name.trim() === '')) {
                  alert('请先导入学生名单');
                  this.back()
                  // 根据需要，可以设置默认值或者直接返回
                  // this.names = ['默认值1', '默认值2']; // 设置默认值，如果需要的话
                  return; // 如果数组为空或全为空字符串，则提前返回，不再执行后续代码
                }

            } catch (error) {
                console.error('获取names失败:', error);
                // 可以设置一些默认值
                // this.names = ['令狐', '令狐新锐', '令狐冲', '文字4', '文字5'];
            }
        },

        // 为每个文字生成随机的样式
        getTextStyle() {
            const left = Math.floor(Math.random() * 80) + 5; // 生成一个10%到90%之间的随机值，决定文字在水平方向上的起始位置。
            const size = Math.random() * 1.8 + 0.5; // 生成一个0.5em到1.5em之间的随机大小，控制文字的大小。
            const duration = Math.random() * 2 + 5; // 生成一个2-7秒之间的随机持续时间，控制文字下落的速度。
            return {
            left: `${left}%`,
            fontSize: `${size}em`,
            animationDuration: `${duration}s`,
            };
        },

        // 持续创建新的文字元素，模拟雨滴不断落下的效果
        startRain() {
            // 每200毫秒执行一次函数体
            setInterval(() => {
            if (this.texts.length < this.maxTexts) {
                // 从 names 数组中随机选择一个文字内容
                const content = this.names[Math.floor(Math.random() * this.names.length)];
                // 调用 getTextStyle() 获取随机样式
                const style = this.getTextStyle();
                // 将新创建的文字对象（包含内容和样式）添加到 texts 数组中
                this.texts.push({ content, style });
            }
            }, 100); // 每1s生成一个新的雨滴
        },

        // 在动画结束后移除文字元素
        removeText(index) {
            this.texts.splice(index, 1);
        },

        // 点名停止
        stop() {
            this.$router.push('/result')
        },
        // 返回上一页
        back() {
            this.$router.push('/home')
        }
    },
  };
  </script>
  
  <style scoped>
  .beginCall {
    background-image: url('../assets/image/bgcImg.png');
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
  }
  
  .beginCall img {
    position: absolute;
    top: 0;
    left: 50%;
    width: 30%;
    height: auto;
  }
  
  .text-container {
    position: absolute;
    top: 35%;
    left: 15%;
    width: 70%;
    height: 70%;
    overflow: hidden;
  }
  
  .text {
    position: absolute;
    animation: rain 8s linear infinite;
    opacity: 0; /* 初始状态设为透明 */
  }
  
  @keyframes rain {
    0%, 100% {
    transform: translateY(-10%) scale(1);
    opacity: 0;
    color: #f13f69;
  }
  10% {
    /* transform: translateY(0) scale(1); */
    opacity: 1;
    color: #f13f69;
  }
    50% {
        color: #e34166;
    }
    80% {
      transform: translateY(60vh) scale(1.3);
      opacity: 1;
      color: #ccb2f9; /* 中间颜色 */
    }
    100% {
      transform: translateY(50vh) scale(1.3);
      opacity: 0;
      color: #F5B2C2;
    }
  }

  .btnStop {
    position: absolute;
    bottom: 4%;
    right: 3%;
    padding: 10px 100px;
    border-radius: 50px;
    font-size: 35px;
    font-weight: bold;
    color: #fff;
    background-color: #A182FF;
    cursor: pointer;
  }
  .btnStop:hover, .btnBack:hover {
    background-color: #6231F5;
  }
  .btnBack {
    position: absolute;
    bottom: 4%;
    left: 3%;
    padding: 10px 100px;
    border-radius: 50px;
    font-size: 35px;
    font-weight: bold;
    color: #fff;
    background-color: #A182FF;
    cursor: pointer;
  }
  </style>