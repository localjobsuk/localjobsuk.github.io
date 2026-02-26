// Use compat version (same as your other pages)
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    appId: "YOUR_APP_ID"
  });
}

const auth = firebase.auth();

document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      auth.signOut().then(() => {
        window.location.href = "login.html";
      });
    });
  }
});
