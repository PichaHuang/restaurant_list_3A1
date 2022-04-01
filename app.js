const express = require('express')
const app = express()

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
//const Restaurant = require('./models/restaurant')
// 載入 method-override
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')


require('./config/mongoose')







app.use(bodyParser.urlencoded({ extended: true }))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 將 request 導入路由器
app.use(routes)





app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})