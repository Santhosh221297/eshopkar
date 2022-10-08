const User = require('../model/user')
const { StausCodes, StatusCodes } = require('http-status-codes')

const userCtrl = {
    getAllUsers: async (req, res) => {
        // return res.json({ msg: "get all user"})
        const users = await User.find({ role: 'user'}).select('-password')
        res.status(StatusCodes.OK).json({ users })
     },
    getSingleUser: async (req, res) => { 
        // return res.json({ msg: "get single user"})
        const user = await User.findOne({ _id: req.params.id }).select('-password');
        if(!user)
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User doesn't exists."})
        res.status(StatusCodes.OK).json({ user })
    },
    showCurrentUser: async (req, res) => { 
        // return res.json({ msg: "Show current user"})
        res.status(StatusCodes.OK).json(req.user)
    }
}

module.exports = userCtrl