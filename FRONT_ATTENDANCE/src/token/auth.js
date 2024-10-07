// 存储、获取、删除token的文件
// 定义 setToken 函数，用于将 token 存储到 localStorage
export function setToken(token) {
    localStorage.setItem('authToken', token);
  }
  
  // 定义 getToken 函数，用于从 localStorage 获取 token
export  function getToken() {
    return localStorage.getItem('authToken');
  }
  
  // 定义 removeToken 函数，用于从 localStorage 删除 token
export  function removeToken() {
    localStorage.removeItem('authToken');
  }
  

  