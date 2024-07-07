let submit = document.getElementsByClassName("submit");

console.log(submit[0]);
submit[0].addEventListener("click", (e) => {
    console.log(e.target);
    e.preventDefault();
    let email = document.getElementById("email").value.trim()
    if (email != '') {
        fetch(`http://localhost:8080/otp?email=${email}`, {
            method: 'GET',
            headers: {
                "Content-Type": "Application/json"
            }
        })
            .then(response => {
                if (response.status === 302) {
                    console.log(email);
                    return response.json()
                } else {
                    throw new Error("Invalid Email");
                }
            })
            .then(x => {
                alert("OTP sent successful...")
                // localStorage.setItem("otp" + data.data)
                localStorage.setItem('email', email)
                localStorage.setItem('otp', x.data)
                window.location.href = "http://127.0.0.1:5502/project/html/user_otpsent.html";
                console.log(x);
            })
            .catch(error => {
                alert("invalid Email");
            })
    } else {
        alert("All fields are required")
    }
})