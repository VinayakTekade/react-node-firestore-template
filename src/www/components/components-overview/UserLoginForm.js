import React, { useState } from "react";
import axios from "axios";
import { ListGroup, ListGroupItem, Form, Button } from "shards-react";
import Modal from "./Modal";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebase.config";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import GoogleButton from "react-google-button";

const expiryDays = 1;

const UserLoginForm = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const signInWithGoogle = (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((_) => {
                setShowModal(true);
                document.getElementById("modal").showModal();
                const {
                    displayName,
                    email,
                    photoURL,
                    uid,
                    accessToken,
                } = auth.currentUser;
                axios
                    .post(`/api/users/authenticate`, {
                        idToken: accessToken,
                        email: email,
                    })
                    .then((result) => {
                        if (result.status === 200) {
                            let d = new Date();
                            d.setTime(
                                d.getTime() + expiryDays * 24 * 60 * 60 * 1000
                            );
                            document.cookie = `app-user-token=${result.data.idToken}; expires=${d}; path=/`;
                            document.getElementById("modal").close();
                            setShowModal(false);
                            dispatch(
                                login({
                                    name: displayName,
                                    email: email,
                                })
                            );
                            window.location.href = "/list-users";
                        }
                    })
                    .catch((error) => {
                        document.getElementById(
                            "modal"
                        ).childNodes[1].style.display = "block";
                        if (error.response.status === 403) {
                            document.getElementById(
                                "modal"
                            ).childNodes[0].innerText =
                                "Unauthenticated user...";
                            document.getElementById(
                                "modal"
                            ).childNodes[0].style.color = "red";
                        } else if (error.response.status === 500) {
                            document.getElementById(
                                "modal"
                            ).childNodes[0].innerText =
                                "An unexpected error occured...";
                            document.getElementById(
                                "modal"
                            ).childNodes[0].style.color = "red";
                        }
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            {showModal ? (
                <Modal
                    modalText="Verifying user, please wait..."
                    showCloseButton={false}
                />
            ) : (
                <></>
            )}

            <ListGroup flush>
                <ListGroupItem className="p-3">
                    <Form>
                        <div className="d-flex flex-column  gx-5 align-items-center">
                            <GoogleButton
                                className="google-login-button"
                                onClick={(e) => signInWithGoogle(e)}
                            />
                            <br></br>
                        </div>
                    </Form>
                </ListGroupItem>
            </ListGroup>
        </>
    );
};

export default UserLoginForm;
