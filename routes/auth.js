const express = require("express");
const { signup,signin, signout } = require("../controller/auth");
const { userSignupValidator } = require("../validator");
const { userById } = require("../controller/user");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);


router.post("/signin", signin);
router.get("/signout", signout);

// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);


// router.post("/signup",signup);


module.exports = router;