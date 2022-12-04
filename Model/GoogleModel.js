let {Schema, model} = require('mongoose')

let GoogleSchema = new Schema({
    username :{
        type : String
    },
    googleId :{
        type:String
    },
    picture:{
        type:String
    }
},
{timestamps: true})

module.exports = model('oauth-user',GoogleSchema)