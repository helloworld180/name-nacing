const express = require('express')
const history = require('connect-history-api-fallback')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()
const port = 9528
 
// 解决刷新时页面404的问题
app.use(history())


// 配置静态资源
app.use(express.static(__dirname + '/public'))

app.use(
    // '/api',
    createProxyMiddleware({
        target: 'http://10.133.31.123:8080'
    })
)

// 解决刷新时页面404的问题
// app.get('*',(req,res)=>{
//     res.sendFile(__dirname + '/public/index.html')
// })
 
app.listen(port, () => {
  console.log(`本地服务器启动http://localhost:${port}`)
})