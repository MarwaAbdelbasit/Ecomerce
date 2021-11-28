const errorAuthHandler=(err,res)=>{
        let error = { email: '', password: '',name:'' }
        //login 
        //incorrect email
    
            if (err.message === 'Incorrect E-mail') {
            error.email = "You Have To Register First"
            }
        //incorrect password
        else if (err.message === 'Incorrect Password') {
            error.password = err.message;
        }
    
        //sign up
        //dupilcate user
        if (err.code===11000) {
            error.email = 'Sorry that email already registered';
        }
    
        //validation errors
        else if (err.message.includes('User validation failed')) {//when err occured this message appears
            Object.values(err.errors).forEach(({properties}) => {//for every proerty of the errors(email,password){path=(email,password)>>(message)to show}
                error[properties.path]=properties.message
            })
        }    
    res.status(500).send({
        status:'failed',
        data:"Access Denied",
        message:error
    })
}
module.exports=errorAuthHandler