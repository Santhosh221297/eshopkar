const { string } = require('joi')
const mongoose = require('mongoose')

const Product = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide product name"],
        trim: true,
        maxlength: [100, "product name can't be more than 100 characters"]
    },
    price: {
        type: Number,
        required: [true, " provide product prize "],
        default: 0
    },
    description: {
        type: String,
        required: [true, " provide product description"],
        maxlength: [100, "description cannot be more than 1000 characters"] 
    },
    image: {
        type: Object,
        required: [true, "provide image properties"]
    },
    caregory: {
        type: string,
        required: [true, "provide category"]
    },
    festured: {
        type: Boolean,
        default: false
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
    inventory: {
        type: Number,
        required: [true, "provide stock inventory"] ,
        default: 0
    },
    averageRating: {
        type: Number,
        default: 0
    }
}, {
    collection: "products",
    timestamps: true
})

/* virtual schema */
Product.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
    justOne: false
})

// if delete product- at the same time related reviews should delete
Product.pre('remove', async function (next) {
    await this.model('Review').deleteMany({ product: this._id})
    next()
})

module.exports = mongoose,model("Products", Products)