
function forgotpwdspecialist() {
    var email_input = document.getElementById("email").value;
    if (email_input != '') {
        fetch(`http://localhost:8080/otp?email=${email_input}`, {
            method: "GET", headers: {
                'Content-Type': 'Application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                alert("Form submitted successfully!")
                window.location.href = "http://127.0.0.1:5502/project/html/specialist_login.html";
                console.log(data);
            })
            .catch(error => {
                console.log("Error:", error);
                alert("An error occured while submitting the form.")
            })
        // document.getElementById("registrationform").reset();
    } else {
        alert("All fields are required")
    }

}


let submit = document.getElementsByClassName("submit");

console.log(submit[0]);
submit[0].addEventListener("click", (e) => {
    console.log(e.target);
    e.preventDefault();
    let email = document.getElementById("email").value.trim()
    if (email != '') {
        fetch(`http://localhost:8080/otpspecialist?email=${email}`, {
            method: 'GET',
            headers: {
                "Content-Type": "Application/json"
            }
        })
            .then(response => {
                if (response.status === 302) {
                    return response.json()
                } else {
                    throw new Error("Invalid Email");
                }
            })
            .then(x => {
                alert("OTP sent successful...")
                localStorage.setItem('email', email)
                localStorage.setItem('otp', x.data)
                window.location.href = "http://127.0.0.1:5502/project/html/specialist_otpsent.html";
                console.log(x);
            })
            .catch(error => {
                alert("invalid Email");
            })

    } else {
        alert("All fields are required")
    }
})