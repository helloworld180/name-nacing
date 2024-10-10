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
            <tr v-for="(student, index) in paginatedStudents" :key="student.studentNumber">
              <td v-if="currentPage === 1 && index === 0"><span class="medal">🥇</span></td>
              <td v-else-if="currentPage === 1 && index === 1"><span class="medal">🥈</span></td>
              <td v-else-if="currentPage === 1 && index === 2"><span class="medal">🥉</span></td>
              <td v-else class="center-align">{{ (currentPage - 1) * pageSize + (index + 1) }}</td>
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
  import { ref, computed, onMounted } from 'vue';
  import router from '@/router';
  import axios from '@/utils/axiosConfig';
  
  const allStudents = ref([]);
  const currentPage = ref(1);
  const pageSize = 6;
  const searchInput = ref('');
  
  const fetchStudents = async () => {
    try {
      const response = await axios.get('/students/ranking');
      allStudents.value = response;
    } catch (error) {
      console.error('获取学生数据失败:', error);
    }
  };
  
  const filteredStudents = computed(() => {
    if (!searchInput.value) return allStudents.value;
    return allStudents.value.filter(student => 
      student.studentNumber.includes(searchInput.value)
    );
  });
  
  const totalPages = computed(() => {
    return Math.ceil(filteredStudents.value.length / pageSize);
  });
  
  const paginatedStudents = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return filteredStudents.value.slice(start, end);
  });
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  
  const searchStudent = () => {
    currentPage.value = 1;
  };
  

//   导出文件
  const exportData = async () => {
    try {
      const response = await axios.get('/students/export-students', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response]));
      const a = document.createElement('a');
    //   a.style.display = 'none';
      a.href = url;
      a.download = 'students.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('导出数据失败:', error);
    }
  };

  function close() {
    router.push('/home');
  }
  
  onMounted(() => {
    fetchStudents();
  });
  </script>
  
  <style scoped>
  @import '../assets/css/seeChart.css';
  </style>