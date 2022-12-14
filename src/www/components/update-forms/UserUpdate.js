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

import Modal from "../components-overview/Modal";

// const submitStatus = ["IN_PROGRESS", "ERROR", "COMPLETED", "FORBIDDEN"];

// Name, Org Name, Email, Phone
function UserUpdatingForm(props) {
    const userData = props.userObj;
    const [modalText, setModalText] = useState("");
    const updateUser = async (e) => {
        e.preventDefault();
        // props.setStatus(submitStatus[0]);
        const userName = e.target.userName.value;
        const orgName = e.target.orgName.value;
        const email = e.target.feEmail.value;

        const dataToSend = {
            email,
            orgName,
            userName,
        };

        let endpoint = "/api/users/update";

        axios
            .post(endpoint, dataToSend)
            .then((result) => {
                if (result.status === 200) {
                    window.location.href = "/list-users";
                    // props.setStatus(submitStatus[2]);
                }
            })
            .catch((error) => {
                setModalText(error.response.data.message);
                document.getElementById("modal").showModal();
                if (error.response.status === 403) {
                    // props.setStatus(submitStatus[3]);
                } else if (error.response.status === 500) {
                    // props.setStatus(submitStatus[1]);
                }
            });
    };
    return (
        <ListGroup flush>
            <Modal modalText={modalText} showCloseButton={true} />
            <ListGroupItem className="p-3">
                <Row>
                    <Col>
                        <Form onSubmit={(e) => updateUser(e)}>
                            <Row form>
                                <Col md="12" className="form-group">
                                    <label htmlFor="userName">Name</label>
                                    <FormInput
                                        id="userName"
                                        type="text"
                                        placeholder="Name"
                                        defaultValue={userData.name}
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
                                        defaultValue={userData.orgName}
                                    />
                                </Col>
                                <Col md="6">
                                    <label htmlFor="feEmail">Email</label>
                                    <FormInput
                                        id="feEmail"
                                        type="email"
                                        placeholder="Email id"
                                        defaultValue={userData.email}
                                        disabled={true}
                                    />
                                </Col>
                            </Row>
                            <Button type="submit">Update user Details</Button>
                        </Form>
                    </Col>
                </Row>
            </ListGroupItem>
        </ListGroup>
    );
}

export default UserUpdatingForm;
