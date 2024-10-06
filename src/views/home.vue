<template>
    <div class="home">
        <div class="content">
            <div class="leftIcon">
                
            </div>
            <div class="select">
                <div class="selectItem">
                    导入文件
                </div>
                <div class="selectItem">
                    开始点名
                </div>
                <div class="selectItem">
                    规则设置
                </div>
                <div class="selectItem">
                    查看排行
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
    background-color: #fff;
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
}
.selectItem:hover {
    background-color: #6231F5;
}
</style>