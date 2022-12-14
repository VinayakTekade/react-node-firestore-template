const getUserNames = require("./getUserNames");
const createNewUser = require("./createNewUser");
const deleteUser = require("./deleteUser");
const logout = require("./logout");
const loginUser = require("./loginUser");
const updateUser = require("./updateUser");
const updateDefaultUser = require("./updateDefaultUser");
const getUserDetails = require("./getUserDetails");

module.exports = {
    getUserNames,
    createNewUser,
    deleteUser,
    logout,
    loginUser,
    updateDefaultUser,
    updateUser,
    getUserDetails,
};
