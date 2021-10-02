var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

// router file
var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');


// connect to database
mongoose.connect(
    "mongodb://localhost/bookstore", 
    { useNewUrlparser: true, useUnifiedTopology: true },
     (err) => {
         console.log(err ? err : "Connected to database");
     }
)

// instantiate express app
var app = express();

// middleware
app.use(express.json());

// middleware setup for view engine ejs for render dynamic webpage
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// setup statics directory
app.use(express.static(path.join(__dirname, "public")));


// benefits of using res.locals is that we can add certain specific message before we going to handled the route
// middleware added meesage to response.locals.
// res.locals ia an object used to pass additinal data to the template which is being rendered for that specific request.
app.use((req, res, next) => {
    res.locals.message = 'hello world';
    next();
})


// It looks for any form and capture form data and simply put into the body
// true is used for nested form and false is used for simple form
app.use(express.urlencoded({ extended: false}));


// routing middleware with '/users' pattern in users.js
app.use('/', indexRouter);
// this middleware, it is able to move to actual router, whic is going to handle that specific case
app.use('/books', booksRouter);


// error handled middleware
// 404
app.use((req, res, next) => {
  res.status(404).send('Page not Found');
});  

// Custom error handler middleware

app.use((err, req, res, next) => {
    res.send(err);
})

app.listen(2000, () => {
    console.log(`server listening on port 2k`);
}) 