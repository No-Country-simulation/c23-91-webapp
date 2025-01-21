const inputEmailEl = document.getElementById('inputEmail');
const passwordInput = document.getElementById('inputPassword');
const togglePasswordButton = document.getElementById('togglePassword');

togglePasswordButton.addEventListener('click', () => {
  // Toggle input type between password and text
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;

  // Toggle icon
  togglePasswordButton.innerHTML = type === 'password'
    ? '<i class="bi bi-eye"></i>'
    : '<i class="bi bi-eye-slash"></i>';
});

async function logUser(event) {
  event.preventDefault();

  // Collect user data from input fields
  const userData = {
    email: inputEmailEl.value,
    password: passwordInput.value,
  };

  try {
    // Fetch using the GET method (only for testing)
    const response = await fetch('mock-response.json'); // No method or body needed for GET

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Simulate handling the response
    if (data.status === 'success') {
      alert('User logged in successfully!');
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred during login. Please try again later.');
  }

  // Clear input fields after submission
  inputEmailEl.value = '';
  passwordInput.value = '';
}

