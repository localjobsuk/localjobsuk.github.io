// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Firebase auth state handling
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
const auth = getAuth();

const loginLink = document.querySelector(".nav-login");
const signupLink = document.querySelector(".nav-signup");
const logoutLink = document.querySelector(".nav-logout");
const userSpan = document.querySelector(".nav-user");
const postJobLink = document.querySelector(".nav-post-job");

// Redirect non-logged-in users trying to post a job
postJobLink.addEventListener("click", (e) => {
  if (!auth.currentUser) {
    e.preventDefault();
    window.location.href = "signup.html";
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in
    loginLink.style.display = "none";
    signupLink.style.display = "none";
    logoutLink.style.display = "inline-block";
    userSpan.style.display = "inline-block";
    userSpan.textContent = user.displayName || user.email;

  } else {
    // User is logged out
    loginLink.style.display = "inline-block";
    signupLink.style.display = "inline-block";
    logoutLink.style.display = "none";
    userSpan.style.display = "none";
  }
});

// Logout function
window.logout = async function() {
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (err) {
    alert("Error logging out: " + err.message);
  }
};
