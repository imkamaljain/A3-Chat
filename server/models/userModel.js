const mongoose = require('../config/dbConfig');

const userSchema = mongoose.Schema(
    {
        _id: String,
        name: {
            type: String,
            required: true
        },
        room: {
            type: String,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: false
        }
    }
);

module.exports = mongoose.model('user', userSchema);