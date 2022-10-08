const route = require('express').Router()
const authCtrl = require('../controller/userCtrl')
const { authenticateUser, authorizeRoles } = require('../middleware/authentication')

route.get(`/`, [authenticateUser, authorizeRoles('superadmin')], userCtrl.getAllUsers)
route.get(`/currentUser`, [authenticateUser], userCtrl.showCurrentUser )
route.get(`/: id`, [authenticateUser], userCtrl.getSingleUsers )

module.exports = route