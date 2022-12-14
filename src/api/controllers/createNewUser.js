// utility imports
const { logger } = require("../common");

const createNewUser = async (req, res) => {
    try {
        await db.collection("user").add(req.body);
        logger(
            0,
            "createNewUser",
            `New user ${req.body.email} created successfuly!`
        );
        res.status(200);
        res.send({
            success: true,
            message: `New user ${req.body.email} created successfuly!`,
        });
    } catch (error) {
        logger(
            2,
            "createNewUser",
            `Failed to create new user ${req.body.email}: ${error}!`
        );
        res.status(500);
        res.send({
            success: false,
            message: `Failed to create new user ${req.body.email}: ${error}!`,
        });
    }
};

module.exports = createNewUser;
