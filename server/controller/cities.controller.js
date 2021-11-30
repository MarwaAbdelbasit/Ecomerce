const errorHandler = require('../helpers/errorHandler')
const successHandler = require('../helpers/successHandler')
const cities= require('../db/cities')
class Cities{
    // --------------user control for his cart--------------------
    static getCities = async (req, res)=>{
        try{
            successHandler(cities,res,'cities shown successfully')
        }
        catch(e){
            errorHandler(e,res)
        }
    }
}
module.exports=Cities