const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    comments: [String]
});

module.exports = mongoose.model("Books", BooksSchema);