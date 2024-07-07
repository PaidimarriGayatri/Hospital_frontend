let btn = document.getElementById("btn");
console.log(btn);

btn.addEventListener("click", () => {
    let ol = document.getElementsByTagName("ol");
    console.log(ol);
    console.log(ol[0]);
    let display = ol[0].classList.toggle("block");
    if (display) {
        ol[0].style.translate = "190px";
        ol[0].style.transitionDuration = "1s";
    } else {
        ol[0].style.translate = "1px";
    }
});

let del = document.getElementsByClassName("delete");
console.log(del);

let specialist_email = localStorage.getItem("email");

let specialistid = ''; // Declare id globally

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

const set = (e) => {
    specialistid += e.id;
    localStorage.setItem("specialistid", e.id);
    console.log(specialistid);
}
let specialist_id = localStorage.getItem("specialistid")
profile()

del[0].addEventListener("click", async (e) => {
    console.log(e.target);
    e.preventDefault();
    try {
        let response = await fetch(`http://localhost:8080/deletespecialist?id=${specialist_id}`, {
            method: "DELETE",
        });
        let x = await response.json();
        if (response.status === 302) {
            alert("User account deleted successfully")
            window.location.href = "http://127.0.0.1:5502/project/html/specialist_register.html"
        } else if (response.status === 400 || response.status === 404) {
            throw new Error("Error");
        } else {
            window.alert(x.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
})