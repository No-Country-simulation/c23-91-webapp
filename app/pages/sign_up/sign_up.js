window.onload=()=>{
  // ---------------------------------------------------------------------------------------------------
  // -------------------------------- Diseases selector component START --------------------------------
  // ---------------------------------------------------------------------------------------------------
  const select = document.getElementById('diseasesSelect');
  const selectedDiseasesContainer = document.getElementById('selectedDiseases');
  
  // Manage section
  select.addEventListener('change', () => {
    const disease = select.value;
  
    // Avoid duplicated pills
    if (![...selectedDiseasesContainer.children].some(pill => pill.dataset.value === disease)) {
      const pill = document.createElement('span');
      pill.className = 'badge bg-secondary text-primary p-2 rounded-pill';
      pill.dataset.value = disease;
      pill.textContent = select.options[select.selectedIndex].text;
  
      // Delete pill on event
      pill.addEventListener('click', () => {
        pill.remove();
      });
  
      selectedDiseasesContainer.appendChild(pill);
    }
    // Reset select value
    select.value = '';
  });
  // ---------------------------------------------------------------------------------------------------
  // -------------------------------- Diseases selector component END ----------------------------------
  // ---------------------------------------------------------------------------------------------------
  
  
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
  

}


function diseasesDisabled(){
  const select = document.getElementById('diseasesSelect');
  select.disabled = true;
}
function diseasesEnabled(){
  const select = document.getElementById('diseasesSelect');
  select.disabled = false;
}

function birthdayValidation(event){
  const input = event.target;
  const selectedDate = new Date(input.value); 
  const today = new Date(); 

  let age = today.getFullYear() - selectedDate.getFullYear();

  const monthDifference = today.getMonth() - selectedDate.getMonth();
  const dayDifference = today.getDate() - selectedDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }
  
  if (age >= 18) {
    input.classList.remove("is-invalid");
  } else {
    input.classList.add("is-invalid");
  }
}

function createUser(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);

  const data = {
    firstName: formData.get("name") || "", 
    lastName: formData.get("lastName") || "", 
    birthday: formData.get("birthday"), 
    gender: formData.get("gender") || null, 
    bloodType: formData.get("bloodType") || null, 
    email: formData.get("email") || "", 
    password: formData.get("password") || "", 
    diseases: [], 
  };

  const selectedDiseases = Array.from(
    document.querySelectorAll("#selectedDiseases .badge")
  ).map(pill => ({
    name: pill.textContent.trim(),
    diagnosedDate: null, 
    notes: "", 
  }));

  data.diseases = selectedDiseases;

  console.log(data);
<<<<<<< HEAD
=======

    fetch('https://08f0-2800-2260-4040-1a92-4da9-c6f6-2943-edb3.ngrok-free.app/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      
      if (data.status === 'success') {
        alert('User registered successfully!');
        console.log('User registered:', data);
      } else {
        alert( `Error: ${data.message}`);
      }
    })
    .catch(error => {
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again later.');
    });
>>>>>>> bd182769c5c4b58de60a531f13c4172d4e02c4ab
};

