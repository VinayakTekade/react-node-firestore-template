// utility imports
const { logger } = require("../common");
const updateUser = async (req, res) => {
    try {
        if (!req.body.email) {
            logger(
                2,
                "updateUser",
                "User email is not provided, failed to update user"
            );
            res.status(400);
            res.send({
                success: false,
                message: "User email is not provided, failed to update user",
            });
        }

        const result = await db
            .collection("user")
            .where("email", "==", req.body.email)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // console.log(doc.id, " => ", doc.data());
                    doc.ref.update({
                        orgName: req.body.orgName,
                        name: req.body.userName,
                    });
                });
            });

        logger(0, "updateUser", `Updated user with email ${req.body.email}`);
        res.status(200);
        res.send({
            success: true,
            message: `Updated user with email ${req.body.email}`,
        });
    } catch (error) {
        logger(2, "updateUser", error);
        res.status(500);
        res.send({
            message: `An error occured while updating user! Error: ${error}`,
        });
    }
};

module.exports = updateUser;
