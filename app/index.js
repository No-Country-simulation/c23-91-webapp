
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

const userID = localStorage.getItem("userID");

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a"); // Select all links in the document
  const userID = localStorage.getItem("userID");

  links.forEach(link => {
    if (!userID && (link.href.includes("/app/pages/schedule_appointment/sched_appointment.html") ||
                    link.href.includes("/app/pages/awards/awards.htm") ||
                    link.href.includes("/app/pages/profile/profile.htm")))
    {
      link.addEventListener("click", event => {
        event.preventDefault();
        link.style.pointerEvents = "none";
        link.style.opacity = "0.5";
      });
    }
  });
});


