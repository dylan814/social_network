const Post = require("../models/posts.js");
const uuidv1 = require("uuidv1");




const getPosts = (req, res) => {

        const posts = Post.find()
            .select("_id title body")
            .then(posts => {
                res.json({ posts });
            })
            .catch(err => console.log(err));
    
};





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