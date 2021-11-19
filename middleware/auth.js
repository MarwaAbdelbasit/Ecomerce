const jwt=require('jsonwebtoken')
const userModel = require('../db/models/user.model');
const adminModel = require('../db/models/admin.model');
const errorHandler = require('../helpers/errorHandler');
const auth=async(req,res,next) => {
    try{
        const userToken = req.body.token || req.query.token || req.header('Authorization');
        const adminToken=req.body.isAdmin || req.query.isAdmin || req.header('Admin')
        if(!adminToken){
            if(!userToken) throw new Error("Access Denied");
            const decodedToken=jwt.verify(userToken,process.env.USER_TOKEN)
            const user=await userModel.findOne({_id:decodedToken._id,'tokens.token':userToken})
            if(!user) throw new Error("Access Denied")
            req.user=user;
            req.token=userToken;
        }else{
            const decodedToken=jwt.verify(adminToken,process.env.ADMIN_TOKEN)
            const admin=await adminModel.findOne({_id:decodedToken._id,'tokens.token':adminToken})
            if(!admin) throw new Error("Access Denied")
        }
        next()    
    }
    catch(err){
        console.log(err)
        errorHandler(err,res)
    }
}
module.exports=auth
