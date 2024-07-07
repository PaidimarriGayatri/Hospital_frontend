let user_email = localStorage.getItem("email");

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

let user_id = document.getElementById("user_id")
let firstNameElement = document.getElementById("firstName");
let lastNameElement = document.getElementById("lastName");
let emailElement = document.getElementById("email");
let passwordElement = document.getElementById("password");
let phoneElement = document.getElementById("phone");
let bloodGroupElement = document.getElementById("bloodGroup");
let availability = document.getElementById("availability");
let gender = document.getElementById("gender");
let address_id = document.getElementById("address_id")
let door_No = document.getElementById("door_No")
let street = document.getElementById("street")
let city = document.getElementById("city")
let state = document.getElementById("state")
let pincode = document.getElementById("pincode")
const set = (x) => {
    user_id.value = x.id;
    firstNameElement.value = x.firstName;
    lastNameElement.value = x.lastName;
    emailElement.value = x.email;
    passwordElement.value = x.password;
    phoneElement.value = x.phone;
    bloodGroupElement.value = x.bloodGroup;
    availability.value = x.availabilty;
    gender.value = x.gender
    address_id.value = x.address.id;
    door_No.value = x.address.door_No;
    street.value = x.address.street;
    city.value = x.address.city;
    state.value = x.address.state;
    pincode.value = x.address.pincode;

};

profile();
console.log(user_email);

let submit = document.getElementsByClassName("submit")[0];
submit.addEventListener("click", (e) => {
    e.preventDefault();

    var user_id = document.getElementById("user_id").value;
    var firstName_input = document.getElementById("firstName").value;
    var lastName_input = document.getElementById("lastName").value;
    var email_input = document.getElementById("email").value;
    var password_input = document.getElementById("password").value.trim();
    var phone_input = document.getElementById("phone").value;
    var bloodGroup_input = document.getElementById("bloodGroup").value;
    var availability_input = document.getElementById("availability").value;
    var gender_input = document.getElementById("gender").value;
    var address_id_input = document.getElementById("address_id").value;
    var door_No_input = document.getElementById("door_No").value;
    var street_input = document.getElementById("street").value;
    var city_input = document.getElementById("city").value;
    var state_input = document.getElementById("state").value;
    var pincode_input = document.getElementById("pincode").value;

    let user = {
        id: user_id,
        firstName: firstName_input,
        lastName: lastName_input,
        email: email_input,
        password: password_input,
        phone: phone_input,
        bloodGroup: bloodGroup_input,
        availabilty: availability_input,
        gender: gender_input,
        address: {
            id: address_id_input,
            door_No: door_No_input,
            street: street_input,
            city: city_input,
            state: state_input,
            pincode: pincode_input
        }
    };

    fetch("http://localhost:8080/update", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.status === 302) {
                return response.json();
            } 
            else {
                throw new Error("Updation Not Successful");
            }
            
        })
        .then(data => {
            alert("User profile updated successfully");
            window.location.href = "http://127.0.0.1:5502/project/html/usermain.html";
            console.log(data);
        })
        .catch(error => {
            console.error("Error", error);
            alert("An error occurred while submitting");
        });
});
