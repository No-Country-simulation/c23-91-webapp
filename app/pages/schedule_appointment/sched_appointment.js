console.log("token:::>", localStorage.getItem("token"));
console.log("userID:::>", localStorage.getItem("userID"));
let user;
document.addEventListener("DOMContentLoaded", function () {
    // Función para cargar los datos del usuario
    async function loadFormData() {
        const spinner = document.getElementById("spinner"); // Referencia al spinner
        spinner.style.display = "block"; // Mostrar el spinner
        const userID = localStorage.getItem("userID");
        try {
            const response = await fetch(`http://localhost:8080/api/users/${userID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: ` Bearer ${localStorage.getItem("token")}`,
                }
            });

            if (!response.ok) {
                throw new Error("Error al cargar los datos");
            }
            const data = await response.json();
            user = data.payload;

            // Llenado de inputs del formulario con los datos recibidos
            document.getElementById("inputName").value = user.firstName || "";
            document.getElementById("inputLastName").value = user.lastName || "";
            document.getElementById("inputEmail").value = user.email || "";
            document.getElementById("bloodTypeSelect").value = user.bloodType || "";

            if (user.diseases.length > 0) {
                document.getElementById("diseaseYes").checked = true;
                user.diseases.forEach(disease => {
                    const pillContainer = document.getElementById("selectedDiseases");
                    const pill = createDiseasePill(disease.name.toLowerCase(), disease.name);
                    pillContainer.appendChild(pill);
                });
            } else if (user.diseases === 0) {
                document.getElementById("diseaseNo").checked = true;
            }
        } catch (error) {
            console.error("Error al cargar los datos del formulario:", error);
        } finally {
            document.getElementById("step-1-content").classList.remove('d-none');
            spinner.style.display = "none";
        }
    }

    // Llamar a la función al cargar la página
    loadFormData();
});

function createDiseasePill(diseaseValue, diseaseName) {
    const diseasesPills = document.getElementById('selectedDiseases').children;

    const pill = document.createElement('span');
    pill.className = 'badge bg-secondary text-primary p-2 rounded-pill';
    pill.dataset.value = diseaseValue;
    pill.textContent = diseaseName;

    pill.addEventListener('click', () => {
        pill.remove();
        if(diseasesChanged(diseasesPills, user.diseases)){
            document.getElementById("btn-updateUser").disabled = false;
        } else {
            document.getElementById("btn-updateUser").disabled = true;
        }
    });

    return pill;
}

function diseasesChanged(diseasesPills, diseasesServer){
    if (diseasesPills.length !== diseasesServer.length) 
        return true;
    const userDiseasesNames = diseasesServer.map(disease => disease.name.toLowerCase()).sort();
    const newUserDiseasesNames = [...diseasesPills].map(disease => disease.dataset.value).sort();
    return !userDiseasesNames.every((disease, index) => disease === newUserDiseasesNames[index]);
}

function userAddDisease(event){
    const select = event.target;
    const selectedDiseasesContainer = document.getElementById('selectedDiseases');
    const diseasesPills = selectedDiseasesContainer.children;

    // Add disease to div
    const disease = select.value;

    // Create disease pill if not alredy exists
    if (![...diseasesPills].some(pill => pill.dataset.value === disease)) {
        const pill = createDiseasePill(disease, select.options[select.selectedIndex].text);
        selectedDiseasesContainer.appendChild(pill);

        if(diseasesChanged(diseasesPills, user.diseases)){
            document.getElementById("btn-updateUser").disabled = false;
        } else {
            document.getElementById("btn-updateUser").disabled = true;
        }
    }
    // Reset select value
    select.value = '';
    // select.addEventListener('change', () => {
    // });
}

function userDataChange(event) {
    const input = event.target;
    const value = input.value;
    if (value !== user[input.dataset.field]) {
        document.getElementById("btn-updateUser").disabled = false;
    } else {
        document.getElementById("btn-updateUser").disabled = true;
    }
}


async function nextStep(currentStep) {
    document.getElementById(`step-${currentStep}`).classList.add('d-none');

    // Mostrar el siguiente paso
    const nextStep = currentStep + 1;
    document.getElementById(`step-${nextStep}`).classList.replace('d-none', 'd-flex');

    document.getElementById(`step-circle-${nextStep}`).classList.replace('bg-light', 'bg-primary');
    document.getElementById(`step-circle-${nextStep}`).classList.replace('text-dark', 'text-white');

    if (document.getElementById(`line-${currentStep}`)) {
        document.getElementById(`line-${currentStep}`).classList.add('border-primary');
    }

    if (currentStep === 1) {
        try {
            const response = await fetch("http://localhost:8080/api/institutions", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer`,
                }
            });

            if (!response.ok) {
                throw new Error("Error al cargar los hospitales");
            }
            const data = await response.json();
            const institutions = data.payload;
            console.log(data);

            const institutionSelect = document.getElementById("institutionSelect");
            institutions.forEach(hospital => {
                const option = document.createElement("option");
                option.value = hospital._id;
                option.textContent = hospital.name;
                institutionSelect.appendChild(option);

                console.log(hospital._id)
            });
        } catch (error) {
            console.error("Error al cargar los hospitales:", error);
        }
        console.log("Vamos al paso 2")
    } else if (currentStep === 2) {
        console.log("Vamos al paso 3")
    }
}

async function updateUser(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
  
    const data = {
      firstName: formData.get("name") || "", 
      lastName: formData.get("lastName") || "", 
      bloodType: formData.get("bloodType") || null, 
      email: formData.get("email") || "", 
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
    
      await fetch(`http://localhost:8080/api/users/${localStorage.getItem("userID")}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        Authorization: ` Bearer ${localStorage.getItem("token")}`,
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
  };
  
function generateTimes(schedules) {
    const [openTime, closeTime] = schedules;
    const availableTimes = [];

    const [oH, oM] = openTime.split(":").map(Number);
    const [cH, cM] = closeTime.split(":").map(Number);

    let start = oH * 60 + oM; // Convertimos la hora de apertura a minutos
    const end = cH * 60 + cM; // Convertimos la hora de cierre a minutos

    // Generar los horarios cada 30 minutos
    while (start + 30 <= end) { // Nos aseguramos de no pasar del horario de cierre
        const hora = Math.floor(start / 60); // Calculamos las horas
        const minutos = start % 60; // Calculamos los minutos
        availableTimes.push(
            `${hora.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`
        ); // Añadimos el horario formateado
        start += 30; // Sumamos 30 minutos
    }

    return availableTimes;
}

async function getHospitalSchedule(event) {
    const institutionId = event.target.value;
    try{
        const response = await fetch(`http://localhost:8080/api/institutions/679510245a3c2689379c2554/appointments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer`,
            }
        }); 
        if (!response.ok) {
            throw new Error("Error al cargar los hospitales");
        }
        const data = await response.json();
        // const institutions = data.payload;
        console.log(data);  
    } catch {
        console.error("Error al cargar los hospitales:", error);
    }
}

function combinarFechaHora(fecha, hora) {
    const [horaSeleccionada, minutosSeleccionados] = hora.split(":").map(Number);
  
    const fechaCompleta = new Date(fecha);
    fechaCompleta.setHours(horaSeleccionada, minutosSeleccionados, 0, 0);
  
    return fechaCompleta;
  }

// Simulación de las citas ya agendadas
const bookedAppointments = {
    "2025-01-10": ["11:30", "14:00"], // Citas ya tomadas
    "2025-01-12": ["09:00", "10:30"],
    "2025-01-15": ["11:00", "13:30"],
};

const timesMondayToFriday = generateTimes(["08:00", "20:00"]);
const timesSaturday = generateTimes(["09:00", "14:00"]);
const timesSunday = generateTimes(["cerrado", "cerrado"]);

let appointmentDate;
document.addEventListener("DOMContentLoaded", function () {
    const calendar = flatpickr("#datepicker", {
        inline: true,
        dateFormat: "d-m-Y",
        defaultDate: "today",
        minDate: "today", // Deshabilitar días anteriores a hoy
        maxDate: new Date().fp_incr(90), // Permitir agendar citas hasta 30 días después
        onReady: function () {
            const daysContainer = document.querySelector(".flatpickr-days");
            daysContainer.classList.add("gap-2"); // Ajustar espacio entre días
        },
        onDayCreate: function (dObj, dStr, fp, dayElem) {
            // Aplicar estilo a días deshabilitados (anteriores a hoy)
            if (dayElem.classList.contains("flatpickr-disabled")) {
                dayElem.classList.add("bg-white", "text-muted"); // Fondo blanco y texto tenue
            }
            // Obtener la fecha del día actual
            const date = dayElem.dateObj.toISOString().split("T")[0];
            if (dayElem.dateObj.getDay() === 0) {
                dayElem.classList.add("bg-danger", "text-white", "border", "border-white"); // Domingo
            }

            if(dayElem.dateObj.getDay() > 0 && dayElem.dateObj.getDay() <= 5){
                if (bookedAppointments[date] && bookedAppointments[date].length === timesMondayToFriday.length) {
                    dayElem.classList.add("bg-primary", "text-white", "border", "border-white"); // Día sin horarios disponibles
                } else {
                    dayElem.classList.add("bg-secondary", "text-dark", "border", "border-white"); // Día con horarios disponibles
                }   
            } else if(dayElem.dateObj.getDay() === 6){
                if (bookedAppointments[date] && bookedAppointments[date].length === timesSaturday.length) {
                    dayElem.classList.add("bg-primary", "text-white", "border", "border-white"); // Día sin horarios disponibles
                } else {
                    dayElem.classList.add("bg-secondary", "text-dark", "border", "border-white"); // Día con horarios disponibles
                }   
            }

            // Marcar los días según disponibilidad
        },
        onChange: function (selectedDates, dateStr) {
            const selectedDate = new Date(selectedDates[0]);
            const dayOfWeek = selectedDate.getDay();

            console.log(selectedDates[0]);
            console.log(dateStr);

            const timesContainer = document.getElementById("available-times");
            timesContainer.innerHTML = ""; // Limpiar horarios

            // Remover bordes negros de otros días seleccionados previamente
            document.querySelectorAll(".flatpickr-day").forEach(day => {
                day.classList.remove("border-black");
            });

            // Agregar borde negro al día seleccionado
            const selectedDay = document.querySelector(".flatpickr-day.selected");
            if (selectedDay) {
                selectedDay.classList.replace("border-white", "border-primary");
            }

            // Calcular horarios disponibles
            const bookedTimes = bookedAppointments[dateStr] || []; // Citas tomadas en la fecha seleccionada
             // Filtrar horas disponibles
            let availableTimes;
            if(dayOfWeek === 0){
                availableTimes = timesSunday.filter(time => !bookedTimes.includes(time)); 
            } else if(dayOfWeek === 6){
                availableTimes = timesSaturday.filter(time => !bookedTimes.includes(time)); 
            } else {
                availableTimes = timesMondayToFriday.filter(time => !bookedTimes.includes(time)); 
            }

            if (availableTimes.length > 0) {
                availableTimes.forEach(time => {
                    const pill = document.createElement("span");
                    pill.className = "badge bg-secondary text-dark p-2 border rounded-pill"; // Usar estilos Bootstrap
                    pill.textContent = time;
                    timesContainer.appendChild(pill);

                    // Evento de selección de horario
                    pill.onclick = () => {
                        // Remover selección previa
                        const previouslySelected = document.querySelector(".badge.bg-primary");
                        if (previouslySelected) {
                            previouslySelected.classList.remove("bg-primary", "text-white");
                            previouslySelected.classList.add("bg-secondary", "text-dark");
                        }
                        appointmentDate = combinarFechaHora(selectedDates[0], time);
                        // Seleccionar el horario actual
                        pill.classList.remove("bg-secondary", "text-dark");
                        pill.classList.add("bg-primary", "text-white");
                    };
                });
            } else {
                timesContainer.innerHTML =
                    '<span class="text-danger fw-bold">No hay horarios disponibles para este día</span>';
            }
        },
    });
});

function createAppointment(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const appointmentData = {
        date: appointmentDate,
        institutionId: formData.get("institutionSelect"),
        userId: localStorage.getItem("userID"),
        status: "Pending",
        notes: formData.get("notes") || "",
    };

    console.log(appointmentData);

//     fetch("http://localhost:8080/api/appointments", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(appointmentData),
//     })
//         .then(response => response.json())
//         .then(data => {
//             if (data.status === "success") {
//                 alert("Cita agendada exitosamente");
//                 console.log("Cita agendada:", data);
//             } else {
//                 alert(`Error: ${data.message}`);
//             }
//         })
//         .catch(error => {
//             console.error("Error al agendar la cita:", error);
//             alert("Ocurrió un error al agendar la cita. Por favor, inténtalo de nuevo más tarde.");
//         });
}


function finishStepper() {
    // Mostrar mensaje de finalización
    alert("¡Formulario completado con éxito!");
    location.reload(); // Recargar la página
};
