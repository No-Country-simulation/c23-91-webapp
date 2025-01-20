const passwordInput = document.getElementById('inputPassword');
const togglePasswordButton = document.getElementById('togglePassword');

togglePasswordButton.addEventListener('click', () => {
  // Cambiar tipo de input
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;

  // Cambiar icono (opcional)
  togglePasswordButton.innerHTML = type === 'password' 
    ? '<i class="bi bi-eye"></i>'
    : '<i class="bi bi-eye-slash"></i>';
});
