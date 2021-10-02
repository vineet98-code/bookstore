var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title : { type: String, required: true},
    description : {type: String, },
    price : Number,
    author : String
}, {timestamps: true });

// This Book is used to perform the crud operation and capture it in router book.js
var Book = mongoose.model('Book', bookSchema); // model is equivalent to colletions

module.exports = Book;
