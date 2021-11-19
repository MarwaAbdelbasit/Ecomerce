const adminModel=require('../db/models/admin.model')
const errorHandler = require('../helpers/errorHandler')
const successHandler = require('../helpers/successHandler')
class Admin{
    static register=async(req,res)=>{
        try{
            const admin=await new adminModel(req.body)
            await admin.generateToken()
            await admin.save()
            successHandler(admin,res,'Admin registered successfully')
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
            const admin=await adminModel.loginAdmin(req.body.email,req.body.password)
            await admin.generateToken()
            await admin.save()
            successHandler(admin,res,'admin logged in successfully')
        }
        catch(err){
            errorHandler(err,res)
        }
    }
    static editAdmin = async (req, res) => {
        try{
            let admin = await adminModel.findByIdAndUpdate(req.params.id,{$set:req.body})
            if(!admin) throw new Error("admin not found")
            await admin.save()
            successHandler(admin,res,' admin is edited successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }

    static delAdmin = async (req, res) => {
        try{
            let admin = await adminModel.findByIdAndDelete(req.params.id)
            if(!admin) throw new Error("admin not found")
            successHandler(null,res,' admin is deleted successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }
}
module.exports=Admin