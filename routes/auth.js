const express = require("express");
const { signup,signin, signout,socialLogin, forgotPassword, resetPassword } = require("../controller/auth");
const { userSignupValidator, passwordResetValidator } = require("../validator");
const { userById } = require("../controller/user");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);

router.post("/social-login", socialLogin); 

router.post("/signin", signin);
router.get("/signout", signout);

router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);

// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);


// router.post("/signup",signup);


module.exports = router;