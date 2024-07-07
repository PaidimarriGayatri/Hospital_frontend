let btn = document.getElementById("btn");
console.log(btn);

btn.addEventListener("click", () => {
    let ol = document.getElementsByTagName("ol");
    console.log(ol);
    console.log(ol[0]);
    let display = ol[0].classList.toggle("block");
    console.log(typeof display);
    if (display) {
        ol[0].style.translate = "190px";
        ol[0].style.transitionDuration = "1s";

    } else {
        ol[0].style.translate = "1px";
    }
});


let del = document.getElementsByClassName("delete");
console.log(del);

let user_email = localStorage.getItem("email");

let id = '';

async function profile() {
    try {
        let response = await fetch(`http://localhost:8080/fetchByEmail?email=${user_email}`, {
            method: "GET",
        });
        let x = await response.json();
        if (response.status === 302) {
            set(x.data);
        } else if (response.status === 400 || response.status === 404) {
            throw new Error("Error");
        } else {
            window.alert(x.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

const set = (e) => {
    id += e.id;
    localStorage.setItem("id", e.id);
    console.log(id);
}
let user_id = localStorage.getItem("id")
profile()


del[0].addEventListener("click", async (e) => {
    console.log(e.target);
    e.preventDefault();
    try {
        console.log("user_id" + user_id);
        let response = await fetch(`http://localhost:8080/delete?id=${user_id}`, {
            method: "DELETE",
        });
        let x = await response.json();
        if (response.status === 302) {
            alert("User account deleted successfully")
            window.location.href = "http://127.0.0.1:5502/project/html/register.html"
        } else if (response.status === 400 || response.status === 404) {
            throw new Error("Error");
        } else {
            window.alert(x.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
})
async function display() {
    try {
        let response = await fetch(`http://localhost:8080/fetchAllBloodGroup`, {
            method: "GET"
        });
        let details = document.getElementsByClassName("det");
        let x = await response.json();
        if (x.status === 302) {
            let dataLengthCount = 0;
            for (let i = 0; i < x.data.length; i++) {
                console.log(x.data[i].email);
                let content = `
                <div class="details">
                    <div class="detail">
                        <div>
                            <p id="firstName">First Name: <span>${x.data[i].firstName}</span></p>
                            <p id="lastName">Last Name: <span>${x.data[i].lastName}</span></p>
                            <p id="bloodGroup">Blood Group: <span>${x.data[i].bloodGroup}</span></p>
                            <p id="availability">Availability: <span>${x.data[i].availabilty}</span></p>
                            
                        </div>
                        <div>
                            <p id="email_id">Email: <span>${x.data[i].email}</span></p>
                             <p id="city">City: <span>${x.data[i].address.city}</span></p>
                            <p id="pincode">Pin Code: <span>${x.data[i].address.pincode}</span></p>
                        </div>
                    </div>
                    <button class="msg" onclick="sendEmail('${x.data[i].email}')">
                        <div class="svg-wrapper-1">
                            <div class="svg-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                                </svg>
                            </div>
                        </div>
                        <span>Send</span>
                    </button>
                </div>
                `;

                details[0].innerHTML += content;
                dataLengthCount++;
            }
            console.log("Data length is present " + dataLengthCount + " times.");
        }
    } catch (error) {
        console.error(error);
    }
}

async function sendEmail(email) {
    fetch(`http://localhost:8080/msgDonor?donoremail=${email}&receiptdonoremail=${user_email}`, {
        method: "GET",
        headers: {
            'Content-Type': 'Application/json'
        },
    })

        .then(Response => {
            alert("mail sented successfully to " + email + "\n" + user_email)

        })
        .catch(error => {
            console.error("Error", error);
            alert("Email is not sent");
        });
}

display();


let search_input = document.getElementById("sea_input")
console.log(search_input);

let submit = document.getElementsByClassName("submit")

submit[0].addEventListener("click", async (e) => {
    try {
        let response = await fetch(`http://localhost:8080/fetchByBloodGroup?bloodGroup=${search_input.value}`, {
            method: "GET"
        });
        let details = document.getElementsByClassName("det");
        let x = await response.json();
        if (x.status === 302) {
            details[0].innerHTML = '';
            for (let i = 0; i < x.data.length; i++) {
                let content = `
                <div class="details">
                <div class="detail" >
                    <div>
                        <p id="firstName">First Name : <span>${x.data[i].firstName} </span>
                            <span id="name"></span>
                        </p>
                        <p id="lastName">Last Name : <span>${x.data[i].lastName} </span><span id="lname"></span>
                        </p>
                        <p id="bloodGroup">Blood Group :<span>${x.data[i].bloodGroup} </span> <span id="blood"></span>
                        </p>
                        <p id="availabilty">Availability : <span>${x.data[i].availabilty} </span><span id="avail"></span>
                        </p>
                    </div>
                    <div>
                        <p id="email_id">Email : <span>${x.data[i].email} </span><span id="em"></span>
                        </p>
                        <p id="city">City : <span>${x.data[i].address.city} </span><span id="city"></span>
                        </p>
                        <p id="pincode">Pin Code : <span>${x.data[i].address.pincode} </span><span id="city"></span>
                        </p>
                    </div>
                   
                </div>
                <div>
                <button class="msg" onclick="sendEmail('${x.data[i].email}')">
                <div class="svg-wrapper-1">
                    <div class="svg-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                        </svg>
                    </div>
                </div>
                <span>Send</span>
            </button>
                </div>
                </div>
                `
                    ;
                details[0].innerHTML += content;
            }
        }
    } catch (error) {
        console.error(error);
    }
})

let app = document.getElementsByClassName("app");
console.log(app[0]);
app[0].addEventListener("click", (e) => {
    window.location.href = "http://127.0.0.1:5502/project/html/appointment.html"
})