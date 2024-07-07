let user__id = localStorage.getItem("id");
let uppercase = /(?=.*[A-Z])/
let lower = /(?=.*[a-z])/
let digit = /(?=.*\d)/
let spe_char = /(?=.*\W)/
let min = /[a-zA-Z0-9]{8,}/

let span = document.getElementById("span")

let password = document.getElementById("forget")
console.log(password);

password.addEventListener("keyup", () => {
    if (uppercase.test(password.value) === false) {
        span.innerHTML = "it should contains one uppercase"
    } else if (lower.test(password.value) === false) {
        span.innerHTML = "it should contains one lowercase"
    } else if (digit.test(password.value) === false) {
        span.innerHTML = "it should contains one digit"
    } else if (spe_char.test(password.value) === false) {
        span.innerHTML = "it should contains one special characters"
    } else if (password.value.length < 8) {
        span.innerHTML = "it should minimum 8 characters"
    } else {
        span.innerHTML = "Strong Password"
    }
})

let cspan = document.getElementById("cspan");

let cpassword = document.getElementById("cpassword")

cpassword.addEventListener("keyup", () => {
    if (password.value === cpassword.value) {
        cspan.innerHTML = "entered password matched"
        cspan.style.color = "green"
    } else {
        cspan.innerHTML = "entered password doesn't matched"
        cspan.style.color = "red"
    }
})
let submit = document.getElementsByClassName("submit");
submit[0].addEventListener("click", (e) => {
    e.preventDefault();
    var user_password = document.getElementById("forget").value
    var user_cpassword = document.getElementById("cpassword").value
    let user = {
        id: user__id,
        password: user_password
    }
    console.log(user);
    if (user_password != '' && user_cpassword != '') {
        if (user_password === user_cpassword) {
            fetch("http://localhost:8080/updatespecialist", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(response => {
                    console.log(response.status);
                    if (response.status === 302) {
                        return response.json();
                    } else {
                        throw new Error("Password Not Successful");
                    }
                })
                .then(data => {
                    alert("Password updated successfully");
                    // window.open(URL = "http://127.0.0.1:5501/project/html/login.html", "_self");
                    window.location.href = "http://127.0.0.1:5502/project/html/specialist_login.html";
                    console.log(data);
                })
                .catch(error => {
                    console.error("Error", error);
                    alert("An error occurred while submitting");
                });
        } else {
            alert("password mismatch")

        }
    } else {
        alert("all fields are required")
    }
})