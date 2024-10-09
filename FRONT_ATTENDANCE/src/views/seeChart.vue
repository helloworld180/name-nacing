<template>
      <div class="container">
        <!-- 头部 -->
        <div class="header">
            <div>查看排行</div>
            <img src="../assets/image/close.png" alt="" class="icon" @click="close">
        </div>
        <div style="border: 1.5px solid #C8C1C1;"></div>
        
        <!-- 搜索框 -->
        <div class="search-bar">
          <input 
            v-model="searchInput" 
            type="text" 
            class="search-input" 
            placeholder="输入需要查询积分同学的学号" 
          />
          <button class="search-btn" @click="searchStudent">搜索</button>
        </div>
        
        <!-- 表格滚动容器 -->
         <div class="table-scroll-container">
            <!-- 排行榜 -->
            <table>
                <thead>
                    <tr>
                        <th>名次</th>
                        <th>学号</th>
                        <th>姓名</th>
                        <th>积分</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(student, index) in filteredStudents" :key="student.studentNumber">
                        <td v-if="student.id === 1"><span class="medal">🥇</span></td>
                        <td v-else-if="student.id === 2"><span class="medal">🥈</span></td>
                        <td v-else-if="student.id === 3"><span class="medal">🥉</span></td>
                        <td v-else class="center-align">{{ student.id }}</td>
                        <td>{{ student.studentNumber }}</td>
                        <td>{{ student.name }}</td>
                        <td>{{ student.points }}</td>
                    </tr>
                </tbody>
            </table>
            <!-- 分页 -->
            <div class="pagination">
                共{{ totalPages }}页，当前是第{{ currentPage }}页
                <button class="page-btn" @click="prevPage" :disabled="currentPage === 1">上一页</button>
                <button class="page-btn" @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
            </div>

        </div>

        

        <!-- 底部 -->
        <div class="bottom">
            <div style="display: flex;">
                <div class="confirm" @click="exportData">导出</div>
                <div class="cancel" @click="close">关闭</div>
            </div>
                
        </div>

      </div>
  </template>

<script setup>
    import { ref, computed, onMounted } from 'vue'
    import router from '@/router';
    import axios from '@/utils/axiosConfig';
    
    // 模拟学生数据
    // const students = ref([
    //     { id: 1, studentNumber: '102201403', name: '令狐冲冲冲', points: 100 },
    //     { id: 2, studentNumber: '102201338', name: '曾恬灵', points: 99 },
    //     { id: 3, studentNumber: '102201111', name: '张零', points: 95 },
    //     { id: 4, studentNumber: '102201112', name: '甜三', points: 90 },
    //     { id: 5, studentNumber: '102201113', name: '甜零', points: 89 },
    //     { id: 6, studentNumber: '102201113', name: '甜零', points: 89 },
    //     { id: 7, studentNumber: '102201113', name: '甜零', points: 89 },
    //     { id: 8, studentNumber: '102201113', name: '甜零', points: 89 },
        
    // ])
    const students = ref([])
    
    // 控制分页和搜索
    // ref是一个用于创建响应式数据的函数
    const searchInput = ref('')
    const currentPage = ref(1)
    const itemsPerPage = ref(6)
    const totalPages = ref(Math.ceil(students.value.length / itemsPerPage.value))
    // 翻页功能
    const nextPage = () => {
        if (currentPage.value < totalPages.value) {
        currentPage.value++
        }
    }
    const prevPage = () => {
        if (currentPage.value > 1) {
        currentPage.value--
        }
    }

    // 搜索功能
    const searchStudent = () => {
        currentPage.value = 1  // 搜索后返回到第一页
    }
    // 过滤搜索结果
    const filteredStudents = computed(() => {
        let filtered = students.value.filter(student =>
        student.studentNumber.includes(searchInput.value)
        )
        let start = (currentPage.value - 1) * itemsPerPage.value
        let end = start + itemsPerPage.value
        return filtered.slice(start, end)
    })
    
    // 获取排行数据的方法
    const fetchidData = async () => {
        try {
            const response = await axios.get('/students/id') // 假设这是获取排行数据的 API 路径
            students.value = response.data // 假设后端返回的数据格式可以直接赋值给 students
        } catch (error) {
            console.error('Failed to fetch id data:', error)
            // 处理错误情况，例如显示错误消息
        }
    }

    // 生命周期钩子，在组件挂载后立即获取数据
    onMounted(() => {
        fetchidData()
    })
    
    
    
    // 模拟导出功能，后端返回文件内容（Blob）
    const exportData = async () => {
        try {
            const response = await axios.get('/students/export-students', {
            responseType: 'blob', // 重要：设置响应类型为 blob
            });

            // 创建一个 URL 对象表示 Blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            
            // 创建一个临时的 a 标签并点击以下载
            const a = document.createElement('a');
            a.href = url;
            a.download = 'filename'; // 指定下载文件名，根据后端返回的文件名动态设置
            document.body.appendChild(a);
            a.click();
            
            // 清理和释放 URL 对象
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to export data:', error);
            // 处理错误情况，例如显示错误消息
        }
    };


    // 关闭功能
    function close() {
        router.push('/home')
    }
</script>
  
<style scoped>
    @import '../assets/css/seeChart.css'
</style>