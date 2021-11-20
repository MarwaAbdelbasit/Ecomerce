require("dotenv").config()
require('../db/dbconnection')
const cors = require('cors')
const path=require('path')
const hbs=require('hbs')
const usersRoutes = require('../routes/users.routes')
const productRoutes = require("../routes/product.routes")
const ordersRoutes = require("../routes/orders.routes")
const wishListRoutes = require("../routes/wishList.routes")
=======
const adminRoutes = require("../routes/admin.routes")
const express = require("express")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use('/users', usersRoutes)
app.use('/products', productRoutes)
app.use('/orders', ordersRoutes)
app.use('/wishList', wishListRoutes)
=======
app.use('/admin', adminRoutes)

const staticDir=path.join(__dirname, '../public')
const viewsDir=path.join(__dirname, '../frontend/views')
const layoutDir=path.join(__dirname, '../frontend/layout')
app.set('view engine', 'hbs')
app.use(express.static(staticDir))
app.set('views',viewsDir)
hbs.registerPartials(layoutDir)
app.get('/',(req,res)=>{
    res.render('login', {pageTitle: "login page"})
})
app.get("*", (req,res)=>{
    res.render('error404', {pageTitle: "error page"})
})
module.exports = app
