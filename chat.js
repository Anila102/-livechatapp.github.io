const firebaseConfig = {
    apiKey: "AIzaSyAwxX11eySVJ0hYtG_ZBI3zeHvi2F_9fBM",
    authDomain: "chat-f9d36.firebaseapp.com",
    projectId: "chat-f9d36",
    storageBucket: "chat-f9d36.appspot.com",
    messagingSenderId: "676820828616",
    appId: "1:676820828616:web:6d4c4f1bc344d854e1c0fd",
    measurementId: "G-5Y83J6G8QJ"
};
firebase.initializeApp(firebaseConfig);



// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         var uid = user.uid;
//         // console.log(user);
//         console.log("log in");
 

//     }
//     else {
//         console.log("logout")
//     }
// });




function signUp() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    console.log(email + password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            window.location.href="index.html"
      

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
}


function logOut() {

    firebase.auth().signOut().then(() => {
        window.location.href="index.html"
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}



function loggedIn() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            window.location.href="chatBox.html"
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}


const auth = firebase.auth();
const database = firebase.database();


auth.onAuthStateChanged((user) => {
  console.log(user)
  if (user) {
        database.ref("users/" + user.uid).update({
            email: user.email
        })


     setMessage();
        console.log("login")
      
    }
    else {
        console.log("logout")
    }
});




const setMessage=()=>{
    const databaseRef=database.ref("messages");

 databaseRef.on("child_added", (data)=>{
        createElementsForMessages(data.val());

    })


}


const sendMessage=()=>{
    let message = document.getElementById('type').value;
  console.log(message);
  const user = auth.currentUser.email;
  const databaseRef = database.ref('messages');
  databaseRef.push({
    user, message
  });
}

const createElementsForMessages=(childData)=>{

 
    const chatBox = document.getElementById('chatBox');
    const messageBox= document.createElement("div");
    const message=document.createElement("div");
    message.innerHTML=childData.message;
    const senderChildDiv=document.createElement("div");
    const currentUser = document.createElement('div');
    const userEmail = auth.currentUser.email;

    if (userEmail === childData.user) {
        currentUser.innerHTML = "You";
        currentUser.classList.add("senderUser");
        messageBox.classList.add("senderBox");
        message.classList.add("sender");
    }
    else{
        currentUser.innerHTML=childData.user;
        currentUser.classList.add("receiverUser");
        messageBox.classList.add("receiverBox");
        message.classList.add("receiver");
    }

    senderChildDiv.append(currentUser);
    senderChildDiv.append(message);
    messageBox.append(senderChildDiv);
    chatBox.append(messageBox);




}
