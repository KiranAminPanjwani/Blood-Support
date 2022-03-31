console.log("Connected");

// FireBase 

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { getFirestore, doc, getDoc, onSnapshot, collection, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8RMkayDqpQZN1wLz63b2VI-_fWnidVoQ",
    authDomain: "donate-blood-7e4ec.firebaseapp.com",
    projectId: "donate-blood-7e4ec",
    storageBucket: "donate-blood-7e4ec.appspot.com",
    messagingSenderId: "482764734847",
    appId: "1:482764734847:web:cf8ab52b7fe4f3ae8f1a4a",
    measurementId: "G-FYZY495R9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const fs = getFirestore();


// retriving username
onAuthStateChanged(auth, (patient) => {

    // console.log(users.uid)
    if (patient) {
        const username = document.getElementById("donername");
        const profilename = document.getElementById("donorprofilename");
        const donorname = document.getElementById("username");
        const donoremail = document.getElementById("usermail");

        // Donor Profile Details
        const name = document.getElementById("pname");
        const id = document.getElementById("patientID");
        const attendant = document.getElementById("aname");
        const phone = document.getElementById("phone");
        const email = document.getElementById("emailadd");
        const bloodgroup = document.getElementById("bloodgroup");
        const city = document.getElementById("city");
        const address = document.getElementById("address");
        const lasttransfusion = document.getElementById("lasttransfusion");

        const docRef = doc(fs, 'patients', patient.uid);

        onSnapshot(docRef, (def) => {

            // Patient Name
            username.innerHTML = def.data().Name;
            donorname.innerHTML = def.data().Name;
            profilename.innerHTML = def.data().Name;

            //Patient Email
            donoremail.innerHTML = def.data().Email;

            
            // Patient Information
            name.innerHTML = "<b>Patient Name: </b>"+ def.data().Name;
            id.innerHTML ="<b>Patient ID: </b>"+ def.data().ID;
            attendant.innerHTML ="<b>Attendant Name: </b>"+ def.data().Attendant;
            phone.innerHTML ="<b>Phone: </b>"+ def.data().Phone;
            email.innerHTML ="<b>Email: </b>"+ def.data().Email;
            bloodgroup.innerHTML ="<b>Blood Group: </b>"+ def.data().BloodGroup;
            city.innerHTML ="<b>City: </b>"+ def.data().City;
            address.innerHTML ="<b>Address: </b>"+ def.data().Address;
            lasttransfusion.innerHTML = "<b>Last Transfusion: </b> No transfusion yet";

        })
    }
    else {
        // doc.data() will be undefined in this case
        console.log("User not exist!");
    }
});


// Request Working
let Request = document.getElementsByClassName("request");

// History Of Donation
let bloodBank = ["Sahara","AMTF","Saylani","Hussaini","Indus"];

// Req Status Messsage
let msg = document.getElementsByClassName("statMsg");

for (let i = 0; i < Request.length; i++) {
    Request[i].addEventListener('click', () => {

          // Adding Blood bank requested in donor record
          onAuthStateChanged(auth, (userCredential) => {
            if (userCredential) {
                updateDoc(doc(fs, 'donors', userCredential.uid), {
                    BloodBank: bloodBank[i]

                }).then(() => {
                    console.log("updated");
                }).catch(err => {
                    console.log(err.message);
                })
            }
        })


       updateNotification();
    });

}


// Notifications
function updateNotification() {

    let numOfNotification = document.getElementById("notify");
    let notification = document.getElementById("updateNotice");
    let showNotif = document.getElementById("notifNo");
    let noticeMsg = document.getElementById("noticeMsg");

    let getNotificationNumber = localStorage.getItem("NoticeNumber");
    getNotificationNumber = parseInt(getNotificationNumber);


    if (getNotificationNumber) {
        localStorage.setItem("NoticeNumber", getNotificationNumber + 1);
        numOfNotification.innerHTML = getNotificationNumber + 1;
        notification.innerHTML = getNotificationNumber + 1;
        showNotif.innerHTML = getNotificationNumber + 1;
        numOfNotification.style.backgroundColor = "#ff646d";
        numOfNotification.style.display = "block";
        noticeMsg.style.display = "block";
    }
    else {
        localStorage.setItem("NoticeNumber", 1);
        numOfNotification.innerHTML = 1;
        notification.innerHTML = 1;
        showNotif.innerHTML = 1;
        numOfNotification.style.backgroundColor = "#ff646d";
        numOfNotification.style.display = "block";
        noticeMsg.style.display = "block";
    }
}



function showNotification() {
    let numOfNotification = document.getElementById("notify");
    let notification = document.getElementById("updateNotice");
    let showNotif = document.getElementById("notifNo");
    let noticeMsg = document.getElementById("noticeMsg");

    let getNotificationNumber = localStorage.getItem("NoticeNumber");
    getNotificationNumber = parseInt(getNotificationNumber);


    if (getNotificationNumber) {
        numOfNotification.innerHTML = getNotificationNumber;
        notification.innerHTML = getNotificationNumber;
        showNotif.innerHTML = getNotificationNumber;
        numOfNotification.style.backgroundColor = "#ff646d";
        noticeMsg.style.display = "block";
        numOfNotification.style.display = "block";
    }
    else {
        notification.innerHTML = 0;
        numOfNotification.innerHTML = 0;
        noticeMsg.style.display = "none";
    }
}

showNotification();


// Clear notification 

let clear = document.getElementById("clear");

clear.addEventListener('click', () => {

    let noticeMsg = document.getElementById("noticeMsg");
    let numOfNotification = document.getElementById("notify");
    let notification = document.getElementById("updateNotice");
    let showNotif = document.getElementById("notifNo");

    localStorage.setItem("NoticeNumber", 0);
    let getNotificationNumber = localStorage.getItem("NoticeNumber");
    getNotificationNumber = parseInt(getNotificationNumber);

    notification.innerHTML = "0";
    numOfNotification.style.display = "none";
    showNotif.style.display = "none";
    noticeMsg.style.display = "none";
});



//Checking if user is login or logout
onAuthStateChanged(auth, (donor) => {
    if (donor) {
        console.log("You're sign in in donateDashboard.html");
    }
    else {
       console.log("Your session is expired or you are log out");
        location = "patient.html";
    }
});




















///////////////////////////////////////////////// Logout /////////////////////////////////////////////////////////

let logOut = document.getElementById("logout");

logOut.addEventListener('click', (e)=> {
    e.preventDefault();
    signOut(auth).then(() => {
        console.log("Sucessfully logout!")
        location =  "donate.html";
      }).catch((error) => {
         consolr.log(error.message);
      });
})