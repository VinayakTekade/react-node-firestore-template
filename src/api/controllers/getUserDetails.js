// utility imports
const { getArrayOfDocs, logger } = require("../common");

const getUserDetails = async (req, res) => {
    try {
        const userNameObjects = await db.collection("user").get();
        // const userNames = userNameObjects.map(doc => { doc.data(); })
        const userNames = getArrayOfDocs(userNameObjects.docs);
        logger(0, "getUserDetails", `Fetched ${userNames.length} document(s)`);
        res.status(200);
        res.send({
            users: userNames,
        });
    } catch (error) {
        logger(2, "getUserDetails", `Failed to fetch user details!: ${error}`);
        res.status(500);
        res.send({
            message: "Failed to fetch user details!",
        });
    }
};

module.exports = getUserDetails;
