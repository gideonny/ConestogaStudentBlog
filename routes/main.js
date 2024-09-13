const conestogasStudentBlogModel = require('../models/conestogasStudentBlogModel')

function main (req,res) {
    //This finds all the recods in my database that have their visibility set to true and aranges them in reverse chronological order
    conestogasStudentBlogModel.find({visibility: true}).sort({blogDate: -1}).then(function(blogPosts){
    res.render("main", { blogPosts });
})};

module.exports = main;