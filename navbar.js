import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();

const navLinks = document.getElementById("navLinks");
const loginLink = document.getElementById("loginLink");
const signupLink = document.getElementById("signupLink");
const logoutLink = document.getElementById("logoutLink");
const postJobLink = document.getElementById("postJobLink");

// Hamburger toggle for mobile
const hamburger = document.getElementById("hamburger");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Check auth state
onAuthStateChanged(auth, user => {
  if (user) {
    // User is logged in
    loginLink.style.display = "none";
    signupLink.style.display = "none";
    logoutLink.style.display = "inline-block";
    
    // Only allow verified users to post jobs
    if (user.emailVerified) { // optional extra check
      postJobLink.href = "post-job.html";
    } else {
      postJobLink.href = "verify.html";
    }
  } else {
    // Not logged in
    loginLink.style.display = "inline-block";
    signupLink.style.display = "inline-block";
    logoutLink.style.display = "none";
    postJobLink.href = "signup.html";
  }
});

// Logout function
logoutLink.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (err) {
    alert("Error logging out: " + err.message);
  }
});
