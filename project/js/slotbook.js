
// let pay_btn = document.getElementsByClassName("payment-btn")

// console.log(pay_btn[0].firstElementChild.textContent);


//date
let date = document.getElementById("date")
console.log(date);


//time
let time
let timeButtons = document.getElementsByClassName("timeButton");;
for (let i = 0; i < timeButtons.length; i++) {
    timeButtons[i].addEventListener('click', (e) => {
        time = timeButtons[i].textContent
        timeButtons[i].style.backgroundColor = "MediumSeaGreen"
        timeButtons[i].style.border = "MediumSeaGreen"
    })
}
async function alreadybooked() {
    let response = await fetch(`http://localhost:8080/fetchslot`, {
        method: "GET",
        "Content-Type": "Application/json"
    });
    let x = await response.json();
    if (x.status === 302) {
        for (let i = 0; i < x.data.length; i++) {
            if (x.data[i].date == date.value) {
                for (let j = 0; j < x.data[i].appointmentSlots.length; j++) {
                    // console.log(x.data[i].appointmentSlots[j].time);
                    let btn = document.getElementsByClassName("timeButton");
                    for (let k = 0; k < btn.length; k++) {
                        if (btn[k].textContent === x.data[i].appointmentSlots[j].time) {
                            btn[k].style.backgroundColor = 'grey'
                            btn[k].style.border = '1px solid grey'
                            btn[k].disabled = true;
                        }
                    }
                }
            }
        }
    }
}

//Payment Mode
let payment;
// let payments = document.getElementsByClassName("paymentMode");
// for (let i = 0; i < payments.length; i++) {
//     payments[i].addEventListener('change', (e) => {
//         payment = payments[i].value;
//     });
// }

let payments = document.querySelectorAll('.btn');
payments.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        btn.style.padding = ' 2px 35px'
        btn.style.transition = '100ms'
        payment = btn.nextElementSibling.textContent;
        console.log(payment);
    });
});

//Fees
let userId = localStorage.getItem("id")
let specialistId = localStorage.getItem("specialistid")
let fee = document.getElementById("fees")
let bill = localStorage.getItem("fees");
fee.value = bill;
console.log(fee.value);


let btn = document.getElementById("btn")
btn.addEventListener("click", async (e) => {
    e.preventDefault();
    let appointmentDate = {
        "date": date.value,
        "appointmentSlots": [{
            "time": time,
            "payment": {
                "mode": payment,
                "fees": fee.value
            }
        }]
    }
    if (date.value === '') {
        alert("please select the date")
        return
    }
    if (time === undefined) {
        alert("please select the time")
        return
    }
    if (payment === undefined) {
        alert("please select the payment Mode")
        return
    }
    console.log(appointmentDate);
    console.log(date.value);
    let response = await fetch(`http://localhost:8080/date?userId=${userId}&specialistId=${specialistId}`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(appointmentDate)
    })
    let x = await response.clone().json();
    if (x.status === 201) {
        alert("Slot booked successfully.")
        window.location.href = "http://127.0.0.1:5502/project/html/usermain.html";
        return response.json();
    }
    else if (response.status === 400 && response.status === 404) {
        window.alert("Please enter the correct EMAIL Id and PASSWORD...");
    }
    else {
        window.alert(x.message + "😒😒😒");
    }
    // .then(response => {
    //     if (response.status === 201) {
    //         return response.json()
    //     } else {
    //         throw new Error("Slot is not booked")
    //     }
    // })
    // .then(data => {
    //     alert("Form Submitted Sucessfully")
    //     window.location.href = "http://127.0.0.1:5501/project/html/login.html"
    //     console.log(data)
    // })
    // .catch(error => {
    //     console.error("Error", error);
    //     alert("An error occured while Submitting");
    // });
}
)


