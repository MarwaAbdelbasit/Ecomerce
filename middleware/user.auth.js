const jwt=require('jsonwebtoken')
const userModel = require('../db/models/user.model');
const adminModel = require('../db/models/admin.model');
const errorHandler = require('../helpers/errorHandler');
const auth=async(req,res,next) => {
    try{
        const userToken = req.body.token || req.query.token || req.header('Authorization');
        const adminToken=req.body.isAdmin || req.query.isAdmin || req.header('Admin')
        if(!adminToken){
            if(!userToken) throw new Error("not authorized")
            const decodedToken=jwt.verify(userToken,process.env.TOKEN)
            const user=await userModel.findOne({_id:decodedToken._id,'tokens.token':token})
            if(!user) throw new Error("not authorized")
            req.user=user;
            req.token=token;
        }else{
            const decodedToken=jwt.verify(adminToken,process.env.ADMIN_TOKEN)
            const admin=await adminModel.findOne({_id:decodedToken._id,'tokens.token':adminToken})
            if(!admin) throw new Error("not authorized")
        }
        next()    
    }
    catch(err){
        errorHandler(err,res)
    }
}
module.exports=auth