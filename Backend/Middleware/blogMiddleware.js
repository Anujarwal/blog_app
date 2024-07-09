const { stack } = require("../Routes/blogRoutes");


const blogErrorHandler = (err , req , res , next) => {
    const statusCode = res.statusCode < 400 ? 500 : res.statusCode

    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack || err.stack    
    })
}

module.exports = {blogErrorHandler};
