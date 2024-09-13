const conestogasStudentBlogModel = require("../models/conestogasStudentBlogModel");

function getBlog(req, res) {
    const slug = req.params.slug;
    const [blogTitle, blogID] = slug.split('_');
    conestogasStudentBlogModel.findById(blogID)
        .then(blogPost => {
            if (!blogPost) {
                return res.status(404).send('Blog post not found');
            }
            res.render('blogPost', { blogPost });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Server error');
        });
}

module.exports = getBlog;
