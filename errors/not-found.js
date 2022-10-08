const { StatusCodes} = require('http-status-codes')
const CustomApiErr = require('./custom-err')

class NotFounfErr extends CustomApiErr {
    constructor(message) {
        super(message)
        this.statCode = StatusCodes.NOT_FOUND //404
    }
}

module.exports = NotFounfErr