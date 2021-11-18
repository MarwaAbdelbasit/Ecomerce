const {model,Schema}=require('mongoose')
const {isEmail,isStrongPassword,isCreditCard} =require('validator')
const {hash}=require('bcryptjs')
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
    },
    profilePic:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png"
    },
    adress:{
        country:{
            type:String,
        },
        city:{
            type:String,
        },
        buildingNo:{
            type:String
        }
    },
    paymentDetails:{
        balance:{
            type:Number,
        },creditCard:{
            type:String,
            validte(value){
                if(!isCreditCard(value)) throw new Error('invalid credit card')
            }
        }
    },
    orders:{
        type:Array
    },
    wishList:{
        type:Array
    }
},{timestamps:true})
userSchema.pre('save',async function(){
    if(this.isModified('password')) this.password=await hash(this.password,10)
})
userSchema.methods.toJSON=function(){
    const user=this.toObject()
    const {password,__v,...others}=user
    return others
}
const User=model('User',userSchema)
module.exports=User