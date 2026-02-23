import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
const auth = getAuth();

window.logout = async function () {
  await signOut(auth);
  window.location.href = "login.html";
};
