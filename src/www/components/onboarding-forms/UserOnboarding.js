import React, { useState } from "react";
import axios from "axios";
import {
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormInput,
    Button,
    FormSelect,
} from "shards-react";
import { User } from "../../schemas";
import Modal from "../components-overview/Modal";

const submitStatus = ["IN_PROGRESS", "ERROR", "COMPLETED", "FORBIDDEN"];

// Name, Org Name, Email, Phone
function UserOnboardingForm({ setStatus }) {
    const [modalText, setModalText] = useState("");
    const onboardUser = async (e) => {
        e.preventDefault();
        setStatus(submitStatus[0]);
        const userName = e.target.userName.value;
        const orgName = e.target.orgName.value;
        const UserEmail = e.target.feEmail.value;

        const user = new User(UserEmail, orgName, userName);
        const userJSON = JSON.parse(JSON.stringify(user));

        let endpoint = "/api/users/create";

        axios
            .post(endpoint, userJSON)
            .then((result) => {
                if (result.status === 200) {
                    setStatus(submitStatus[2]);
                }
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    setStatus(submitStatus[3]);
                } else if (error.response.status === 500) {
                    setStatus(submitStatus[1]);
                }
            });
    };
    return (
        <ListGroup flush>
            <Modal modalText={modalText} showCloseButton={true} />
            <ListGroupItem className="p-3">
                <Row>
                    <Col>
                        <Form onSubmit={(e) => onboardUser(e)}>
                            <Row form>
                                <Col md="12" className="form-group">
                                    <label htmlFor="userName">Name</label>
                                    <FormInput
                                        id="userName"
                                        type="text"
                                        placeholder="Name"
                                    />
                                </Col>
                            </Row>
                            {/* TODO: Get Organisation Name from Session/Local Storage/Redux */}
                            <Row form>
                                <Col md="6" className="form-group">
                                    <label htmlFor="orgName">
                                        Organisation Name
                                    </label>
                                    <FormInput
                                        id="orgName"
                                        type="text"
                                        placeholder="Organisation Name"
                                    />
                                </Col>
                                <Col md="6">
                                    <label htmlFor="feEmail">Email</label>
                                    <FormInput
                                        id="feEmail"
                                        type="email"
                                        placeholder="Email id"
                                    />
                                </Col>
                            </Row>
                            <Button type="submit">Create New User</Button>
                        </Form>
                    </Col>
                </Row>
            </ListGroupItem>
        </ListGroup>
    );
}

export default UserOnboardingForm;
