
const express = require('express');
const {getPosts, createPost, 
    postsByUser,
    postById,
    isPoster,
    updatePost,
    deletePost} = require('../controller/posts');

const { requireSignin } = require("../controller/auth");
const { userById } = require("../controller/user");
const { createPostValidator } = require("../validator");


const validator = require('../validator');

const router = express.Router();

router.get("/posts", getPosts );

router.post(
    "/post/new/:userId",
    requireSignin,
    createPost,
    createPostValidator
);




router.get("/posts/by/:userId", requireSignin, postsByUser);
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);

// any route containing :userId, our app will first execute userById()
router.param("userId", userById);
// any route containing :postId, our app will first execute postById()
router.param("postId", postById);


module.exports = router;
