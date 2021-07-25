"use strict";

// import UserForm from '../public/api/UserForm';
// import ApiConnector from '../public/api/ApiConnector';
const user = new UserForm();
user.loginFormCallback = function (data) {
    console.log(data);
    ApiConnector.login(data, (response) => {
        console.log(response);
        if (response.success) {
            location.reload();
        }
    });
};

user.registerFormCallback = function (data) {
    console.log(data);
    ApiConnector.register(data, (response) => {
        console.log(response);
        if (response.success) {
            location.reload();
        }
    });
};

