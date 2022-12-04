

const errorHandler = (error,req,res,next)=>
{
   return res.status(401).send(error.message)
}

module.exports = errorHandler