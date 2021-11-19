const jwt = require("jsonwebtoken")
const userModel = require("../db/models/user.model")
const errorHandler = require("../helpers/errorHandler")

const auth = async (req, res, next) => {
    try {
        //take token from header
        const token = req.header("Authentication").replace("Bearer ", "")
        //decode token
        const decodedToken = jwt.verify(token, process.env.TOKEN)
        //find user
        const user = await userModel.findOne({_id:decodedToken._id, 'tokens.token':token})
        if(!user) throw new Error("user not found")
        req.user=user
        req.token=token
        next()
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = auth