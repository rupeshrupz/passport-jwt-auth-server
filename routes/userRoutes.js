let express = require('express')
let passport = require('passport')
let {registerController,loginController,protectedPage1,logoutController} = require('../controllers/userController')
require('../middlewares/passport-jwt')
require('../middlewares/passport-oauth')


let router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/protectedAuth', passport.authenticate('jwt',{session:true}),protectedPage1)
router.get('/logoutAuth',logoutController)

router.get('/login/success',(req,res)=>
{
    if(req.user)
    {
        res.status(201).json({success:true, message:"user authorized", user: req.user})
    }else
    {
        res.status(401).json({error:true, message:"not authorized"})
    }
})

router.get('/google',passport.authenticate('google', { scope: ['profile'] }));

router.get('/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login', successRedirect:"http://localhost:3000"}));

router.get('/login/failed',(req,res)=>
{
  res.status(401).json({error:true, message:"login failure"})
    
})

router.get('/logout',(req,res)=>
{
    req.logout(function(err) {
        if (err) { throw err }
        res.redirect('http://localhost:3000/login')
      });

})

module.exports = router