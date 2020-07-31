
const express = require('express');
const {getPosts, createPost} = require('../controller/posts');
const { requireSignin } = require("../controller/auth");
const { userById } = require("../controller/user");

const validator = require('../validator');

const router = express.Router();

router.get("/",  requireSignin, getPosts );

router.post("/post", requireSignin,validator.createPostValidator,createPost);

router.param("userId", userById);

module.exports = router;
