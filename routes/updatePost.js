const conestogasStudentBlogModel = require("../models/conestogasStudentBlogModel");

function updatePost(req,res) {
    //extracts the ID from the URL
    if (req.session.userLoggedIn) {
        const blogId = req.params.id;
    const newVisibility = req.body.newVisibility === 'on';
    const editedContent = req.body.editedContent;

    conestogasStudentBlogModel.findByIdAndUpdate(blogId, { visibility: newVisibility, blogContent: editedContent}, {new: true}).then(updatedBlogPost => {
        console.log('Blog post updated', updatedBlogPost);
        res.redirect('/adminReviewPage');
    });
    } else {
        res.redirect('/login');
    }       
};
 
module.exports = updatePost;
