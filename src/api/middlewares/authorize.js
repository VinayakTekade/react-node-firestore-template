const { logger } = require("../common");
const { getAuth } = require("firebase-admin/auth");
const authorize = async (req, res, next) => {
    try {
        const userToken = req.cookies["app-user-token"];
        const idToken = store.getToken(userToken);

        getAuth()
            .verifyIdToken(idToken)
            .then((_) => {
                next();
            })
            .catch((error) => {
                throw error;
            });
    } catch (error) {
        logger(2, "authorize", error);
        res.redirect(302, "/login-user");
    }
};

module.exports = { authorize };
