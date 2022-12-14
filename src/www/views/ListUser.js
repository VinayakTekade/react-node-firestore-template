import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    Container,
    Button,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

const ListUser = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        axios
            .get(`/api/users/list`)
            .then((response) => {
                if (response.status === 200) {
                    setUser(response.data.users);
                }
            })
            .catch((error) => {
                alert(
                    `Oops, an error occured while loading the page. Please try again after some time.`
                );
            });
    }, []);

    const removeUser = (email, index) => {
        axios.post("/api/users/delete", { email }).then((result) => {
            if (result.status === 200) {
                console.log("Deleted Successfully");
                users.splice(index, 1);
                setUser(users);
                window.location.reload();
            } else {
                throw "Failed to delete user";
            }
        });
    };

    const user = useSelector(selectUser);
    return (
        <Container fluid className="main-content-container px-4">
            {/* Page Header */}
            <Row
                noGutters
                className="page-header py-4 d-flex justify-content-between"
            >
                <PageTitle
                    sm="4"
                    title="Manage"
                    subtitle="User"
                    className="text-sm-left"
                />
                <Button
                    theme="dark"
                    style={{
                        height: "50px",
                        width: "150px",
                        fontSize: "16px",
                        borderRadius: "5px",
                    }}
                    type="submit"
                    size="lg"
                    tag={Link}
                    to="user-onboarding"
                >
                    Add User
                </Button>
            </Row>

            {/* Default Light Table */}
            <Row>
                <Col>
                    <Card small className="mb-4">
                        <CardHeader className="border-bottom">
                            <h6 className="m-0">Active user</h6>
                        </CardHeader>
                        <CardBody className="p-0 pb-3">
                            {users.length === 0 ? (
                                <div className="text text-center p-5">
                                    Click on Add User to get started.
                                </div>
                            ) : (
                                <table className="table mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="border-0"
                                            >
                                                #
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-0"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-0"
                                            >
                                                Organisation Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-0"
                                            >
                                                email
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-0"
                                            >
                                                Update
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-0"
                                            >
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((userObjects, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                    style={{ height: "120px" }}
                                                >
                                                    <td>{index + 1}</td>
                                                    <td>{userObjects.name}</td>
                                                    <td>
                                                        {userObjects.orgName}
                                                    </td>
                                                    <td>{userObjects.email}</td>
                                                    <td>
                                                        <Link
                                                            to={{
                                                                pathname:
                                                                    "update-user",
                                                                state: userObjects,
                                                            }}
                                                        >
                                                            <Button theme="light">
                                                                <i
                                                                    className="large material-icons"
                                                                    style={{
                                                                        color:
                                                                            "grey",
                                                                        fontSize:
                                                                            "18px",
                                                                        borderRadius:
                                                                            "5px",
                                                                    }}
                                                                >
                                                                    &#xe150;
                                                                </i>
                                                            </Button>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            theme="light"
                                                            onClick={(e) =>
                                                                removeUser(
                                                                    userObjects.email,
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <i
                                                                className="large material-icons"
                                                                style={{
                                                                    fontSize:
                                                                        "18px",
                                                                    borderRadius:
                                                                        "5px",
                                                                }}
                                                            >
                                                                &#xE872;
                                                            </i>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ListUser;
