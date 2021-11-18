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
                status:'error',
                data:null,
                message:err.message
            })
        }
    }
}
module.exports=User