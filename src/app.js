require("dotenv").config()
require('../db/dbconnection')
const cors = require('cors')
const usersRoutes = require('../routes/users.routes')
const productRoutes = require("../routes/product.routes")
const ordersRoutes = require("../routes/orders.routes")
const cartRoutes = require("../routes/cart.routes")
const express = require("express")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use('/users', usersRoutes)
app.use('/products', productRoutes)
app.use('/orders', ordersRoutes)
app.use('/cart', cartRoutes)

app.set('view engine', 'hbs')
app.get("*", (req,res)=>{
    res.render('error404', {pageTitle: "error page"})
})
module.exports = app
