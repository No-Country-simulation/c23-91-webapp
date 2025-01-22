document.addEventListener('click', (event) => {
    const dropdown = document.querySelector('.dropdown-menu');
    const userMenuButton = document.getElementById('userMenuButton');

    if (!userMenuButton.contains(event.target) && dropdown.classList.contains('show')) {
        userMenuButton.click();
    }
});


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

  
  const logoutBtn = document.getElementById('logoutBtn')
  logoutBtn.addEventListener('click', (event) => {
    const confirmation = confirm('¿Está seguro de que desea cerrar sesión?');
    if (confirmation) {
        localStorage.removeItem('token');
        alert('Ha cerrado su sesión');
        const absoluteUrl = `${window.location.origin}/app/index.html`;
        window.location.href = absoluteUrl;
    }
});


/*

document.addEventListener("DOMContentLoaded", function() {
logoutBtn.addEventListener('click', () => {
    fetch('/logout', {
    method: 'POST', credentials: 'include' })
        .then(() => {
            localStorage.removeItem('token');
            alert('Ha cerrado su sesión');
            const absoluteUrl = `${window.location.origin}/app/index.html`;
        window.location.href = absoluteUrl;
        })
        .catch((error) => console.error('Error logging out:', error));
});
)};


*/

