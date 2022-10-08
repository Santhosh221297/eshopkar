const { StatusCodes} = require('http-status-codes')
const CustomApiErr = require('./custom-err')

class UnAuthErr extends CustomApiErr {
    constructor(message) {
        super(message)
        this.statCode = StatusCodes.FORBIDDEN; 
    }
}

module.exports = UnAuthErr