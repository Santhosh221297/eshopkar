const Review = require('../model/review')
const Product = require('../model/product')
const { StatusCodes } = require('http-status-codes')
const checkPermission = require('../util/checkPermission')

const reviewCtrl = {
    createReview: async (req,res) => {
        try {
            const { product: productId } = req.body 

            const isValidProduct = await Product.findOne({ _id: productId })
            if (!isValidProduct)
            return res.status(StatusCodes.NOT_FOUND).json({ msg: `no product found with id ${productId}` })

            //const review exists or not
            const alreadySubmitted = await Review.findOne({
                product: productId,
                user: req.user.userId
            })
            if (alreadySubmitted)
            // return res.status(StatusCodes.BAD_REQUEST).json({ "msg: alrady submitted review for this product"})
            res.json({ msg: "create review" })
        } catch (err) {
            return res.status(StatusCodes.BAD_GATEWAY).json({ msg: err.message })
        }
    },
    getAllReview: async (req,res) => {
        try {
            const reviews = await Review.find({ }).prpulate({
                path: 'product',
                select: 'name price'
            })
            res.status(StatusCodes.OK).json()
        } catch (err) {
            return res.status(StatusCodes.BAD_GATEWAY).json({ msg: err.message })
        }
    },
    getReview: async (req,res) => {
        try {
            res.json({ msg: "get single review" })
        } catch (err) {
            return res.status(StatusCodes.BAD_GATEWAY).json({ msg: err.message })
        }
    },
    updateReview: async (req,res) => {
        try {
            res.json({ msg: "update review" })
        } catch (err) {
            return res.status(StatusCodes.BAD_GATEWAY).json({ msg: err.message })
        }
    },
    deleteReview: async (req,res) => {
        try {
            res.json({ msg: "create review" })
        } catch (err) {
            return res.status(StatusCodes.BAD_GATEWAY).json({ msg: err.message })
        }
    },
}

module.exports = reviewCtrl