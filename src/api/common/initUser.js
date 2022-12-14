const getArrayOfDocs = require("./getArrayOfDocs");

const declareGlobalVariables = (userObject) => {
    try {
        if (userObject) {
            global.defaultUserEmail = userObject.defaultUserEmail;
            global.defaultUserName = userObject.defaultUserName;
        } else {
            global.defaultUserEmail = process.env.DEFAULT_EMAIL_ID;
            global.defaultUserName = "Default User";
        }
    } catch (error) {
        throw `ERROR : declareGlobalVariables : Error while declaring global variables : ${error}`;
    }
};

const checkUser = async (db) => {
    try {
        const usersRef = db.collection("user");
        const defaultUserEmail = await usersRef
            .where("email", "==", process.env.DEFAULT_EMAIL_ID)
            .get();
        if (defaultUserEmail.empty) {
            console.log("User Email does not exist");
            return false;
        }
        declareGlobalVariables(getArrayOfDocs(defaultUserEmail)[0]);
        return true;
    } catch (error) {
        console.log("Error while fetching documents");
        console.log(error);
    }
};

const getConfigEnvVariables = () => {
    try {
        return {
            email: process.env.DEFAULT_EMAIL_ID,
            name: "Default User",
        };
    } catch (error) {
        throw `ERROR : getConfigEnvVariables : Error while reading Environment Variables : ${error}`;
    }
};

const addUser = async (db) => {
    try {
        const configEnvVars = getConfigEnvVariables();
        await db.collection("user").add({
            logoUrl: "",
            orgName: "",
            phoneNo: "",
            defaultUser: true,
            ...configEnvVars,
        });
        declareGlobalVariables(configEnvVars);
        console.log(
            "Added Default User with email: ",
            process.env.DEFAULT_EMAIL_ID,
            "to user"
        );
    } catch (error) {
        console.log(
            "Failed to add Default User with email: ",
            process.env.DEFAULT_EMAIL_ID
        );
        console.log(error);
    }
};

const initUser = async (db) => {
    const check = await checkUser(db);
    if (!check) {
        console.log("Adding new User");
        await addUser(db);
    } else {
        console.log("Default User Already Exists");
    }
};

module.exports = initUser;
