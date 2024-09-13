const conestogasStudentBlogModel = require("../models/conestogasStudentBlogModel");

function deleteBlog(req,res) {

    if(req.session.userLoggedIn) {
        const blogId = req.params.id;
    

    conestogasStudentBlogModel.findByIdAndDelete(blogId).then(result => {res.redirect('/adminReviewPage');});       
    } else {
        res.redirect('/login');
    }};
    

module.exports = deleteBlog;

