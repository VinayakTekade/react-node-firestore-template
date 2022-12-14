import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, NoNavbarDefault } from "./layouts";

// Route Views
import Errors from "./views/Errors";
import UserOnboarding from "./views/UserOnboarding";
import LoginUser from "./views/LoginUser";
import ListUser from "./views/ListUser";
import UpdateUser from "./views/UpdateUser";

export default [
    {
        path: "/",
        exact: true,
        layout: DefaultLayout,
        component: () => <Redirect to="/login" />,
    },
    {
        path: "/login",
        layout: NoNavbarDefault,
        component: LoginUser,
    },
    {
        path: "/list-users",
        layout: DefaultLayout,
        component: ListUser,
    },
    {
        path: "/user-onboarding",
        layout: DefaultLayout,
        component: UserOnboarding,
    },
    {
        path: "/update-user",
        layout: DefaultLayout,
        component: UpdateUser,
    },
    {
        path: "*",
        layout: DefaultLayout,
        component: Errors,
    },
];
