const jwt=require('jsonwebtoken')
const adminModel = require('../db/models/admin.model');
const errorHandler = require('../helpers/errorHandler');
const auth=async(req,res,next) => {
    try{
        const token = req.body.token || req.query.token || req.header('Admin');
        if(!token) throw new Error("Access Denied")
        const decodedToken=jwt.verify(token,process.env.ADMIN_TOKEN)
        const admin=await adminModel.findOne({_id:decodedToken._id,'tokens.token':token})
        if(!admin) throw new Error("Access Denied")
        req.admin=admin;
        req.token=token;
        next()    
    }
    catch(err){
        errorHandler(err,res)
    }
}
module.exports=auth
