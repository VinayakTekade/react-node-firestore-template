import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Collapse,
    NavItem,
    NavLink,
} from "shards-react";
import { auth } from "../../../../config/firebase.config";
import { selectUser } from "../../../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../redux/userSlice";

const UserActions = () => {
    const [state, setState] = useState(true);
    const dispatch = useDispatch();

    const toggleUserActions = () => {
        setState({
            visible: !state.visible,
        });
    };
    const logoutUser = (e) => {
        localStorage.removeItem("persist:root");
        axios
            .post("/api/users/signout", {}, { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.clear();
                    auth.signOut().catch((error) => {
                        console.log(error);
                    });
                    dispatch(logout());
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const user = useSelector(selectUser);
    if (user) {
        return (
            <NavItem
                tag={Dropdown}
                caret
                toggle={toggleUserActions}
                className="d-flex align-items-center"
            >
                <DropdownToggle
                    caret
                    tag={NavLink}
                    className="text-nowrap px-3"
                >
                    {/* <img
                        className="user-avatar rounded-circle mr-2"
                        src={user.photo}
                        alt="User Avatar"
                    />{" "} */}
                    <span className="d-none d-md-inline-block">
                        {user?.name}
                    </span>
                </DropdownToggle>
                <Collapse tag={DropdownMenu} right small open={state.visible}>
                    <DropdownItem divider />
                    <DropdownItem
                        tag={Link}
                        to={"/login"}
                        className="text-danger"
                        onClick={(e) => logoutUser(e)}
                    >
                        <i className="material-icons text-danger">&#xE879;</i>
                        Logout
                    </DropdownItem>
                </Collapse>
            </NavItem>
        );
    } else {
        return (
            <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
                <DropdownToggle
                    caret
                    tag={NavLink}
                    className="text-nowrap px-3"
                >
                    <span className="d-none d-md-inline-block">Login</span>
                </DropdownToggle>
                <Collapse tag={DropdownMenu} right small open={state.visible}>
                    <DropdownItem divider />
                    <DropdownItem tag={Link} to="login" className="text-danger">
                        <i className="material-icons text-danger">&#xE879;</i>{" "}
                        LogIn
                    </DropdownItem>
                </Collapse>
            </NavItem>
        );
    }
};

export default UserActions;
