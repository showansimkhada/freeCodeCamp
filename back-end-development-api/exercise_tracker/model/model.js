const { model, Schema } = require('mongoose');

const userSchema = new Schema ({
    username: {type: String, required: true},
    _id: String
});

const USER = model("USER", userSchema);

const exerciseSchema = new Schema({
    _id: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date},
    userId: String
});

const ES = new model("Exercises", exerciseSchema);

exports.USER = USER;
exports.ES = ES;