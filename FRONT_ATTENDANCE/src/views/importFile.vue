<template>
    <div class="imptFile">
        <!-- 头部 -->
        <div class="header">
            <div>导入学生名单</div>
            <img src="../assets/image/close.png" alt="" class="icon" @click="close">
        </div>
        <div style="border: 1.5px solid #C8C1C1;"></div>

        <!-- 上传文件 -->
        <el-upload
            ref="uploadRef"
            class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :auto-upload="false"
            :limit="1"
            accept=".xlsx, .xls"
            :on-exceed="handleExceed"
        >
            <div style="font-size: 30px; color: #7D7878;">选择文件</div>
            <input placeholder="请选择上传的文件" class="inputFile" />
            <!-- <template #trigger> -->
                <el-button type="primary" color="#A182FF" class="btn">选取文件</el-button>
            <!-- </template> -->

            <!-- 按钮下面放置文件区 -->
            <!-- <el-button class="ml-3" type="success" @click="submitUpload">
                upload to server
            </el-button> -->

            <template #tip>
                <div class="el-upload__tip">
                    请上传Excel文件，文件大小不超过500KB。
                </div>
            </template>
        </el-upload>

        <!-- 下载模板 -->
         <a
            class="download"
            href="后端提供的下载URL"
            download="student-template.xlsx"
            @click="onDownload"
        >
            模板下载
        </a>

        <!-- 模板示例 -->
         <div>
            <div style="color: #8755F2; font-size: 28px; margin: 30px 0 0 40px;">模板示例：</div>
            <div style="display: flex; justify-content: center; margin-top:10px;">
                <img src="../assets/image/muban.png" alt="" style="height: 250px;">
            </div>
        </div>

        <!-- 底部 -->
        <div class="bottom">
            <div style="display: flex;">
                <div class="confirm" @click="submitUpload">导入</div>
                <div class="cancel" @click="close">取消</div>
            </div>
                
        </div>
    </div>
    
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import router from '@/router';

const uploadRef = ref<UploadInstance>()
// 自动替换上一个文件
const handleExceed: UploadProps['onExceed'] = (files) => {
    uploadRef.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    uploadRef.value!.handleStart(file)
}
// 提交文件
const submitUpload = () => {
  uploadRef.value!.submit()
}

// 模板下载
const onDownload = (event: MouseEvent) => {
    // 如果需要，你可以在这里执行一些额外的逻辑，比如发送一个请求到后端
    // 来检查用户是否有权限下载文件等。

    // 阻止<a>标签默认的点击事件，因为我们已经通过href处理了下载
    event.preventDefault();
    // 可以在这里使用fetch等方式处理下载，或者直接通过href属性
    window.open("后端提供的下载URL", '_blank');
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
.upload-demo {
    margin-top: 35px;
    padding: 0 20px;
}
.inputFile {
    height: 60px;
    width: 300px;
    font-size: 23px;
    margin-left: 20px;
    border-radius: 10px;
    border: 1.5px solid #272636;
    padding-left: 20px; 
}
.inputFile::placeholder {
    padding-left: 0; 
}
.btn {
    height: 70px;
    border-radius: 10px;
    padding: 10px;
    font-size: 30px;
    margin-left: 30px;
    color: #fff;
}
.btn:hover {
    color: #fff;
    transform: scale(1.1);
}
.el-upload__tip {
    font-size: 23px;
    margin: 25px 0 25px 70px;
}
.download{
    color: #8755F2;
    font-size: 28px;
    margin: 20px 0 0 40px;
    cursor: pointer;
    text-decoration: none;
}
.download:hover {
    color: #6231F5;
    text-decoration: underline;
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
</style>