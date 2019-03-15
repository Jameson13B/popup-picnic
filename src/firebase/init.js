import firebase from "firebase";
import firebaseui from "firebaseui";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDEJM4G4Palg7xJukY613ULdhSdt8KidoM",
  authDomain: "popup-picnic.firebaseapp.com",
  databaseURL: "https://popup-picnic.firebaseio.com",
  projectId: "popup-picnic",
  storageBucket: "popup-picnic.appspot.com",
  messagingSenderId: "443396903412"
};
const firebaseApp = firebase.initializeApp(config);

// Initialize the FirebaseUI Widget using Firebase.
export const ui = new firebaseui.auth.AuthUI(firebaseApp.auth());
// Configure the FirebaseUI Widget
export const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      if (authResult.additionalUserInfo.isNewUser === true) {
        // make call to server /register
        console.log(authResult.user.uid);
      } else {
        // make call to server login
        console.log(authResult.user.uid);
      }
      // Uncomment line below when v-if is on login button
      // document.getElementById("login-btn").style.display = "inline-block";
      document.getElementById("firebaseui-auth-container").style.display =
        "none";
      return false;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the login button.
      document.getElementById("login").style.display = "none";
      document.getElementById("firebaseui-auth-container").style.display =
        "block";
    }
  },
  signInSuccessUrl: "/",
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    }
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  // Terms of service url.
  tosUrl: "<your-tos-url>",
  // Privacy policy url.
  privacyPolicyUrl: "<your-privacy-policy-url>"
};
