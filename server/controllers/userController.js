const User = require('../models/userModel');

class controller {
    findUser = async ({ name, room }) => {
        try {
            const user = await User.findOne({ name, room });
            return user;
        } catch (err) {
            return { err };
        }
    };
    addUser = async ({ _id, name, room }) => {
        try {
            const user = new User({ _id, name, room });
            await user.save();
            return user;
        } catch (err) {
            return { err };
        };
    };
    removeUser = async ({ _id }) => {
        try {
            await User.deleteOne({ _id });
        } catch (err) {
            return { err };
        };
    };
    getUser = async ({ _id }) => {
        try {
            const user = await User.findOne({ _id });
            return user;
        } catch (err) {
            return { err };
        };
    };
    getUsersInRoom = async ({ room }) => {
        try {
            const users = await User.find({ room });
            return users;
        } catch (err) {
            return { err };
        };
    };
}

module.exports = controller;