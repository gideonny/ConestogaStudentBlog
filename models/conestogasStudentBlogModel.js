const mongoose = require('mongoose');

const conestogasStudentBlogModel = mongoose.model('conestogasStudentBlogModel', {
    blogAlias: String,
    blogTitle: String,
    blogContent: String,
    visibility: Boolean,
    blogDate: Date,
    blogImage: String
});

module.exports = conestogasStudentBlogModel;