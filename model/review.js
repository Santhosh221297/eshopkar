const { number } = require('joi');
const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
    rating: {
        type: number,
        min: 1,
        max: 5,
        required: [true, 'provide rating']
    },
    something: {
        type: number,
        defaul: 1
    },
    title: {
        type: String,
        trim: true,
        required: [ true , 'provide review title'],
        maxlength: 100
    },
    comment: {
        type: String,
        required: [true, 'provide comment']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'product',
        required: true

    }
}, {
    collection: "reviews",
    timestamps: true
})

//review index
ReviewSchema.index({ product: 1, user: 1}, {unique: true })

//average rating calculation

//save the review

ReviewSchema.statics.calculateAverageRating = async function (productionId) {
    const result = await this.aggrege([
        //look for reviews associated with a product
        { $match: {product: productId}},
        {
            $group: {
                _id: '$product',
                averageRating: { $avg: '$rating' }
            }
        }
    ])

    //optional chaining
    try{
        await this.model('Product').findByIdAndUpdate(productId, {
            averageRating: result[0]?.averageRating || 0
        })
    } catch(err) {
        throw err;
    }
};

// end of calculate average rating

ReviewSchema.post('save', async function () {
    await this.constructor.calculateAverageRating(this.product)
})

//remove the review
ReviewSchema.post('remove', async function () {
    await this.constructor.calculateAverageRating(this.product)
})

module.exports = mongoose.model("Review", ReviewSchema)