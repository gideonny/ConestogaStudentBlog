const conestogasStudentBlogModel = require('../models/conestogasStudentBlogModel');

function adminReviewPage(req, res) {
    if (req.session.userLoggedIn) {
        conestogasStudentBlogModel.find({}).sort({blogDate: -1}).then(function(blogPosts) {
            res.render("adminReviewPage", { blogPosts });
        });
    } else {
        res.redirect('/login');
    }
}

module.exports = adminReviewPage;
