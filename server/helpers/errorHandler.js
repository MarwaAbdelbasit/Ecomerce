const errorHandler=(err,res)=>{
    res.status(500).send({
        status:'failed',
        data:"Access Denied",
        message:err.message
    })
}
module.exports=errorHandler