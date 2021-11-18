const {model,Schema}=require('mongoose')
const {isEmail,isStrongPassword} =require('validator')
const userSchema=new Schema({
    userName:{
        type:String,
        required:[true,'userName is required'],
        
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
    }
},{timestamps:true})
userSchema.pre('save',async function(){
    if(this.isModified('password')) this.password=await bcrypt.hash(this.password,10)
})
userSchema.methods.toJson=function(){
    const user=this.toObject()
    const {password,__v,...others}=user
    return others
}
const User=model('User',userSchema)
module.exports=User