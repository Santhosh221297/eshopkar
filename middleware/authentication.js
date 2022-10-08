const { isTokenVaild } = require('../util/jwt')
const {StatusCodes } = require('http-status-codes')

const authenticateUser = async (req, res, next) => { 
    const token = req.signedCookies.refToken;

    if(!token)
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "invalid Token "})

    try{
        const payload = isTokenVaild(token);
        req.user = payload.user;
        next();
        // req.json({ payload })
    } catch(err){
        return res.status(500).json({ msg: "Authentication Invalid"})
    }
 };

const authorizeRoles = (...roles) =>  { 
    return (req, res, next) => {
        if(!roles.includes(res.user.role)){
            return res.status(StatusCodes.FORBIDDEN).json({ msg: "Unauthprized to access this route"})
        }
        next()
    }
};

module.exports = { authenticateUser, authorizeRoles }