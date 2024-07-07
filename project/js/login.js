async function user_login() {
    let email_input = document.getElementById("email").value;
    let password_input = document.getElementById("password").value;
    let obj = {
        email: email_input,
        password: password_input
    }
    console.log(obj);
    if (email_input != '' && password_input != '') {
        let response = await fetch(`http://localhost:8080/login?email=${email_input}&password=${password_input}`, {
            method: "GET", headers: {
                'Content-Type': 'Application/json'
            },
            // body: JSON.stringify(obj)
        })

            .then(async response => {
                console.log(response);
                const data = await response.json();
                if (response.status === 302) {
                    console.log("Success", data);
                    alert("Form submitted successfully!")

                } else {
                    alert(data.message + "😒😒😒")
                    return;
                }
            })
            .then(data => {
                // window.location.href = 'http://127.0.0.1:5501/project/html/dum.ht ml', '_blank'
                console.log(data);
            })
            .catch(error => {
                console.log("Error:", error);
                alert("An error occured while submitting the form.")
            })
    } else {
        alert("Please fill mandatory *  fields")
    }
}


let submit = document.getElementsByClassName("submit");
console.log(submit);

submit[0].addEventListener("click", async (e) => {
    console.log(e.target);
    e.preventDefault()
    let email_input = document.getElementById("email").value.trim();
    let password_input = document.getElementById("password").value.trim();

    if (email_input != '' && password_input != '') {
        try {
            let response = await fetch(
                `http://localhost:8080/login?email=${email_input}&password=${password_input}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "Application/json",
                    },
                }
            )
            let x = await response.clone().json();
            if (x.status === 302) {
                window.location.href = "http://127.0.0.1:5502/project/html/usermain.html";
                localStorage.setItem('email', email_input)
                localStorage.setItem('password', password_input)
                return response.json();
            }
            else if (response.status === 400 && response.status === 404) {
                window.alert("Please enter the correct EMAIL Id and PASSWORD...");
            }
            else {
                window.alert(x.message + "😒😒😒");
            }
           
        } catch (error) {
            alert("invalid user name or password....");

        }
    } else {
        alert("All fields are required")
    }
});