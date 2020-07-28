const Post = require("../models/posts.js");

const getPosts = function (req,res) {


    res.json({
       posts: [

            {"title":"first post"},
            {"title":"second post"}

        ]
    });

}


const createPost = function (req, res) {


    const post = new Post(req.body);
    console.log("this is your post", req.body);
    post.save().then(result => {
        res.json({
            post: result
        });
    });
};

// this is a new comment that i want removed after the commit
module.exports = {getPosts, createPost};
// test3