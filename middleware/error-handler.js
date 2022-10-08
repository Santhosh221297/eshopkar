const { StatusCodes } = require('http-sttus-codes')

const errHandlerMiddleware = (err, req, res, next) => {
    let customErr = {
        //default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong.. 500 Error, Try again later.."
    }

const CustomApiErr = require('./custom-err')
    if(err.name === "ValidationError") { 
        customErr.msg = Object.values(err.errors).map(item => item.message).join(',');
        customErr.StatusCode = 400;
    }

    if(err.name === "CastError") {
        customErr.msg = `No item found with id : ${err.value}`;
        customErr.statusCode = 404;
     }

    if(err.code && err.code === 1000) { 
        customErr.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field.. Value Already exists`;
        customErr.StatusCode = 400;
    }

    return res.status(customErr.statusCode).json({msg: customErr.msg})
}

module.exports = errHandlerMiddleware