var express = require('express');

var router = express.Router();
var Book = require('../models/book');

// Each and every req coming inside the book router already prefix with '/books'
router.get('/', (req, res) => {
    res.render('books');
});

// For rendering book create form => GET on "/books/new"
router.get('/new', (req, res) => {
    res.render('addBook');
});

router.post('/', (req, res, next) => {
    // capture data
    // save it to database and lastly send response back to client that your book has been submitted
    // console.log(req.body);
    // Book.create save the entire information which is capture 
    Book.create(req.body, (err, createdBook) => {
        // console.log(err, createdBook)
        // whatever err thrown by mongoose, That err will be passed to this error handler middleware
        if(err) return next(err)
        // redirect is used to redirect the specfic routes after specific operation is perform, we can use redirect method
        // res.redirect always does the get request
        res.redirect('/books')
    })
})

module.exports = router;