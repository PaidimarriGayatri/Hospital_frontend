let admin_email = localStorage.getItem("email");

async function profile() {
    try {
        let response = await fetch(`http://localhost:8080/fetchspecialistByemail?email=${admin_email}`, {
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

let specialist_id = document.getElementById("specialist_id");
let firstNameElement = document.getElementById("firstName");
let lastNameElement = document.getElementById("lastName");
let emailElement = document.getElementById("email");
let passwordElement = document.getElementById("password");
let phoneElement = document.getElementById("phone");
let specialization_input = document.getElementById("specialization");
let experience_input = document.getElementById("experience");
let gender_input = document.getElementById("gender");
let age_input = document.getElementById("age");
let fees_input = document.getElementById("fees");
let address_id = document.getElementById("address_id")
let door_No = document.getElementById("door_No")
let street = document.getElementById("street")
let city = document.getElementById("city")
let state = document.getElementById("state")
let pincode = document.getElementById("pincode")

const set = (x) => {
    specialist_id.value = x.id;
    firstNameElement.value = x.firstName;
    lastNameElement.value = x.lastName;
    emailElement.value = x.email;
    passwordElement.value = x.password;
    phoneElement.value = x.phone;
    specialization_input.value = x.specialization;
    experience_input.value = x.experience;
    gender_input.value = x.gender;
    age_input.value = x.age;
    fees_input.value = x.fees;
    address_id.value = x.address.id;
    door_No.value = x.address.door_No;
    street.value = x.address.street;
    city.value = x.address.city;
    state.value = x.address.state;
    pincode.value = x.address.pincode;
};

profile();


let submit = document.getElementsByClassName("submit")
console.log(submit[0]);

submit[0].addEventListener("click", (e) => {
    console.log(e.target);
    e.preventDefault()

    var user_id = document.getElementById("specialist_id").value
    var firstName_input = document.getElementById("firstName").value
    var lastName_input = document.getElementById("lastName").value
    var email_input = document.getElementById("email").value
    var password_input = document.getElementById("password").value.trim()
    var phone_input = document.getElementById("phone").value;
    var gender_input=document.getElementById("gender").value;
    var specialization_input = document.getElementById("specialization").value;
    var experience_input = document.getElementById("experience").value;
    var age_input = document.getElementById("age").value;
    var fees_input = document.getElementById("fees").value;
    var address_id_input = document.getElementById("address_id").value;
    var door_No_input = document.getElementById("door_No").value;
    var street_input = document.getElementById("street").value;
    var city_input = document.getElementById("city").value;
    var state_input = document.getElementById("state").value;
    var pincode_input = document.getElementById("pincode").value;

    let admin = {
        id: user_id,
        firstName: firstName_input,
        lastName: lastName_input,
        email: email_input,
        password: password_input,
        phone: phone_input,
        gender:gender_input,
        specialization: specialization_input,
        experience: experience_input,
        age: age_input,
        fees: fees_input,
        address: {
            id: address_id_input,
            door_No: door_No_input,
            street: street_input,
            city: city_input,
            state: state_input,
            pincode: pincode_input
        }
    }

    let response = fetch("http://localhost:8080/updatespecialist", {
        method: "PUT",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(admin)
    })

        .then(response => {
            if (response.status == 302) {
                return response.json()
            } else {
                throw new Error("Updation Not Sucessfull")
            }
        })
        .then(data => {
            alert("Specailist profile updated Sucessfully")
            window.location.href = "http://127.0.0.1:5502/project/html/admin_main.html"
            console.log(data)
        })
        .catch(error => {
            console.error("Error", error);
            alert("An error occured while Submitting");
        });

 

})
