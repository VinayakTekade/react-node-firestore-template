import React, { useState } from "react";
import { Row, Card, CardHeader, Container, Alert, Button } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserOnboardingForm from "../components/onboarding-forms/UserOnboarding";

import { selectUser } from "../redux/userSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserOnboarding = () => {
    const [status, setStatus] = useState("");

    const user = useSelector(selectUser);

    return user ? (
        <>
            <Container fluid className="px-0">
                {
                    {
                        IN_PROGRESS: (
                            <Alert className="mb-0">
                                <i className="fa fa-info mx-2"></i>{" "}
                                <strong>Onboarding new user</strong>
                            </Alert>
                        ),
                        ERROR: (
                            <Alert className="mb-0" theme="danger">
                                <i className="fa fa-info mx-2"></i>{" "}
                                <strong>
                                    An error occured while onboarding the new
                                    user
                                </strong>
                            </Alert>
                        ),
                        COMPLETED: (
                            <Alert className="mb-0" theme="success">
                                <i className="fa fa-info mx-2"></i>{" "}
                                <strong>
                                    Congratulations! New user onboarded!
                                </strong>
                            </Alert>
                        ),
                        FORBIDDEN: (
                            <Alert className="mb-0" theme="danger">
                                <i className="fa fa-info mx-2"></i>{" "}
                                <strong>Unauthenticated user!</strong>
                            </Alert>
                        ),
                        "": <></>,
                    }[status]
                }
            </Container>
            <div className="main-content-container px-4 container-fluid">
                <Row noGutters className="page-header py-4">
                    <PageTitle
                        sm="4"
                        title="User Onboarding"
                        subtitle="User"
                        className="text-sm-left"
                    />
                </Row>
                <Card small>
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">User Details</h6>
                    </CardHeader>
                    <UserOnboardingForm setStatus={setStatus} />
                </Card>
            </div>
        </>
    ) : (
        <Container fluid className="main-content-container px-4 pb-4">
            <div className="error">
                <div className="error__content">
                    <h3>403 Forbidden. Please log in</h3>
                    <Button pill tag={Link} to="/">
                        &larr; Go Back
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default UserOnboarding;
