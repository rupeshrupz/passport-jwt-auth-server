require('dotenv').config()
module.exports={
    PORT:process.env.PORT,
    MONGODB_LOCAL_GOOGLE:process.env.MONGODB_LOCAL_GOOGLE,
    MONGODB_CLOUD:process.env.MONGODB_CLOUD,
    NODE_ENV:process.env.NODE_ENV,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET
}