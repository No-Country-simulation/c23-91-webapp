function inputValidation(event) {
    const input = event.target;
    const divMensajeError = document.querySelector(`div[data-input-error="${input.id}"]`);

    const errorMsgs = {
        email: "El correo no es válido",
        password: "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo",
    }

    if (input.validity.valueMissing) {
        input.classList.add("is-invalid");
        divMensajeError.textContent = "Campo requerido";
    } else if (input.validity.patternMismatch) {
        input.classList.add("is-invalid");
        divMensajeError.textContent = errorMsgs[input.id] ? errorMsgs[input.id] : "Ingresa el contenido requerido";
    } else if (input.validity.typeMismatch) {
        input.classList.add("is-invalid");
        divMensajeError.textContent = "Ingresa el contenido requerido";
    } else if (input.validity.valid) {
        input.classList.remove("is-invalid");
        divMensajeError.textContent = "";
    }
}

const togglePasswordButton = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

// Add event listener for the password toggle
togglePasswordButton.addEventListener('click', () => {
    // Toggle the input type between 'password' and 'text'
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;

    togglePasswordButton.innerHTML = type === 'password'
      ? '<i class="bi bi-eye"></i>'
      : '<i class="bi bi-eye-slash"></i>';
});

