let {Schema, model} = require('mongoose')

let UserSchema = new Schema({
    username :{
        type : String
    },
    email :{
        type:String
    },
    password:{
        type:String
    }
},
{timestamps: true})

module.exports = model('user',UserSchema)
