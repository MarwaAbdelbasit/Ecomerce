const mongoose=require('mongoose');
const dbName=process.env.DBNAME
const dbUrl=process.env.DBURL
mongoose.connect(`${dbUrl}${dbName}`,{})