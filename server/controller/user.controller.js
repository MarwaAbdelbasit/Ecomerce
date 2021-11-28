const userModel=require('../db/models/user.model')
const errorHandler = require('../helpers/errorHandler')
const errorAuthHandler = require('../helpers/errorAuthHandler')
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
            errorAuthHandler(err,res)
        }
    }
    static registerAdmin = async(req, res) =>{
        try{
            if(req.body.role =="User") throw new Error("Please choose an admin type")
            const admin =await new userModel(req.body)
            await admin.generateToken()
            await admin.save()
            successHandler(admin,res,'Admin registered successfully')
        }
        catch(err){
            errorAuthHandler(err,res)
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
            errorAuthHandler(err,res)
        }
    }
    static profileShow =async(req,res)=>{
        res.send(req.user)
    }
    static changeImage=async(req,res)=>{
        try{
            let user = await userModel.findByIdAndUpdate(req.user._id, {
                $set:{profilePic: "uploads/" + req.user._id + "/" + req.file.filename}
            })
            if(!user) throw new Error("upload failed")
            successHandler(user,res,'image uploaded successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }
    static profileEdit =async(req,res)=>{
        try{
            let user = await userModel.findByIdAndUpdate(req.user._id,{$set:req.body})
            if(!user) throw new Error("user not found")
            successHandler(user,res,' profile is edited successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }
    static profileDelete =async(req,res)=>{
        try{
            let user = await userModel.findByIdAndDelete(req.user._id)
            if(!user) throw new Error("user not found")
            successHandler(null,res,' profile is deleted successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }
    static editUser = async (req, res) => {
        try{
            let user = await userModel.updateOne({_id:req.params.id,role:"User"},{$set:req.body})
            if(!user) throw new Error("user not found")
            successHandler(user,res,' User is edited successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }
    static delUser = async (req, res) => {
        try{
            let user = await userModel.deleteOne({_id:req.params.id,role:"User"})
            if(!user) throw new Error("user not found")
            successHandler(null,res,' User is deleted successfully')
        }
        catch(err) {
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
    // --------------user control for his wishlist--------------------
    static toggleWishList= async (req, res) => {
        try {
            if(!req.user.wishList.includes(req.params.productId)){
                await req.user.updateOne({
                    $push: {
                        wishList:req.params.productId
                    }
                })
                successHandler(req.user,res,'product added to wishlist successfully')
            }else{
                await req.user.updateOne({
                    $pull: {
                        wishList: req.params.productId
                    }
                })
                successHandler(req.user,res,'product removed from wishlist successfully')
            }
        }
        catch(e) {
            errorHandler(e,res)
        }
    }
    static getAllWishList= async (req, res) => {
        try{
            let allWishList=req.user.wishList
            successHandler(allWishList,res,'data fetched successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }
    static deleteAllWishList= async (req, res)=>{
        try{
            let allWishList = req.user.wishList
            if(allWishList.length==0) throw new Error("no wish list to delete")
            req.user.wishList = []
            await req.user.save()
            successHandler(allWishList,res,'wishList deleted successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }
    //---------------- admin control for users-------------
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
            const allUsers = await userModel.find({role:"User"})
            successHandler(allUsers,res,'all Users shown successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }
    static showAllAdmins = async (req, res) => {
        try{
            const allAdmins = await userModel.find({role:"Admin"})
            successHandler(allAdmins,res,'all Admins shown successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }
    static delAll = async (req, res) => {
        try{
            await userModel.deleteMany({role:"User"})
            successHandler(null,res,'all Users are deleted successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }
    static delUser = async (req, res) => {
        try{
            await userModel.findByIdAndDelete(req.params.id)
            successHandler(null,res,'all Users are deleted successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }
    static editAdmin = async (req, res) => {
        try{
            let admin = await userModel.updateOne({_id:req.user._id},{
                $set:req.body
            })
            if(!admin) throw new Error("Failed to edit admin")
            successHandler(admin,res,' admin is edited successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }
    static delAdmin = async (req, res) => {
        try{
            let admin = await userModel.deleteOne({_id:req.user._id})
            if(!admin) throw new Error("Failed to delete admin")
            successHandler(null,res,' admin is deleted successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }
}
module.exports=User