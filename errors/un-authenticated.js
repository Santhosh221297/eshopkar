const { StatusCodes} = require('http-status-codes')
const CustomApiErr = require('./custom-err')

class UnAuthenticatedErr extends CustomApiErr {
    constructor(message) {
        super(message)
        this.statCode = StatusCodes.UNAUTHORIZED; //404
    }
}

module.exports = UnAuthenticatedErr