const {connect} = require('mongoose')
const {MONGODB_LOCAL_GOOGLE,NODE_ENV,MONGODB_CLOUD} = require("./index")
let connectDBOAuth = async () =>
{
   try {
    if(NODE_ENV === "development")
    {
        await connect(MONGODB_CLOUD)
        console.log("local database connected")
    }
    
   } catch (err) {
    console.log(err)
   }
}

module.exports = connectDBOAuth