import React from "react";
import { Nav } from "shards-react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/userSlice";

// import Notifications from "./Notifications";
import UserActions from "./UserActions";

export default () => {
    const user = useSelector(selectUser);

    return (
        <Nav navbar className="border-left flex-row">
            {user ? <UserActions /> : ""}
        </Nav>
    );
};
