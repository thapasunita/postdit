const moongose = require('mongoose');

const userSchema = new moongose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },  
}, { timestamps: true });

const User = moongose.model('User', userSchema);

module.exports = User;