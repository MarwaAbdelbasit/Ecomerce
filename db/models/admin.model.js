const {model,Schema}=require('mongoose')
const {isEmail,isStrongPassword} =require('validator')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const adminSchema=new Schema({
    adminName:{
        type:String,
        required:[true,'adminName is required'],
         
    },
    email:{
        type:String,
        required:[true,'email is required'],
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!isEmail(value)) throw new Error('this email is used before')
        }
    },
    password:{
        type:String,
        required:[true,'password is required'],
        validate(value){
            if(!isStrongPassword(value)) throw new Error(
                'for security reasons you should use a strong password > 8 characters, at least 1 Lowercase,1 Uppercase,1 Number,1 Symbol'
                )
        }
    },
    orders:{
        type:Array
    },
    tokens:[
        {
            token:{
                type:String
            },
        }
    ],
    isAdmin:{
        type:Boolean,
        default:true
    }
},{timestamps:true})
adminSchema.pre('save',async function(){
    if(this.isModified('password')) this.password=await bcrypt.hash(this.password,10)
})
adminSchema.methods.toJSON=function(){
    const admin=this.toObject()
    const {password,__v,...others}=admin
    return others
}
adminSchema.statics.loginAdmin=async function(email,password){
    let admin = await this.findOne({ email }) 
    if (admin) {
        const validPassword = await bcrypt.compare(password, admin.password);
        if (validPassword) {  
            return admin
        }
        throw Error('Incorrect Password')
    }
    throw Error('Incorrect E-mail')
}
adminSchema.methods.generateToken=function(){
    let token=jwt.sign({_id:this._id},process.env.ADMIN_TOKEN)
    this.tokens=this.tokens.concat({token})
}
const Admin=model('Admin',adminSchema)
module.exports=Admin
