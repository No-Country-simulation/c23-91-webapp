window.onload=()=>{
  const select = document.getElementById('diseasesSelect');
  const selectedDiseasesContainer = document.getElementById('selectedDiseases');
  
  // Manejar selección
  select.addEventListener('change', () => {
    const disease = select.value;
  
    // Evitar duplicados
    if (![...selectedDiseasesContainer.children].some(pill => pill.dataset.value === disease)) {
      const pill = document.createElement('span');
      pill.className = 'badge bg-secondary text-primary p-2 rounded-pill';
      pill.dataset.value = disease;
      pill.textContent = select.options[select.selectedIndex].text;
  
      // Agregar evento para eliminar al hacer clic
      pill.addEventListener('click', () => {
        pill.remove();
      });
  
      selectedDiseasesContainer.appendChild(pill);
    }
  
    // Resetear el select
    select.value = '';
  });
    
}
