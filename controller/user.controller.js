const userModel=require('../db/models/user.model')
class User{
    static register=async(req,res)=>{
        try{
            const user=await new userModel(req.body)
            await user.save()
            res.status(200).send({
                status:'success',
                data:user,
                message: 'User registered successfully'
            })
        }
        catch(err){
            res.status(500).send({
                status:'error registering user',
                data:null,
                message:err.message
            })
        }
    }
    static showUser = async (req, res) => {
        try{
            const user = await userModel.findOne({_id:req.params.id})
            res.status(200).send({
                apiStatus:true,
                data:user,
                message:"user shown successfully"
            })
        }
        catch(e) {
            res.status(500).send({
                apiStatus:false,
                message:e.message
            })
        }
    }
    static showAllUsers = async (req, res) => {
        try{
            const allUsers = await userModel.find()
            res.status(200).send({
                apiStatus:true,
                data:allUsers,
                message:"data fetched successfully"
            })
        }
        catch(e) {
            res.status(500).send({
                apiStatus:false,
                message:e.message
            })
        }
    }
    static editUser = async (req, res) => {
        try{
            let user = await userModel.findByIdAndUpdate(req.params.id,{$set:req.body})
            if(!user) throw new Error("user not found")
            await user.save()
            res.status(200).send({
                apiStatus:true,
                data:user,
                message:"data edited successfully"
            })
        }
        catch(e) {
            res.status(500).send({
                apiStatus:false,
                message:e.message
            })
        }
    }

    static delUser = async (req, res) => {
        try{
            let user = await userModel.findByIdAndDelete(req.params.id)
            if(!user) throw new Error("user not found")
            res.status(200).send({
                apiStatus:true,
                message:"data deleted successfully"
            })
        }
        catch(e) {
            res.status(500).send({
                apiStatus:false,
                message:e.message
            })
        }
    }

    static delAll = async (req, res) => {
        try{
            await userModel.deleteMany()
            res.status(200).send({
                apiStatus:true,
                message:"all data deleted successfully"
            })
        }
        catch(e) {
            res.status(500).send({
                apiStatus:false,
                message:e.message
            })
        }
    }


}
module.exports=User