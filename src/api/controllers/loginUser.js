// utility imports
const { logger, getArrayOfDocs } = require("../common");

const loginUser = async (req, res) => {
    try {
        const userToken = store.newToken(req.body.idToken);
        const userEmail = req.body.email;

        if (!userEmail) throw "The entered credentials were invalid.";

        const users = await db
            .collection("user")
            .where("email", "==", userEmail)
            .get();
        let usersArray = [];

        if (!users.empty) usersArray = getArrayOfDocs(users);
        logger(0, "loginUser", `Fetched ${usersArray.length} documents.`);

        if (usersArray.length < 1)
            res.status(403).send({ message: `Unauthenticated user.` });
        else if (usersArray.length > 1)
            res.status(403).send({ message: `Contact Support` });
        else {
            res.status(200).send({
                idToken: userToken,
            });
        }
    } catch (error) {
        logger(2, "loginUser", error);
        res.status(500);
        res.send({
            message: `An error occured while user login! Error: ${error}`,
        });
    }
};

module.exports = loginUser;
