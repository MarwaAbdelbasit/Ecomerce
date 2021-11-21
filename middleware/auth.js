const jwt=require('jsonwebtoken')
const userModel = require('../db/models/user.model');
const errorHandler = require('../helpers/errorHandler');
const auth=(type)=>async(req,res,next) => {
    try{
        const token = req.body.token || req.query.token || req.header('Authorization').replace("Bearer ", "");
            if(!token) throw new Error("Access Denied");
            const decodedToken=jwt.verify(token,process.env.TOKEN)
            const user=await userModel.findOne({_id:decodedToken._id,'tokens.token':token})
            if(!user) throw new Error("Access Denied")
            if(user.role!=type && type!='') throw new Error(`you are not ${type}`)
            req.user=user;
            req.token=token;
        next()    
    }
    catch(err){
        errorHandler(err,res)
    }
}
module.exports=auth
