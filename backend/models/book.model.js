const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    booktitle: {
        type: String,
        // required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;