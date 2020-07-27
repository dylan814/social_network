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
    post.save( (err, result) => {

        if (err) {

            return res.status(404).json({
                error: err,
            })
        }

        res.status(200).json({
            post: result, 
        })
    })

}


module.exports = {getPosts, createPost};
