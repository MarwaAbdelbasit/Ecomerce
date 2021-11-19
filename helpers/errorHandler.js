const errorHandler=(err,res)=>{
    res.status(500).send({
        status:'failed',
        message:err.message
    })
}
module.exports=errorHandler