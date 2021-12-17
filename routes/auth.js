const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  loginUser,
  signUpUser,
  googleLogin,
  getAllUsers,
  getUserById,
} = require("../controllers/userController");
const { validateJwt, revalidateJwt } = require("../helpers/processJwt");
const { validateFields } = require("../helpers/validateFields");

router.get("/", getAllUsers);

router.get("/user/:id", getUserById);

router.post(
  "/signup",
  [
    check("name", "Name field is required").not().isEmpty(),
    check("email", "Must be a valid email").isEmail(),
    check(
      "password",
      "Password must be 8 characters long with capital letter & Symbol"
    ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
    validateFields,
  ],
  signUpUser
);

router.post(
  "/login",
  [
    check("email", "You are required to enter the email").isEmail(),
    check("password", "You are required to enter a password").not().isEmpty(),
    validateFields,
  ],
  loginUser
);

router.post("/googleLogin", googleLogin);

router.post("/renew", validateJwt, revalidateJwt);

module.exports = router;
