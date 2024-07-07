
let submit = document.getElementsByClassName("submit")
console.log(submit[0]);
var specialist_id = localStorage.getItem("specialistid")
console.log(specialist_id);

submit[0].addEventListener("click", (e) => {
    console.log(e.target);
    e.preventDefault()


    var name_input = document.getElementById("name").value
    var website_input = document.getElementById("website").value
    var email_input = document.getElementById("email").value
    var phoneNumber_input = document.getElementById("phoneNumber").value.trim()
    var pinocde_input = document.getElementById("pincode").value.trim()

    let hospital = {
        name: name_input,
        website: website_input,
        email: email_input,
        phoneNumber: phoneNumber_input,
        pincode: pinocde_input
    }
    if (name_input != '' && website_input != '' && email_input != '' && phoneNumber_input != '' && pinocde_input != '') {
        fetch(`http://localhost:8080/hospital?specialist_id=${specialist_id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(hospital)
        })
            .then(Response => {
                console.log(Response.status);
                if (Response.status === 201) {
                    window.location.href = "http://127.0.0.1:5502/project/html/admin_main.html"
                    return Response.json()
                } else {
                    throw new Error("Registration Not Sucessfull")
                }
            })
            .then(data => {
                alert("Form Submitted Sucessfully")
                console.log(data)
            })
            .catch(error => {
                console.error("Error", error);
                alert("Specialist is not an admin");
            });
    } else {
        alert("Password Mismatch")
        return;
    }


    //document.getElementById('form').reset();

})