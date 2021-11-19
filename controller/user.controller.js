const userModel=require('../db/models/user.model')
const errorHandler = require('../helpers/errorHandler')
const successHandler = require('../helpers/successHandler')
class User{
    static register=async(req,res)=>{
        try{
            const user=await new userModel(req.body)
            await user.generateToken()
            await user.save()
            successHandler(user,res,'User registered successfully')
        }
        catch(err){
            if(err.code===11000) {
                err.message='Email is already registered'
            }
            errorHandler(err,res)
        }
    }
    static login=async(req,res)=>{
        try{
            const user=await userModel.loginUser(req.body.email,req.body.password)
            await user.generateToken()
            await user.save()
            successHandler(user,res,'User logged in successfully')
        }
        catch(err){
            errorHandler(err,res)
        }
    }
    static showUser = async (req, res) => {
        try{
            const user = await userModel.findOne({_id:req.params.id})
            successHandler(user,res,'User shown successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }
    static showAllUsers = async (req, res) => {
        try{
            const allUsers = await userModel.find()
            successHandler(allUsers,res,'all Users shown successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }
    static editUser = async (req, res) => {
        try{
            let user = await userModel.findByIdAndUpdate(req.params.id,{$set:req.body})
            if(!user) throw new Error("user not found")
            await user.save()
            successHandler(user,res,' User is edited successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }

    static delUser = async (req, res) => {
        try{
            let user = await userModel.findByIdAndDelete(req.params.id)
            if(!user) throw new Error("user not found")
            successHandler(null,res,' User is deleted successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }

    static delAll = async (req, res) => {
        try{
            await userModel.deleteMany()
            successHandler(null,res,'all Users are deleted successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }

    static profile =async(req,res)=>{
        res.send(req.user)
    }

    static placeOrder = async (req, res) => {
        try {
            req.user.orders.push({
                userID: req.user._id,
                productName: req.body.productName,
                amount: req.body.amount,
                paid: req.body.paid,
                delieverd: req.body.delieverd
            })
            // user.oreders.push({...req.body})
            await req.user.save()
            successHandler(req.user,res,'order placed successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static allOrders = async (req, res) => {
        try{
            let allOrders = req.user.orders
            if(allOrders.length==0) throw new Error("user have no orders")
            successHandler(allOrders,res,'orders fetched successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static singleOrder = async (req, res) => {
        try{
            let allOrders = req.user.orders
            let order = allOrders.find(o=>o._id==req.params.orderId)
            if(!order) throw new Error("order not found")
            successHandler(order,res,'order fetched successfully')
            
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static delOrders = async (req, res) => {
        try{
            let allOrders = req.user.orders
            if(allOrders.length==0) throw new Error("no orders to delete")
            req.user.orders = []
            await req.user.save()
            successHandler(allOrders,res,'orders deleted successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static delOrder = async (req, res) => {
        try{
            let allOrders = req.user.orders
            if(allOrders.length==0) throw new Error("no orders to delete")
            allOrders = allOrders.filter(o=>o._id!=req.params.orderId)
            req.user.orders = allOrders
            await req.user.save()
            successHandler(allOrders,res,'order deleted successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }
    static editOrder = async (req, res) => {
        try{
            let orderIndex = req.user.orders.findIndex(o=>o._id==req.params.orderId)
            if(orderIndex==-1) throw new Error("order not found")
            req.user.orders[orderIndex]={
                userID: req.user._id,
                _id:req.user.orders[orderIndex]._id,
                ...req.body
            }
            await req.user.save()
            successHandler(req.user.orders[orderIndex],res,'order deleted successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }
}
module.exports=User