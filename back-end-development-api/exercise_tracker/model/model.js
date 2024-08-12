const { model, Schema } = require('mongoose');

const userSchema = new Schema ({
    username: {type: String, required: true},
    log: {type: Array}
});

const USER = model("USER", userSchema);

exports.USER = USER;