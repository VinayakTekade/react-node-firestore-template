// utility imports
const { logger } = require("../common");

const deleteUser = async (req, res) => {
    try {
        if (!req.body.email) {
            logger(
                2,
                "deleteUser",
                "User email is not provided. Failed to delete user"
            );
            res.status(400);
            res.send({
                success: false,
                message: "User email is not provided. Failed to delete user",
            });
        }
        var emailUser = db
            .collection("user")
            .where("email", "==", req.body.email);
        emailUser.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
            });
        });
        logger(0, "deleteUser", `Deleted user with email ${req.body.email}`);
        res.status(200);
        res.send({
            success: true,
            message: `Deleted user with email ${req.body.email}`,
        });
    } catch (error) {
        logger(
            2,
            "deleteUser",
            `Failed to delete user user ${req.body.email}: ${error}`
        );
        res.status(500);
        res.send({
            success: false,
            message: `Failed to delete user user ${req.body.email}: ${error}`,
        });
    }
};

module.exports = deleteUser;
