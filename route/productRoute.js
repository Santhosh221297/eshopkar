const route = require('express').Router()
const productCtrl = require('../controller/productCtrl')
const { authenthicateUser, authorizeRoles } = require('../middleware/authentication')

route.post(`/`)