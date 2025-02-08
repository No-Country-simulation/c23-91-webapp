function inputValidation(event) {
  const input = event.target;
  const divMensajeError = document.querySelector(
    `div[data-input-error="${input.id}"]`
  );

  const errorMsgs = {
    inputName:
      "El nombre debe comenzar con mayuscula y NO contener caracteres especiales ni numeros",
    inputLastName:
      "El apellido debe comenzar con mayuscula y NO contener caracteres especiales ni numeros",
    inputEmail: "El correo no es válido",
    inputPassword:
      "Minimo 8 caracteres, al menos una letra mayuscula, una minuscula y un numero",
  };

  if (input.validity.valueMissing) {
    input.classList.add("is-invalid");
    divMensajeError.textContent = "Campo requerido";
  } else if (input.validity.patternMismatch) {
    input.classList.add("is-invalid");
    divMensajeError.textContent = errorMsgs[input.id]
      ? errorMsgs[input.id]
      : "Ingresa el contenido requerido";
  } else if (input.validity.typeMismatch) {
    input.classList.add("is-invalid");
    divMensajeError.textContent = "Ingresa el contenido requerido";
  } else if (input.validity.valid) {
    input.classList.remove("is-invalid");
  }
}

function diseasesToggle() {
  const select = document.getElementById("diseasesSelect");
  select.disabled = !select.disabled;
}

function removeDisease(event) {
  const diseaseNo = event.target;

  if (diseaseNo.checked) {
    document.getElementById("selectedDiseases").innerHTML = "";
  }
  diseasesToggle();
}

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a");
  const userID = localStorage.getItem("userID");

  links.forEach((link) => {
    if (
      !userID &&
      (link.href.includes(
        "/app/pages/schedule_appointment/sched_appointment.html"
      ) ||
        link.href.includes("/app/pages/awards/awards.htm") ||
        link.href.includes("/app/pages/profile/profile.htm"))
    ) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Debe iniciar sesión");
        link.style.pointerEvents = "none";
        link.style.opacity = "0.5";
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const userID = localStorage.getItem("userID");
  const loginLink = document.getElementById("login-link");
  const logoutBtnD = document.getElementById("logoutBtn_D");


  if (userID && loginLink) {
    loginLink.addEventListener("click", (event) => {
      if (userID) {
        event.preventDefault();
        alert("Usted ya ha iniciado sesión.");
      }
    });

    if (userID) {
      loginLink.classList.add("disabled");
      loginLink.setAttribute("aria-disabled", "true");
      loginLink.style.pointerEvents = "auto";
    }
  }

  if (logoutBtnD) {
    if (!userID) {
      logoutBtnD.addEventListener("click", (event) => {
        event.preventDefault();
        alert("No ha iniciado sesión.");
      });
      logoutBtnD.disabled = true;
      logoutBtnD.style.opacity = "0.5";
    }
  }
});
