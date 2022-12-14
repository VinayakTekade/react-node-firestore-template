// utility imports
const { logger } = require("../common");

const logout = async (req, res) => {
    try {
        const userToken = req.cookies["app-user-token"];
        store.deleteToken(userToken);
        res.clearCookie("app-user-token");
        res.sendStatus(200);
    } catch (error) {
        logger(2, "logout", error);
        res.status(500);
        res.send({
            message: "An error occured while user logout!",
        });
    }
};

module.exports = logout;
