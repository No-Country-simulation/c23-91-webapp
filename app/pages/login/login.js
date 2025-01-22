const inputEmailEl = document.getElementById('inputEmail');
const passwordInput = document.getElementById('inputPassword');
const togglePasswordButton = document.getElementById('togglePassword');

togglePasswordButton.addEventListener('click', () => {

  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;

  // Toggle icon
  togglePasswordButton.innerHTML = type === 'password'
    ? '<i class="bi bi-eye"></i>'
    : '<i class="bi bi-eye-slash"></i>';
});

async function logUser(event) {
  event.preventDefault();

  const userData = {
    email: inputEmailEl.value,
    password: passwordInput.value,
  };

  try {

    const response = await fetch('https://5910-2800-2260-4040-1a92-49d3-f5a0-e305-aba0.ngrok-free.app/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer <'your message'>`
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'success') {
      alert('User logged in successfully!');
      console.log(data);
      localStorage.setItem("token", JSON.stringify(data.payload.token));
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred during login. Please try again later.');
  }

  inputEmailEl.value = '';
  passwordInput.value = '';
}