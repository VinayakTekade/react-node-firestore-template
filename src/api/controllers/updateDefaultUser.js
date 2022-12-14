// utility imports
const { logger } = require("../common");
const updateDefaultUser = async (req, res) => {
    try {
        if (!req.body.email) throw "Email is missing";

        const result = await db
            .collection("defaultUser")
            .where("defaultUserEmail", "==", req.body.email)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // console.log(doc.id, " => ", doc.data());
                    doc.ref.update({
                        logoUrl: req.body.logoUrl,
                        orgName: req.body.orgName,
                        phoneNo: req.body.phoneNo,
                        defaultUserName: req.body.name,
                    });
                });
            });

        defaultUserName = req.body.name;

        logger(0, "updateDefaultUser", `Updated Default User Data`);
        res.status(200);
        res.send({
            success: true,
            message: `Updated Default User Data`,
        });
    } catch (error) {
        logger(2, "updateDefaultUser", error);
        res.status(500);
        res.send({
            message: `An error occured while updating Default User! Error: ${error}`,
        });
    }
};

module.exports = updateDefaultUser;
