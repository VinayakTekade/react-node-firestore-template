import React from "react";
import { Row, Card, CardHeader, Button } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserLoginForm from "../components/components-overview/UserLoginForm";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { ListGroup, ListGroupItem, Form } from "shards-react";

const Login = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const dashboard = () => {
        window.location.href = "/list-users";
    };

    return (
        <div className="main-content-container px-4 container-fluid">
            <Row className="page-header py-4">
                <PageTitle
                    sm="4"
                    title="Login"
                    subtitle="User"
                    className="text-sm-left"
                />
            </Row>
            {user ? (
                <Card small>
                    <CardHeader className="border-bottom">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                            }}
                        >
                            <h2>Welcome {user?.name}</h2>
                        </div>

                        <ListGroup flush>
                            <ListGroupItem className="p-3">
                                <Form>
                                    <div className="d-flex flex-column align-items-center">
                                        <Button onClick={dashboard}>
                                            Dashboard
                                        </Button>
                                    </div>
                                </Form>
                            </ListGroupItem>
                        </ListGroup>
                    </CardHeader>
                </Card>
            ) : (
                <Card small>
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">User login form</h6>
                    </CardHeader>

                    <UserLoginForm />
                </Card>
            )}
        </div>
    );
};

export default Login;
