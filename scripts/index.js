"use strict";

document.getElementById("login-button").addEventListener("click", validateUserInput);
document.getElementById("register-button").addEventListener("click", validateUserInput);

function validateUserInput() {
    const email = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!validatePassword(password)) {
        alert(
            "Password not valid. Must contain only aplhabet characters and numbers and be atleast 9 symbols long."
        );
        return;
    }

    window.open("./html/filter.html");
    window.close();
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return new String(email).match(emailRegex) != null ? true : false;
}

function validatePassword(password) {
    const passwordRegex = "^[a-zA-Z0-9]{9,}$";
    return new String(password).match(passwordRegex) != null ? true : false;
}
