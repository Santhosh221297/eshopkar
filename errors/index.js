const CustomApiErr = require('./custom-err')
const UnAuthenticatedErr = require('./un-authenticated')
const UnAuthErr = require('./un-auth')
const NotFounfErr = require('./not-found')
const BadRequestErr  = require('./bad-request')

module.exports = {
    CustomApiErr,
    NotFounfErr,
    UnAuthenticatedErr,
    UnAuthErr,
    BadRequestErr
}