const express = require("express")
let { PORT , MONGODB_CLOUD} = require("./config/index");
let userRoutes = require("./routes/userRoutes")
let connectDBOAuth = require('./config/dbOauth')
const session = require("express-session")
const MongoStore = require("connect-mongo")
let passport = require('passport')
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,PUT,POST,DELETE",
    credentials: true
}))

app.use(session({
    secret:"rupeshrupz",
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({mongoUrl:MONGODB_CLOUD,collectionName:"sessions"}),
    cookie:{
        maxAge:1000 * 60 * 60 * 24
    }
}))

require('./middlewares/passport-jwt')
require('./middlewares/passport-oauth')


app.use(passport.initialize())
app.use(passport.session())


app.get("/", (req,res)=>
{
    res.send("helloo")
})


connectDBOAuth()

app.use('/auth', userRoutes)
app.use(errorHandler)


app.listen(PORT, (err)=>
{
    if (err) throw err
    console.log("app running on 5000")
})

