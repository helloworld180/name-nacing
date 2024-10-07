<template>
    <div class="imptFile">
        <!-- 头部 -->
        <div class="header">
            <div>规则设置</div>
            <img src="../assets/image/close.png" alt="" class="icon" @click="close">
        </div>
        <div style="border: 1.5px solid #C8C1C1;"></div>

        <!-- 问题 -->
        <el-form :model="form" label-position="top">
            <el-form-item label="进行点名 or 提问 ？">
                <el-radio-group v-model="form.nameOrQuestion">
                    <el-radio label="点名">点名</el-radio>
                    <el-radio label="提问">提问</el-radio>
                </el-radio-group>
            </el-form-item>
      
            <el-form-item label="是否触发随机事件 ？">
                <el-radio-group v-model="form.triggerRandomEvent">
                    <el-radio label="触发">触发</el-radio>
                    <el-radio label="不触发">不触发</el-radio>
                </el-radio-group>
            </el-form-item>

            <!-- 最后一个问题 -->
            <el-tooltip
                    content="今天众生平等！所有人被抽到的概率相等"
                    placement="bottom-start"
                    effect="dark"
            >
                <div class="lastQues">是否开启&quot;命运轮盘&quot; ？</div>
            </el-tooltip>
            <el-radio-group v-model="form.enableFateWheel" class="lastOpt">
                    <el-radio label="是">是</el-radio>
                    <el-radio label="否">否</el-radio>
            </el-radio-group>

        </el-form>
        
        <!-- 底部 -->
        <div class="bottom">
            <div style="display: flex;">
                <div class="confirm" @click="confirmSetting">确认</div>
                <div class="cancel" @click="close">取消</div>
            </div>
                
        </div>
    </div>
    
</template>

<script lang="ts" setup>
import router from '@/router';
import { ref } from 'vue'
import { ElTooltip } from 'element-plus'

const form = ref({
  nameOrQuestion: '点名',
  triggerRandomEvent: '触发',
  enableFateWheel: '否'
})
const confirmSetting = () => {
  // 确认设置,向后端发送数据
  const data = {
    nameOrQuestion: form.value.nameOrQuestion,
    triggerRandomEvent: form.value.triggerRandomEvent,
    enableFateWheel: form.value.enableFateWheel,
  }
    // 打印 form 的值
    console.log(form.value.nameOrQuestion)
  // 这里调用API发送数据到后端
  console.log('发送到后端的数据:', data)
}
function close() {
    router.push('/home')
}

</script>


<style scoped>
.imptFile{
    position: relative;
    background-color: #fff;
    border-radius: 40px;
    height: 100%;
    padding-top: 10px;
    box-shadow: 5px 10px 10px 5px rgba(2, 2, 2, 0.1);
    overflow: hidden;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 60px;
    font-size: 35px;
    font-weight: bold;
}
.icon {
    width: 45px;
    cursor: pointer;
}
.icon:hover {
    transform: scale(1.3);
}
.bottom{
    position: absolute;
    display: flex; align-items: center; justify-content: right;
    bottom: 0;
    width: 100%;
    padding: 30px 30px;
    background-color: #EBE4FF;
}
.cancel {
    width: auto;
    border-radius: 5px;
    padding: 20px 35px;
    margin-right: 70px;
    font-size: 28px;
    background-color: #fff;
    color: #A182FF;
    cursor: pointer;
}
.cancel:hover {
    background-color: #dfdede;
}
.confirm{
    width: auto;
    border-radius: 5px;
    padding: 20px 35px;
    margin-right: 30px;
    font-size: 28px;
    background-color: #A182FF;
    color: #fff;
    cursor: pointer;
}
.confirm:hover {
    background-color: #6231F5;
}

/* add */
.el-form-item {
  margin: 50px 0 0 60px;
}

.el-radio {
  margin: 45px 80px;
  margin-bottom: 0;
}
/* 最后一个问题 */
.lastQues {
    margin: 50px 0 0 60px;
    font-size: 35px; /* 调整为你想要的大小 */
    font-weight: bold;
    color: #7D7878;
    cursor: pointer;
}
.lastOpt{
    margin-left: 60px;
}


:deep(.el-form-item__label) {
  font-size: 35px; /* 调整为你想要的大小 */
  font-weight: bold;
  color: #7D7878;
}

/* 如果你也想改变输入框内的文字大小 */
:deep(.el-radio__label) {
  color: #8755F2;
  font-size: 35px;font-weight: bold;
}
:deep(.el-radio__inner) {
  width: 20px; /* 调整单选按钮的宽度 */
  height: 20px; /* 调整单选按钮的高度 */
  border-color: #8755F2;font-weight: bold;
}

/* 改变选中时的颜色 */
/* 单选框 */
:deep(.el-radio__input.is-checked .el-radio__inner) {
  border-color: #6231F5;
  background: #6231F5;
}
/* 选项文字 */
:deep(.el-radio__input.is-checked+.el-radio__label) {
  color: #6231F5;
}

</style>