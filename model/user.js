const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcrypt.js')

const User = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide name"],
        maxlength: 50,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        required: [true, "please provide email"],
        validate: {
            validator: validator.isEmail,
            message: "Invalid  email"
        }
    },
    mobile: {
        type: String,
        required: [true, "please provide mobile number"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please provide password"],
        minlength: 6,
        maxlength: 16
    },
    profile_img: {
        type: Object,
        default: {
            url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAOVBMVEWzs7P///+vr6/j4+Otra3u7u7Y2Njm5ua3t7f7+/vAwMC6urrU1NTz8/PQ0NDp6enKysrExMTc3NzfYYiMAAAEUUlEQVR4nO2dC4KqMAxFISA/QWH2v9gH4vj8ANo22NvOPSvwWJo0aQtJQgghhBBCCCGEEEIIIYQQQgghX0Uu+P4VOyLF+VxmRd9Eq1mlv3TZkEQpmd5z7uMbybxLH8mayBwlS5/pIhvI04thmtZtTDPyuGA4UkQ0jsuGaX3Kff8yHWTNcJyPEcQcyav2OZbeUwY+HSXZ1LtwClhRqtc8scAh1GGUY/mJ30QfpKL8fOo3koWnmPe1geCYOI6hOX78gN4YQlKUxmwAZwJK/9Jb+I38hKIoSwvtmBTtBceQGoKiDPaCadoGEG6q9xpb4Od+ebsMfYNvgXcYLWQWOYAPouMzOtH7dthEzu6GNfQgNu6CU/vGt8Y6GkOIPYgKs3Di5NtjFSl0DDvYlY1zLvzl6NtkjZXGrzmwazeHJfcjZ1BDMa/rV0CNpmrTME0r3y7LiJpgOvh2WUYpG06AhhpFwx9MQ7VkAdsgjt9QpbD4K4ag85CGNLwDtMynoQGgaxrFfBi/IWinJn5DxZU3aN87fsP102uxGMZf4+c2BzCCMhQ9w8a3yzKKvTZUw4OaIWZbX2Lvl0qr5jfWFhXewlRnc/Q/cKdO3M9gPIMWbBRX3VfAtkm1dn/vwYqnimH0BlYFlesLgvVq9jDE6mQoLrpvYFVQ2tlwAizSqKfDtMbKFonTweBF4Laf1A3RimC9kyZX8A6cKLb0L2DlignF8veCb58FdGMN4q1L1ZnYAQomquEUrTicsb3PtQBcLrySqwUb3yaraG3NIIaZGaVKH/nWzMtrWqzAKiqe0FjZgJ6lubLwJhpT8Bakj7jvIWKV9q84J8UDWOH7iusKHDrMzLglRewwM+OUFNHDzIxL/xs9zFyxT4r4YWbGvrUIufW7hO2hDKydik3sOhqghf0idou3AFLhf2ye04Ce0QnzeBpKHP3F+BUute9fbExu2FzE7K5tYra0wW3NbGByAAW1fbiNQaV4DizKzBh0+ZGba1t8PoQBRpkJg3QRRlX4jFHrNITK/gWzo3xBvTNxxnTtHUxleMO0HxVS5XQhNy6fAssYNn3hoBTtXp0Y0MImt+zsH3z/8I+x3n+qg3hBu+kbkh9p4Z9UaRw3Zg7Qwyh5r3AaIwO8LjMjVaF0FLpsAL97MQ6f5jnorqhyJEmRRv8QdFc0CcZQigzZDgf1LxyKIfH7ESzJq9MOh/QfqMt2SPw8suOzWexwF2iRLjsdvzuY0+CVez2bK9Tn9lsxdgos3xq8Z8uy3/tzJuOf2H978J4o+/1mpcixVT6vbkW9zy3hcep9LbC8R39pJ9vfbPJAqfnVljGp7531bMi0go5I6ze0rKOzJSdaFcMedO7TUQZgv4nW1VD/WqE2jvtWe1yz18X1BEcAho4TkYb+oSENaegfGtKQhv6hIQ1p6B8a0pCG/qEhDeM3TPoyw8b9wpug4ypICCGEEEIIIYQQQgghhBBCCPk7/AOT7UbJ5bD1AAAAAABJRU5ErkJggg=="
        }
    },
    address: {
        type: Object,
        default: {}
    },
    cart: {
        type: Array,
        default: []
    },
    wishlist: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default:[]
    },
    role: {
        type: String,
        enum: ['superadmin', 'user', 'associate'],
        default: 'user'
    }
}, {
    collection: "users",
    timestamps:true
})

/* encrypt the password */ 
UserSchema.pre('save', async function () {
    // resizeBy.json({ data: this.model('User')})
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/* compare password with stored password */ 
UserSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch;
}

module.exports = mongoose.model("User", UserSchema)