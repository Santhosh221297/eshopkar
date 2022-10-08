const User = require('../model/user')
const Customer = require('../errors')
const { StatusCodes } = require('http-status-codes')
const { /*createJwtToken, isTokenValid,**/ sendResWithCookies } = require('../util/jwt');
const user = require('../model/user');

const authCtrl = {
    register: async (req, res) => {
        const { name, email, mobile, password } = req.body ;

        const emailAlreadyExists = await User.findOne({ email })
        if( emailAlreadyExists) {
            // throw new CustomErr.BadRequestErr('Email already exists.')
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Email already exists"})
        }

        const mobileAlreadyExists = await User.findOne({ mobile })
        if( mobileAlreadyExists) {
            // throw new CustomErr.BadRequestErr('Mobile number already exists.')
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Mobile number already exists"})
        }

        await User.create({name, email, mobile, password})

        return res.json({ msg: newuser })
     },
     register: async (req, res) => { 
        return res.json({ msg: "register"})
     },
    login: async (req, res) => { 
        const { email, password } = req.body;
        // return res.json({ msg: "login"})
        const ectUser = await User.findOne({ email }).select('-password')
        if( !extUser)
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User doesn't exist."})

        const isPasswordCorrect = await extUser.comparePassword(password);
        if(!isPasswordCorrect)
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "incorrect password"})

        sendResWithCookies({ 
        res, 
        statusCode: StatusCodes.Ok,
        user: { name : extUser.name, userId: extUser._id, role: extUser.role }
        // return res.json({ data: extUser})
     })
    },
    logout: async (req, res) => {
        // return res.json({ msg: "logout"})
        res.cookie('refToken', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });
        return res.status(StatusCodes.OK).json({ msg: "user logged out" })
     },
};

module.exoprts = authCtrl