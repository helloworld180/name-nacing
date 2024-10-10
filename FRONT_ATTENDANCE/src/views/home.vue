<template>
    <div class="home">
        <div class="content">
            <!-- 展示区 -->
            <div class="leftIcon">
                <RouterView></RouterView>
            </div>
            <!-- 导航栏 -->
            <div class="select">
                <div @click="gotoImpt" class="selectItem">
                    导入文件
                </div>
                <div @click="gotoCall" class="selectItem">
                    开始点名
                </div>
                <div @click="gotoRule" class="selectItem">
                    规则设置
                </div>
                <div @click="gotoChart" class="selectItem">
                    查看排行
                </div>

                <div class="back" @click="goLogin">
                    <div>退出登录</div>
                    <img src="../assets/image/back.svg" alt="" style="width: 40px;margin-left: 15px;">
                </div>
            </div>

            

        </div>
    </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import axios from '@/utils/axiosConfig';
export default {
    data() {
        return {

        }
    },
    methods: {
        gotoImpt(){
            this.$router.push('/home/importFile')
        },
        gotoRule() {
            this.$router.push('/home/ruleSetting')
        },
        gotoChart() {
            this.$router.push('/home/seeChart')
        },
        gotoCall() {
            this.$router.push('/beginCall')
        },
        async goLogin() {
            try {
                const response = await axios.post('/teacher/logout');
                console.log('退出登录成功', response)
                // 退出登录成功后的操作，比如跳转到主页
                this.$router.push('/');
            } catch (error) {
            // 处理登录错误
            console.error('退出登录错误:', error);
            }
        }
    }
}
</script>

<style scoped>
.home {
    background-image: url('../assets/image/bgcImg.png'); /* 图片路径 */
    width:100%;
    height:100%;
    position:fixed;
    background-size:100% 100%;
}
.content {
    height:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 120px;
}
.leftIcon {
    width: 700px;
    height: 800px;
    /* background-color: red; */
}
.selectItem {
    padding: 25px 130px;
    border-radius: 50px;
    background-color: #A182FF;
    color: #FFFFFF;
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 65px;
    cursor: pointer;
    text-decoration: none;
}
.selectItem:hover {
    background-color: #6231F5;
}

.back {
    display: flex;
    position: absolute;
    font-size: 28px;
    font-weight: bold;
    color: #9276CF;
    right: 2.5%;
    bottom: 4%;
    cursor: pointer;
}
.back:hover {
    color: #6231F5;
}

</style>