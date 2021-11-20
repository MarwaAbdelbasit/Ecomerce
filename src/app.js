require("dotenv").config()
require('../db/dbconnection')
const cors = require('cors')
const usersRoutes = require('../routes/users.routes')
const productRoutes = require("../routes/product.routes")
const ordersRoutes = require("../routes/orders.routes")
const adminRoutes = require("../routes/admin.routes")
const express = require("express")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use('/users', usersRoutes)
app.use('/products', productRoutes)
app.use('/orders', ordersRoutes)
app.use('/admin', adminRoutes)

app.get("*", (req,res)=>{
    res.status(404).send({
        apiStatus:false,
        message:"api invalid link"
    })
})
module.exports = app
