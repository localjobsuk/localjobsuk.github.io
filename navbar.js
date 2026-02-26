// Hamburger toggle for mobile
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Firebase auth for dynamic links
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
const auth = getAuth();

const userLinks = document.getElementById("userLinks");

onAuthStateChanged(auth, user => {
  if(user){
    userLinks.innerHTML = `
      <span style="margin-left:10px;">Hi, ${user.displayName || 'User'}</span>
      <a href="#" onclick="logout()" class="btn" style="margin-left:10px;">Logout</a>
    `;
  } else {
    userLinks.innerHTML = `
      <a href="login.html" class="btn" style="margin-left:10px;">Login</a>
    `;
  }
});

window.logout = async () => {
  await signOut(auth);
  window.location.href = "index.html";
};
