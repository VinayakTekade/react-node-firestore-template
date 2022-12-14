// module imports
const express = require("express");

// controller imports
const { updateUser, getUserDetails } = require("../controllers");
const { authorize } = require("../middlewares/authorize");

// initializing express app and express router
const router = express.Router();

// routes
router.get("/get", authorize, getUserDetails);
router.post("/update", authorize, updateUser);

module.exports = router;
