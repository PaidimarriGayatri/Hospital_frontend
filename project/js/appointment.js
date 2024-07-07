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
            window.location.href = "http://127.0.0.1:5502/project/html/login.html"
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
        // Promise.all{[]}
        let response = await fetch(`http://localhost:8080/fetchAll`, {
            method: "GET"
        });
        let details = document.getElementsByClassName("det");
        let x = await response.json();
        if (x.status === 302) {
            let dataLengthCount = 0;
            for (let i = 0; i < x.data.length; i++) {
                let content = `
                <div class="details">
                <div class="detail" >
                    <div>
                        <p id="firstName">First Name : <span>${x.data[i].firstName}</span>
                            <span id="name"></span>
                        </p>
                        <p id="lastName">Last Name :<span> ${x.data[i].lastName} <span><span id="lname"></span>
                        </p>
                        <p id="bloodGroup">Specialization : <span>${x.data[i].specialization}</span> <span id="blood"></span>
                        </p>
                        <p id="availabilty">Experience :<span> ${x.data[i].experience} </span><span id="avail"></span>
                        </p>
                    </div>
                    <div>
                        <p id="email_id">Email :<span> ${x.data[i].email} </span><span id="em"></span>
                        </p>
                    <p id="fees">Fees :<span> ${x.data[i].fees} </span><span id="fees"></span>
                    </p>
                    <p id="city">City : <span>${x.data[i].address.city} </span><span id="city"></span>
                    </p>
                </div>
                </div>
                <div>
                    <div class="buttons">
                        <button class="btn"><span></span><p data-start="good luck!" data-text="Appointment" data-title="Specialist" onclick="appointment('${x.data[i].id}','${x.data[i].fees}')"></p></button>
                    </div>
            </div>

                </div>
                `
                    ;
                details[0].innerHTML += content;
                dataLengthCount++;
            }
            console.log("Data length is present " + dataLengthCount + " times.");
        }
    } catch (error) {
        console.error(error);
    }
}
display();

async function appointment(specialistId, fee) {
    window.localStorage.setItem("fees", fee)
    window.localStorage.setItem("specialistid", specialistId)
    window.location.href = "http://127.0.0.1:5502/project/html/slotbook.html"
}


// async function appointment(index, specialistId) {
//     let dateTimeInput = document.getElementById(`date_${index}`).value;

//     let selectedDate = new Date(dateTimeInput);

//     let year = selectedDate.getFullYear();
//     let month = selectedDate.getMonth() + 1;
//     let day = selectedDate.getDate();
//     let hour = selectedDate.getHours();
//     let minute = selectedDate.getMinutes();
//     let second = selectedDate.getSeconds();

//     let appointmentDate = {
//         "date": "2024-02-02",
//         "appointmentSlots": [{
//             "time": "12:12:12",
//             "payment": {
//                 "model": "gpay",
//                 "fees": 1200
//             }
//         }]
//     };
//     console.log(year + " " + month + " " + day + " ");
//     console.log(user_id + " " + specialistId);
//     try {
//         let response = await fetch(`http://localhost:8080/date?userId=User_00001&specialistId=Specialist_00001`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'Application/json'
//             },
//             body: JSON.stringify(appointmentDate)
//         });

//         if (response.status === 302) {
//             alert("Booked!");
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }

let search_input = document.getElementById("sea_input")
// console.log(search_input);

// let submit = document.getElementsByClassName("submit")

// submit[0].addEventListener("click", async (e) => {
//     console.log("hello");
//     console.log(search_input.value);
//     try {
//         let response = await fetch(`http://localhost:8080/fetchByNamespecialist?firstName=${search_input.value}`, {
//             method: "GET"
//         });
//         // let x = await response.json();
//         // console.log(x.data);
//         // console.log(x.status);
//         let details = document.getElementsByClassName("det");
//         let x = await response.json();
//         if (x.status === 302) {
//             details[0].innerHTML = '';
//             for (let i = 0; i < x.data.length; i++) {
//                 let content = `
//                 <div class="details">
//                 <div class="detail" >
//                     <div>
//                         <p id="firstName">First Name : <span>${x.data[i].firstName} </span>
//                             <span id="name"></span>
//                         </p>
//                         <p id="lastName">Last Name : <span>${x.data[i].lastName} </span><span id="lname"></span>
//                         </p>
//                         <p id="bloodGroup">Specialization : <span>${x.data[i].specialization}</span> <span id="blood"></span>
//                         </p>
//                         <p id="availabilty">Experience :<span> ${x.data[i].experience} </span><span id="avail"></span>
//                         </p>
//                     </div>
//                     <div>
//                         <p id="email_id">Email : <span>${x.data[i].email} </span><span id="em"></span>
//                         </p>
//                         <p id="fees">Fees : <span>${x.data[i].fees} </span><span id="fees"></span>
//                         </p>
//                     </div>
//                 </div>
//                 <div>
//                     <button class="msg">
//                         <div class="svg-wrapper-1">
//                             <div class="svg-wrapper">
//                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
//                                     <path fill="none" d="M0 0h24v24H0z"></path>
//                                     <path fill="currentColor"
//                                         d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z">
//                                     </path>
//                                 </svg>
//                             </div>
//                         </div>
//                         <span>Send</span>
//                     </button>
//                 </div>
//                 </div>
//                 `
//                     ;
//                 details[0].innerHTML += content;
//             }
//         }
//     } catch (error) {
//         console.error(error);
//     }
// })








let submit = document.getElementsByClassName("submit")

submit[0].addEventListener("click", async (e) => {
    console.log(search_input.value);
    try {
        let fetchByNameSpecialist = fetch(`http://localhost:8080/fetchByNamespecialist?firstName=${search_input.value}`);
        let fetchBySpecializationspecialist = fetch(`http://localhost:8080/fetchBySpecializationspecialist?specialization=${search_input.value}`);
        let fetchByCityspecialist = fetch(`http://localhost:8080/fetchByCityspecialist?city=${search_input.value}`);
        let fetchByExperiencespecialist = fetch(`http://localhost:8080/fetchByExperiencespecialist?experience=${search_input.value}`);


        let responses = await Promise.all([fetchByNameSpecialist, fetchBySpecializationspecialist, fetchByCityspecialist, fetchByExperiencespecialist]);

        responses.forEach(async (response) => {
            if (response.status == 302) {

                let x = await response.json();
                let details = document.getElementsByClassName("det");

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
                            <p id="bloodGroup">Specialization : <span>${x.data[i].specialization}</span> <span id="blood"></span>
                            </p>
                            <p id="availabilty">Experience :<span> ${x.data[i].experience} </span><span id="avail"></span>
                            </p>
                        </div>
                        <div>
                            <p id="email_id">Email : <span>${x.data[i].email} </span><span id="em"></span>
                            </p>
                            <p id="fees">Fees : <span>${x.data[i].fees} </span><span id="fees"></span>
                            </p>
                            <p id="city">City : <span>${x.data[i].address.city} </span><span id="city"></span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <div class="buttons">
                            <button class="btn"><span></span><p data-start="good luck!" data-text="Appointment" data-title="Specialist" onclick="appointment('${x.data[i].id}')"></p></button>
                        </div>  
                    </div>
                    </div>
                    `
                            ;
                        details[0].innerHTML += content;
                    }
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
})
