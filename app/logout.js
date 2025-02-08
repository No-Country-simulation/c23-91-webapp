// Function to handle the logout process

function logout() {
  const confirmation = confirm("¿Está seguro de que desea cerrar sesión?");
  if (confirmation) {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    alert("Ha cerrado su sesión");
    const absoluteUrl = `${window.location.origin}/app/index.html`;
    window.location.href = absoluteUrl;
  }
}

// Add event listener for mobile version
const logoutBtnM = document.getElementById("logoutBtn_M");
if (logoutBtnM) {
  logoutBtnM.addEventListener("click", logout);
}

// Add event listener for desktop version
const logoutBtnD = document.getElementById("logoutBtn_D");
if (logoutBtnD) {
  logoutBtnD.addEventListener("click", logout);
}
