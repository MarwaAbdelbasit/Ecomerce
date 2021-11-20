const ordersModel = require("../db/models/orders.model")
const successHandler = require("../helpers/successHandler")
const errorHandler = require("../helpers/errorHandler")

class Order {
    static placeOrder = async (req, res) => {
        try {
            const order = await new ordersModel(req.body)
            order.userId = req.user._id
            order.save()
            req.user.orders.push(order._id)
            await req.user.save()
            successHandler(req.user,res,'order placed successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static editOrder = async (req, res) => {
        try{
            let allOrders = await ordersModel.find()
            let orderIndex = allOrders.findIndex(o=>o._id==req.params.orderId)
            if(orderIndex==-1) throw new Error("order not found")
            allOrders[orderIndex]={
                userId: req.user._id,
                _id:req.params.orderId,
                orderName:req.body.orderName,
                amount:req.body.amount,
                paid:req.body.paid,
                delivered:req.body.delivered,
            }
            await allOrders.save()
            successHandler(allOrders,res,'order edited successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static allOrders = async (req, res) => {
        try{
            let allOrders = await ordersModel.find({userId:req.user._id})
            if(allOrders.length==0) throw new Error("user have no orders")
            successHandler(allOrders,res,'orders fetched successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static allOrdersAdmin = async (req, res) => {
        try{
            let allOrders = await ordersModel.find()
            if(allOrders.length==0) throw new Error("user have no orders")
            successHandler(allOrders,res,'orders fetched successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static singleOrder = async (req, res) => {
        try{
            let order = await ordersModel.findById(req.params.orderId)
            if(!order) throw new Error("order not found")
            successHandler(order,res,'order fetched successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static delOrders = async (req, res) => {
        try{
            let ordersIds = req.user.orders
            // let allOrders = await ordersModel.find({userId:req.user._id})
            // if(allOrders.length==0) throw new Error("user have no orders")
            // allOrders = []
            // await allOrders.save()
            successHandler(ordersIds,res,'orders deleted successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static delOrder = async (req, res) => {
        try{
            let order = await ordersModel.findByIdAndDelete(req.params.orderId)
            req.user.orders = req.user.orders.filter(o=>o._id!=req.params.orderId)
            await req.user.save()
            if(!order) throw new Error("no order to delete")
            successHandler(order,res,'order deleted successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }
}

module.exports = Order
