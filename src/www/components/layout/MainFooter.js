import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Nav, NavItem, NavLink } from "shards-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";

const MainFooter = ({ contained, menuItems, copyright }) => {
    const user = useSelector(selectUser);
    return (
        <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
            <Container fluid={contained}>
                <Row>
                    <Nav>
                        {menuItems.map((item, idx) => (
                            <NavItem key={idx}>
                                <NavLink tag={Link} to={item.to}>
                                    {item.title}
                                </NavLink>
                            </NavItem>
                        ))}
                    </Nav>
                    <span className="copyright ml-auto my-auto mr-2">
                        {user ? "React Node Firestore Template" : ""}
                    </span>
                </Row>
            </Container>
        </footer>
    );
};

MainFooter.propTypes = {
    /**
     * Whether the content is contained, or not.
     */
    contained: PropTypes.bool,
    /**
     * The menu items array.
     */
    menuItems: PropTypes.array,
    /**
     * The copyright info.
     */
    copyright: PropTypes.string,
};

MainFooter.defaultProps = {
    contained: false,
    copyright: "React Node Firestore Template",
    menuItems: [
        // {
        //   title: "Home",
        //   to: "#"
        // },
        // {
        //   title: "Services",
        //   to: "#"
        // },
        // {
        //   title: "About",
        //   to: "#"
        // },
        // {
        //   title: "Products",
        //   to: "#"
        // },
        // {
        //   title: "Blog",
        //   to: "#"
        // }
    ],
};

export default MainFooter;
