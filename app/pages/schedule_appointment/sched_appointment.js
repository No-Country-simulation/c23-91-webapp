function nextStep(currentStep) {
    // const input = document.getElementById(`input-step-${currentStep}`);
    
    // Validar si el campo está lleno
    // if (!input.value.trim()) {
    //   alert("Por favor, completa el campo antes de continuar.");
    //   return;
    // }

    // Ocultar el paso actual
    document.getElementById(`step-${currentStep}`).classList.add('d-none');

    // Mostrar el siguiente paso
    const nextStep = currentStep + 1;
    document.getElementById(`step-${nextStep}`).classList.replace('d-none', 'd-flex');

    document.getElementById(`step-circle-${nextStep}`).classList.replace('bg-light', 'bg-primary');
    document.getElementById(`step-circle-${nextStep}`).classList.replace('text-dark', 'text-white');

    if (document.getElementById(`line-${currentStep}`)) {
      document.getElementById(`line-${currentStep}`).classList.add('border-primary');
     }
  }

  function finishStepper() {
    const input = document.getElementById('input-step-3');
    
    // Validar si el campo está lleno
    // if (!input.value.trim()) {
    //   alert("Por favor, completa el campo antes de finalizar.");
    //   return;
    // }

    // Mostrar mensaje de finalización
    alert("¡Formulario completado con éxito!");
    location.reload(); // Recargar la página
  };

  
  // Simulación de las citas ya agendadas
const bookedAppointments = {
    "2025-01-10": ["11:30", "14:00"], // Citas ya tomadas
    "2025-01-12": ["09:00", "10:30"],
    "2025-01-15": ["11:00", "13:30"],
  };
  
  // Horarios posibles (ajustar según tu negocio)
  const possibleTimes = ["09:00", "10:30", "11:30", "12:00", "14:00", "15:30", "16:00"];
  
  document.addEventListener("DOMContentLoaded", function () {
    const calendar = flatpickr("#datepicker", {
      inline: true,
      dateFormat: "Y-m-d",
      defaultDate: "today",
      onReady: function () {
        const daysContainer = document.querySelector(".flatpickr-days");
        daysContainer.classList.add("gap-2"); // Ajustar espacio entre días
      },
      onDayCreate: function (dObj, dStr, fp, dayElem) {
        // Obtener la fecha del día actual
        const date = dayElem.dateObj.toISOString().split("T")[0];
  
        // Marcar los días según disponibilidad
        if (bookedAppointments[date] && bookedAppointments[date].length === possibleTimes.length) {
          dayElem.classList.add("bg-secondary", "text-dark", "border", "border-white"); // Día sin horarios disponibles
        } else {
          dayElem.classList.add("bg-primary", "text-white", "border", "border-white"); // Día con horarios disponibles
        }
      },
      onChange: function (selectedDates, dateStr) {
        const timesContainer = document.getElementById("available-times");
        timesContainer.innerHTML = ""; // Limpiar horarios
  
        // Remover bordes negros de otros días seleccionados previamente
        document.querySelectorAll(".flatpickr-day").forEach(day => {
          day.classList.remove("border-black");
        });
  
        // Agregar borde negro al día seleccionado
        const selectedDay = document.querySelector(".flatpickr-day.selected");
        if (selectedDay) {
          selectedDay.classList.replace("border-white", "border-black");
        }
  
        // Calcular horarios disponibles
        const bookedTimes = bookedAppointments[dateStr] || []; // Citas tomadas en la fecha seleccionada
        const availableTimes = possibleTimes.filter(time => !bookedTimes.includes(time)); // Filtrar horas disponibles
  
        if (availableTimes.length > 0) {
          availableTimes.forEach(time => {
            const pill = document.createElement("span");
            pill.className = "badge bg-light text-dark p-2 border rounded-pill"; // Usar estilos Bootstrap
            pill.textContent = time;
            timesContainer.appendChild(pill);
          });
        } else {
          timesContainer.innerHTML =
            '<span class="text-danger fw-bold">No hay horarios disponibles para este día</span>';
        }
      },
    });
  });
