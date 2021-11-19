const errorHandler=(err,res)=>{
    if (err.code ===11000) err.message='Email registerd before'
    res.status(500).send({
        status:'failed',
        message:err.message
    })
}
module.exports=errorHandler