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
    static logout=async(req,res)=>{
        try{
            req.user.tokens=req.user.tokens.filter(t=>t.token!=req.token)
            await req.user.save()
            successHandler(null,res,'User logged out successfully')
        }
        catch(err){
            errorHandler(err,res)
        }
    }
    static logoutAll=async(req,res)=>{
        try{
            req.user.tokens=[]
            await req.user.save()
            successHandler(null,res,'User logged out from all devices successfully')
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
    
}
module.exports=User