//importing dependancies
//external modules
const express = require('express');
const loginGet = require('./routes/loginGet');
const loginPost = require('./routes/loginPost');
const main = require('./routes/main');
const welcome = require('./routes/welcome')
const writeBlog = require('./routes/writeBlog');
const adminReviewPage = require('./routes/adminReviewPage');
const session = require('express-session');
const conestogasStudentBlogModel = require('./models/conestogasStudentBlogModel');
const saveBlog = require('./routes/saveBlog');
const updatePost = require('./routes/updatePost');
const logout = require('./routes/logout');
const fileUpload = require('express-fileupload');
const deleteBlog = require('./routes/deleteBlog');
const getBlog = require('./routes/getBlog');
const { check, validationResult } = require('express-validator');

//node native modules
const path = require('node:path');

//setting up express = configs
const conestogasStudentBlog = express();
//setting up SET
conestogasStudentBlog.set('views', path.join(__dirname, 'views'));
conestogasStudentBlog.set('view engine', 'ejs');

//setting up USE
conestogasStudentBlog.use(express.static(__dirname + '/public'));

//Setting up sessions. This allows me to grant access to specific people
conestogasStudentBlog.use(session({
    secret: 'this is my secret blog',
    resave: false,
    saveUninitialized: true
}));

//This allows me to create the directory for where images will be uploaded if the directory doesnt exist
conestogasStudentBlog.use(fileUpload({
    createParentPath: true
}));

//enable URL encoded & body data. It allows me to use the data submited by users 
conestogasStudentBlog.use(express.urlencoded({extended: false}));

//setting up routes
conestogasStudentBlog.get("/main", main);
conestogasStudentBlog.get("/", welcome);
conestogasStudentBlog.get("/login", loginGet);
conestogasStudentBlog.get("/writeBlog", writeBlog);
conestogasStudentBlog.get("/adminReviewPage", adminReviewPage);
conestogasStudentBlog.get('/logout', logout);
conestogasStudentBlog.get('/blog/:slug', getBlog);
conestogasStudentBlog.post('/writeBlog', [
    check('blogAlias', 'Blogpost must have an alias.').trim().notEmpty(),
    check('blogTitle', 'Blogpost must have a title.').trim().notEmpty(),
    check('blogContent', 'Blogpost can not be empty').trim().notEmpty()    
], saveBlog);
conestogasStudentBlog.post('/updatePost/:id', updatePost);
conestogasStudentBlog.post('/login', loginPost);
conestogasStudentBlog.post('/deleteBlog/:id', deleteBlog);

//creating and connecting the database
const mongoose = require('mongoose');
// const authenticateAdmin = require('./functions/authenticateAdmin');
mongoose.connect('mongodb://localhost:27017/conestogasStudentBlog');

const PORT = 3000;

conestogasStudentBlog.listen(PORT, () => console.log(`Server is up and running on http://localhost:${PORT}`));