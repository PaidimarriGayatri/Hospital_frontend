let user_email = localStorage.getItem("email");

async function profile() {
    try {
        let response = await fetch(`http://localhost:8080/fetchByEmail?email=${user_email}`, {
            method: "GET",
        });
        let x = await response.json();
        if (response.status === 302) {
            localStorage.setItem("id", x.data.id);
            console.log(x.data.id);
        } else if (response.status === 400 || response.status === 404) {
            throw new Error("Error");
        } else {
            window.alert(x.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
profile();


let verify = document.getElementsByClassName("submit")
console.log(verify[0]);

let otp = localStorage.getItem('otp');

let check_otp = document.getElementById('otp_check');
verify[0].addEventListener("click", (e) => {
    e.preventDefault();
    if (check_otp.value.trim() === otp) {
        // localStorage.setItem("id", user_id)
        window.location.href = "http://127.0.0.1:5502/project/html/user_cpwd.html";
    } else {
        alert("invalid otp")
    }

})