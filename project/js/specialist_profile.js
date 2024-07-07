let specialist_email = localStorage.getItem("email");

async function profile() {
    try {
        let response = await fetch(`http://localhost:8080/fetchspecialistByemail?email=${specialist_email}`, {
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

let specialist_id = document.getElementById("specialist_id")
let firstNameElement = document.getElementById("firstName");
let lastNameElement = document.getElementById("lastName");
let emailElement = document.getElementById("email");
let passwordElement = document.getElementById("password");
let phoneElement = document.getElementById("phone");
let specialization_input = document.getElementById("specialization");
let experience_input = document.getElementById("experience");
let gender_input = document.getElementById("gender");
let age_input = document.getElementById("age");
let fees_input = document.getElementById("fees")
let admin_input = document.getElementById("admin")
let address_id = document.getElementById("address_id")
let door_No = document.getElementById("door_No")
let street = document.getElementById("street")
let city = document.getElementById("city")
let state = document.getElementById("state")
let pincode = document.getElementById("pincode")

const set = (x) => {
    specialist_id.innerHTML = x.id;
    firstNameElement.innerHTML = x.firstName;
    lastNameElement.innerHTML = x.lastName;
    emailElement.innerHTML = x.email;
    passwordElement.innerHTML = x.password;
    phoneElement.innerHTML = x.phone;
    specialization_input.innerHTML = x.specialization;
    experience_input.innerHTML = x.experience;
    gender_input.innerHTML = x.gender;
    age_input.innerHTML = x.age;
    fees_input.innerHTML = x.fees;
    admin_input.innerHTML = x.admin;
    address_id.innerHTML = x.address.id;
    door_No.innerHTML = x.address.door_No;
    street.innerHTML = x.address.street;
    city.innerHTML = x.address.city;
    state.innerHTML = x.address.state;
    pincode.innerHTML = x.address.pincode;
    console.log(x.address.id);

};

profile();

