const Product = require('../model/product')
const { StatusCodes } = require('http-status-codes')
const path = require('path')

const productCtrl = {
    create: async (req, res) => {
        let product = await Product.create(req.body)
        res.status(StatusCodes.CREATED).json({ product })
    },
    getAll: async(req, res) => {
        let products = await Product.find({})
        res.status(StatusCodes.OK).json({ products, count: products.length })
    },
    getSingle: async (req, res) => { 
        let product = await Product.findOne({ _id: req.params.id }).populate('reviews')
        if(!product)
        return res.status(StatusCodes.NOTFOUND).json({ msg: `No product found with id ${req.params.id}` })

        return res.status(StatusCodes.OK).json({ product })

     },
    update: async (req, res) => { 
        let id = req.params.id

        let product = await Product.findOneAndUpdate({ _id:id }, req.body, {
            new: true,
            runValidators: true
        })

        if(!product)
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No product found with id ${req.params.id}` })

        res.status(StatusCodes.OK).json({ product })

    },
    delete: async (req, res) => { 
        const id = req.params.id 

        let product = await Product.findOne({ _id: id })

        if(!product)
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No product found with id ${req.params.id}` })
       
        product.remove()
        res.status(StatusCodes.OK).json({ product })
9
    },
}

module.exports = productCtrl