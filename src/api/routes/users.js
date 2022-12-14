// module imports
const express = require("express");

// controller imports
const {
    loginUser,
    updateUser,
    getUserNames,
    deleteUser,
    logout,
    createNewUser,
} = require("../controllers");
const { authorize } = require("../middlewares/authorize");

// initializing express app and express router
const router = express.Router();

// routes
router.post("/authenticate", loginUser);
router.get("/list", authorize, getUserNames);
router.post("/create", authorize, createNewUser);
router.post("/delete", authorize, deleteUser);
router.post("/update", authorize, updateUser);
router.post("/signout", authorize, logout);

module.exports = router;
