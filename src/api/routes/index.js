// module imports
const express = require("express");

// router imports
const usersRouter = require("./users");
const defaultUserRouter = require("./default");

// initializing express app and express router
const router = express.Router();

// routers
router.use("/users", usersRouter);
router.use("/default-user", defaultUserRouter);

module.exports = router;
