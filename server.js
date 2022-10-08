require('dotenv').config() //env
require('express-async-errors')

//packages
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-Limit');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const {StatusCodes} = require('http-status-codes')

//routes
const authRoute = require('./route/authRoute')
const userRoute = require('./route/userRoute')
const categoryRout = require('./route//categoryRoute')
const productRoute = require('./route/productRoute')




const PORT = process.env.PORT;

//middlewares
const notFoundMiddleware = require('./middleware/not-found')
const errHandlerMiddleware = require('./middleware/error-handler')

const connectDB = require('./db/connect')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use(cors())// to avoid creoss origin resources sharing
//security process
app.use(helmet())
app.use(xss())
app.use(rateLimiter({ windowMs: 60 * 1000, max: 150 }))

app.use(cookieParser(process.env.COOKIE_SECRET))// signed cookies
app.use(morgan('tiny'))
app.use(fileUpload())

app.use(errHandlerMiddleware)

app.use(connectDB)





//default routes
app.use(`/api/v1/auth`, authRoute)
app.use(`/api/v1/users`, userRoute)
app.use(`/api/v1/users`, categoryRout)
app.use(`/api/v1/review`, reviewRoute)


app.all(`/*`, notFoundMiddleware) // default route

 const start = async () => {
    try {
        app.listen(PORT, console.log(`server is running @ http://localhost:${PORT}`))
    } catch (err) {
        return resizeBy.status(StatusCodes.BAD_REQUEST).json({ msg: err.message})
    }
}

start()