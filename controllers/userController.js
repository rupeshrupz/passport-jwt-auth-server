let UserSchema = require("../Model/UserModel")
let { hashSync, compareSync } = require('bcrypt')
let jwt = require("jsonwebtoken")
exports.registerController = async(req,res)=>
{
    try {
        let {username, email, password} = req.body

        let data = await new UserSchema(
            {
           username,
           email,
           password:hashSync(password,10)
        // password
            }
        ).save()
        res.status(201).json({success:true, message:"sucessfully registered",data})
    } catch (error) {
        console.log(error)
    }
}


exports.loginController = async(req,res,next)=>
{
    
        UserSchema.findOne({username:req.body.username}).then((user)=>
        {
           try {
            if(!user)
            {
                // res.status(401).json({success:false, message:"user not found"})
                throw new Error("user not found")
            }
            if(!compareSync(req.body.password, user.password))
            {
                // res.status(401).json({success:false, message:"wrong password"})
                throw new Error("password not match")

            }

            const payload = {
                username: user.username,
                id:user._id,
                email:user.email
            }
            let token =  jwt.sign(payload, "skjdjskdsk",{expiresIn:"1d"})
          return res.status(201).json({success:true,message:"successfully logged in",token:"Bearer "+token})
           } catch (error) {
              return next(error)
           }
        })
        
}


exports.protectedPage1 = async(req,res)=>
{
    try {
      let token
        if(req.headers.authorization && req.headers.authorization.split(" ")[0]==="Bearer")
        {
            token = req.headers.authorization.split(" ")[1] 
        }
        let decoded = jwt.verify(token, "skjdjskdsk")

        req.user = await UserSchema.findById(decoded.id);
        res.status(201).json({success:true , message:"you are authorized", user:{id:req.user._id,username:req.user.username,email:req.user.email}})
    } catch (error) {
       console.log(error) 
    }
}

exports.logoutController = async(req,res)=>
{
    try {
    req.logout(function(err) {
        if (err) { throw err }
        res.status(201).json({success:true, message:"sucessfully logged out"})
      });
    
    } catch (error) {
        console.log(error)
    }
}