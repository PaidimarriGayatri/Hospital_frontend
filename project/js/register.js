'use strict';
(function () {
    var foo = '3g^g$';

    console.log(/^(?=.*\d)(?=(.*\W){2})(?=.*[a-zA-Z])(?!.*\s).{1,15}$/.test(foo));

    /**
     * (?=.*\d)         should contain at least 1 digit
     * (?=(.*\W){2})    should contain at least 2 special characters
     * (?=.*[a-zA-Z])   should contain at least 1 alphabetic character
     * (?!.*\s)         should not contain any blank space
     */
})();

let uppercase = /(?=.*[A-Z])/
let lower = /(?=.*[a-z])/
let digit = /(?=.*\d)/
let spe_char = /(?=.*\W)/
let min = /[a-zA-Z0-9]{8,}/

let span = document.getElementById("span")

let password = document.getElementById("password")
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
const syncPointer = ({ x: pointerX, y: pointerY }) => {
    const x = pointerX.toFixed(2)
    const y = pointerY.toFixed(2)
    const xp = (pointerX / window.innerWidth).toFixed(2)
    const yp = (pointerY / window.innerHeight).toFixed(2)
    document.documentElement.style.setProperty('--x', x)
    document.documentElement.style.setProperty('--xp', xp)
    document.documentElement.style.setProperty('--y', y)
    document.documentElement.style.setProperty('--yp', yp)
}
document.body.addEventListener('pointermove', syncPointer)

function register() {
    var email_input = document.getElementById("email").value;
    var password_input = document.getElementById("password").value;
    var confirmpassword = document.getElementById("cpassword").value;
    // if (email_input != '' || password_input != '') {
    var errorMessage = document.getElementById("errorMessage");
    errorMessage.innerHTML = '';
    var passwordWrong = document.getElementById("passwordWrong");
    passwordWrong.innerHTML = ''
    if (password_input !== confirmpassword) {
        passwordWrong.innerHTML = 'Password must be same'
        // alert('Password must be same')
        // return;
    }
    if (!email_input || !password_input || !confirmpassword) {
        errorMessage.innerHTML = 'All fields are required *'
        // alert('All fields are required')
        return;
    }

    let obj = {
        email: email_input,
        password: password_input
    }
    fetch(`http://localhost:8080/user`, {
        method: "POST", headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(obj)
    })
        .then(response => response.json())
        .then(data => {
            alert("Form submitted successfully!")
            window.location.href = 'http://127.0.0.1:5501/project/html/login.html'
            console.log(data);
        })
        .catch(error => {
            console.log("Error:", error);
            alert("An error occured while submitting the form.")
        })
    document.getElementById("registrationform").reset();
    // } else {
    //     alert("All fields are required")
    // }

}
function redirectToHomePage() {

}




let submit = document.getElementsByClassName("submit")
console.log(submit[0]);

submit[0].addEventListener("click", (e) => {
    console.log(e.target);
    e.preventDefault()

    let conf_password = document.getElementById("cpassword").value.trim()
    let password = document.getElementById("password").value.trim()

    var firstName_input = document.getElementById("firstName").value
    var lastName_input = document.getElementById("lastName").value
    var email_input = document.getElementById("email").value
    var password_input = document.getElementById("password").value.trim()
    var cpassword_input = document.getElementById("cpassword").value.trim()

    let user = {
        firstName: firstName_input,
        lastName: lastName_input,
        email: email_input,
        password: password_input,
        address: {
        }
    }

    if (firstName_input != '' && lastName_input != '' && email_input != '' && password != '' && cpassword_input != '') {
        if (cpassword_input === password_input) {
            fetch("http://localhost:8080/user", {
                method: "POST",
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(user)
            })

                .then(Response => {
                    if (Response.ok) {
                        return Response.json()
                    } else {
                        throw new Error("Registration Not Sucessfull")
                    }
                })
                .then(data => {
                    alert("Form Submitted Sucessfully")
                    window.location.href = "http://127.0.0.1:5502/project/html/login.html"
                    console.log(data)
                })
                .catch(error => {
                    console.error("Error", error);
                    alert("An error occured while Submitting");
                });
        } else {
            alert("Password Mismatch")
            return;
        }
    } else {
        alert("All fields are required")
    }

    //document.getElementById('form').reset();

})