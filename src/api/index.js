// module imports
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const path = require("path");
// internal module imports
const { logger } = require("./common");
const { TokenStore } = require("./common");
const { initUser } = require("./common");

// router imports
const router = require("./routes");
const { authorize } = require("./middlewares");

// setting up dotenv
require("dotenv").config();

// initializing express app
const app = express();

// enabling json parsing and cookie parsing for express app
app.use(bodyParser.json());
app.use(cookieParser());

// using cors only if in development mode
if (process.env.NODE_ENV === "development") {
    const cors = require("cors");
    app.use(cors());
}

// PORT number on which the API will listen and serve
const PORT = 4000;

// initializing firebase app, firestore database and firebase auth
const firebaseApp = initializeApp({
    credential: applicationDefault(),
});
const db = getFirestore(firebaseApp);

// initializing token store
const tokenLength = 16;
const store = new TokenStore(tokenLength);

// Add Default User Email
initUser(db);

// adding firestore reference to global object for usage convenience
global.db = db;
// adding to tokenStore reference to global object for usage convenience
global.store = store;
// routes
app.use("/api", router);

//Read Frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../../build")));

    app.get("/login-user", async (req, res) => {
        res.sendFile(path.resolve(__dirname, "../../build", "index.html"));
    });

    app.use("*", authorize, async (req, res) => {
        res.sendFile(path.resolve(__dirname, "../../build", "index.html"));
    });
}

app.listen(process.env.PORT || PORT, (error) => {
    if (!error) {
        let successMessage = `Node server listening on port ${PORT}!`;
        console.log(successMessage);
        logger(0, "expressListen", successMessage);
    } else {
        let errorMessage = `Node server failed to start and listen on port ${PORT}: ${error}`;
        console.log(errorMessage);
        logger(2, "expressListen", errorMessage);
    }
});
