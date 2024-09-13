const mongoose = require('mongoose');
const conestogasStudentBlogModel = require('../models/conestogasStudentBlogModel');
const path = require('node:path');
const { check, validationResult } = require('express-validator');

async function saveBlog(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("writeBlog", { errorMessages: errors.array().map(err => err.msg) });
     
    }

    let blogAlias = req.body.blogAlias;
    let blogTitle = req.body.blogTitle;
    let blogContent = req.body.blogContent;
    let visibility = req.body.visibility === "on";
    //setting the date of the blogpost to the upload date
    let blogDate = Date.now();
    let blogImage = "";
    let error = "";
    let success = "";


    // file upload
    if (req.files && req.files.blogImage) {
        let file = req.files.blogImage;
        let filename = Date.now() + '_' + file.name;
        let uploadPath = path.join(__dirname, '..', 'public', 'uploads', filename);

        const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        if (!validMimeTypes.includes(file.mimetype)) {
            error = "Only image files (JPEG, JPG, PNG, GIF) are allowed";
            res.render("writeBlog", { error: error });
            return; // Exit early if the file is not an image
        }

        // Use a Promise to handle file upload completion because my initial approach made my application hang. Now it waits for the promise to either succeed or fail before saving to the db
        try {
            await new Promise((resolve, reject) => {
                file.mv(uploadPath, (err) => {
                    if (err) {
                        console.error("File upload failed:", err);
                        reject("File upload failed");
                    } else {
                        blogImage = filename;
                        resolve();
                    }
                });
            });
        } catch (uploadError) {
            error = uploadError;
            res.render("writeBlog", { error: error });
            return; // Exit early if file upload fails
        }
    }

    // Create and save the new blog post
    try {
        let newBlogPost = new conestogasStudentBlogModel({
            blogAlias: blogAlias,
            blogTitle: blogTitle,
            blogContent: blogContent,
            blogDate: blogDate,
            visibility: visibility,
            blogImage: blogImage // Save blogImage if uploaded
        });

        await newBlogPost.save();
        console.log('New blog post saved to database', newBlogPost);
        success = "Blog post saved successfully. Feel free to write another post!";
        res.render("writeBlog", { success: success });
    } catch (saveError) {
        console.error('Failed to save blog post:', saveError);
        error = "Failed to save blog post";
        res.render("writeBlog", { error: error });
    }
}

module.exports = saveBlog;
