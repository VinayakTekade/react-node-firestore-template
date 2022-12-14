import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Navbar, NavbarBrand } from "shards-react";

import NavbarNav from "./NavbarNav/NavbarNav";
import { Link } from "react-router-dom";
import { selectUser } from "../../../redux/userSlice";
import { useSelector } from "react-redux";

const MainNavbar = ({ layout, stickyTop }) => {
    const classes = classNames(
        "main-navbar",
        "bg-white",
        stickyTop && "sticky-top"
    );
    const user = useSelector(selectUser);

    return (
        <div className={classes}>
            <Container className="p-0">
                <Navbar
                    type="light"
                    className="align-items-stretch justify-content-stretch flex-md-nowrap p-0"
                >
                    <NavbarBrand
                        tag={Link}
                        to="/list-users"
                        className="d-flex align-self-center"
                    >
                        React Node Firebase Template
                    </NavbarBrand>
                    <NavbarNav />
                </Navbar>
            </Container>
        </div>
    );
};

MainNavbar.propTypes = {
    /**
     * The layout type where the MainNavbar is used.
     */
    layout: PropTypes.string,
    /**
     * Whether the main navbar is sticky to the top, or not.
     */
    stickyTop: PropTypes.bool,
};

MainNavbar.defaultProps = {
    stickyTop: true,
};

export default MainNavbar;
