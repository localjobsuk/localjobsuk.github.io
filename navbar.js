firebase.auth().onAuthStateChanged(async (user) => {
  const authLink = document.getElementById("auth-link");
  const creditsDisplay = document.getElementById("credits-display");
  const ownerDashboardLink = document.getElementById("owner-dashboard-link");
  const adminDashboardLink = document.getElementById("admin-dashboard-link");

  if (user) {
    authLink.textContent = "Logout";
    authLink.onclick = () => firebase.auth().signOut().then(() => location.reload());

    // Load user credits
    const userDoc = await firebase.firestore().collection("users").doc(user.uid).get();
    const userData = userDoc.data();
    creditsDisplay.textContent = `Credits: ${userData.credits || 0}`;

    // Show owner dashboard if user owns jobs
    ownerDashboardLink.style.display = "inline";

    // Show admin dashboard if custom claim
    const token = await user.getIdTokenResult();
    if (token.claims.admin) adminDashboardLink.style.display = "inline";

  } else {
    authLink.textContent = "Login";
    authLink.href = "login.html";
    creditsDisplay.textContent = "";
  }
});
