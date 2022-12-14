import React, { useState } from "react";
import { Row, Card, CardHeader, Container, Alert, Button } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserUpdatingForm from "../components/update-forms/UserUpdate";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { Link } from "react-router-dom";

const UpdateUser = (props) => {
    const [status, setStatus] = useState("");
    const user = useSelector(selectUser);
    let updateUserData = props.location.state;
    updateUserData.setStatus = setStatus;

    return user ? (
        <>
            <div className="main-content-container px-4 container-fluid">
                <Row noGutters className="page-header py-4">
                    <PageTitle
                        sm="4"
                        title="Update"
                        subtitle="User"
                        className="text-sm-left"
                    />
                </Row>
                <Card small>
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">Update User</h6>
                    </CardHeader>
                    <UserUpdatingForm userObj={updateUserData} />
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

export default UpdateUser;
