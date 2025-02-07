
function inputValidation(event){
    const input = event.target;
    const divMensajeError = document.querySelector(`div[data-input-error="${input.id}"]`);

    const errorMsgs = {
      "inputName":"El nombre debe comenzar con mayuscula y NO contener caracteres especiales ni numeros",
      "inputLastName": "El apellido debe comenzar con mayuscula y NO contener caracteres especiales ni numeros",
      "inputEmail": "El correo no es válido",
      "inputPassword": "Minimo 8 caracteres, al menos una letra mayuscula, una minuscula y un numero",
    }

    if(input.validity.valueMissing){
      input.classList.add("is-invalid");
      divMensajeError.textContent = "Campo requerido";
    } else if(input.validity.patternMismatch){
      input.classList.add("is-invalid");
      divMensajeError.textContent = errorMsgs[input.id] ? errorMsgs[input.id]: "Ingresa el contenido requerido";
    } else if(input.validity.typeMismatch){
      input.classList.add("is-invalid");
      divMensajeError.textContent = "Ingresa el contenido requerido";
    } else if(input.validity.valid){
      input.classList.remove("is-invalid");
    }
  }





function diseasesToggle(){
  const select = document.getElementById('diseasesSelect');
  select.disabled = !select.disabled;
};

function removeDisease(event){
  const diseaseNo = event.target;

  if(diseaseNo.checked){
    document.getElementById('selectedDiseases').innerHTML = '';
  }
  diseasesToggle();

}


document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a"); // Select all links in the document
  const userID = localStorage.getItem("userID");

  links.forEach(link => {
    if (!userID && (link.href.includes("/app/pages/schedule_appointment/sched_appointment.html") ||
                    link.href.includes("/app/pages/awards/awards.htm") ||
                    link.href.includes("/app/pages/profile/profile.htm"))) {
      link.addEventListener("click", event => {
        event.preventDefault(); // Prevent default action of the link
        alert("Debe iniciar sesión"); // Show the alert
        link.style.pointerEvents = "none"; // Disable further clicking
        link.style.opacity = "0.5"; // Optional: visually indicate the link is disabled
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const userID = localStorage.getItem("userID");
  const loginLink = document.getElementById("login-link");
  const logoutBtn = document.getElementById("logoutBtn_D");

  console.log("UserID in localStorage:", userID);

  // Handle the "Iniciar sesión" link behavior (if logged in)
  if (userID) {
    // Disable "Iniciar sesión" if the user is already logged in
    loginLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevents navigation
      alert("Usted ya ha iniciado sesión.");
    });
    loginLink.classList.add("disabled");
    loginLink.setAttribute("aria-disabled", "true");
    loginLink.style.pointerEvents = "none"; // Disable interaction

    // Enable "Cerrar sesión" button if the user is logged in
    logoutBtn.addEventListener("click", () => {
      // Your logout logic here
      alert("Sesion cerrada. ¡Hasta luego!");
      localStorage.removeItem("userID"); // Example: clear user data
      window.location.reload(); // Optionally, refresh the page after logout
    });
  } else {
    // If not logged in, disable "Cerrar sesión" button
    logoutBtn.addEventListener("click", (event) => {
      event.preventDefault(); // Prevents the default action
      alert("No ha iniciado sesión.");
    });

    logoutBtn.disabled = true; // Disable button interaction
    logoutBtn.style.opacity = "0.5"; // Optionally, visually disable button
  }
});




