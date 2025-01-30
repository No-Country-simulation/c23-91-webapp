const mes_ult_don_El = document.getElementById("mes_ult_don");
const dia_ult_don_El = document.getElementById("dia_ult_don");
const anio_ult_don_El = document.getElementById("anio_ult_don");
const mes_prox_cita_El = document.getElementById("mes_prox_cita");
const dia_prox_cita_El = document.getElementById("dia_prox_cita");
const anio_prox_cita_El = document.getElementById("anio_prox_cita");
const cancelar_cita_El = document.getElementById("cancelar_cita");
const cita_content_El = document.getElementById("cita_content");
const estado_El = document.getElementById("estado");
let appointmentId;

console.log(cancelar_cita_El);

let currentPage = 1;
const donationsPerPage = 8;

let donationsData = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchDonationsData();
});

// Get donations data:
const fetchDonationsData = async () => {

  try {
    const userID = localStorage.getItem("userID");

    if (!userID) {
      console.error("User ID not found in localStorage.");
      return;
    }

    console.log("Fetching from:", `http://localhost:8080/api/users/${userID}/details`);

    const response = await fetch(`http://localhost:8080/api/users/${userID}/details`);

    if (!response.ok) {
      throw new Error(`Failed to fetch donations data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    donationsData = data.payload?.donations || [];
    console.log("Extracted Donations:", donationsData);

    console.log("donationsData at start:", donationsData);

    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    if (donationsData.length > 0) {
      const lastDonation = donationsData[donationsData.length - 1];
      const donationDate = new Date(lastDonation.donationDate);

      const year = donationDate.getFullYear();
      const monthIndex = donationDate.getMonth();
      const month = monthNames[monthIndex];
      const day = String(donationDate.getDate()).padStart(2, '0');

      console.log("Before setting elements:");
      console.log("Month:", month);
      console.log("Day:", day);
      console.log("Year:", year);

      mes_ult_don_El.textContent = month;
      dia_ult_don_El.textContent = day;
      anio_ult_don_El.textContent = year;

      console.log(`Last donation date: ${year}-${month}-${day}`);
    }

    const appointmentsData = data.payload?.appointments || [];
    appointmentId = appointmentsData[appointmentsData.length - 1]._id;
    console.log(appointmentId);

if (appointmentsData.length > 0) {
  const nextAppointment = appointmentsData[appointmentsData.length - 1];

  if (nextAppointment.status === "Pending") {
    const appointmentDate = new Date(nextAppointment.appointmentDate);
    const year_app = appointmentDate.getFullYear();
    const monthIndex = appointmentDate.getMonth();
    const month_app = monthNames[monthIndex];
    const day_app = String(appointmentDate.getDate()).padStart(2, '0');

    mes_prox_cita_El.textContent = month_app;
    dia_prox_cita_El.textContent = day_app;
    anio_prox_cita_El.textContent = year_app;

    cancelar_cita_El.disabled = false;
    cancelar_cita_El.style.display= "block";

  } else {
    cita_content_El.innerHTML = `
    <div class="d-flex flex-column align-items-center justify-content-center p-4 bg-secondary rounded">
      <p class="mb-3 text-primary fs-6">"No tienes ninguna cita agendada"</p>
      <a href="../schedule_appointment/sched_appointment.html" class="btn btn-primary">Agenda tu cita</a>
    </div>
`;

    cancelar_cita_El.style.display = "none";
    estado_El.classList.add("d-none");

  }
  
} else {
  cita_content_El.innerHTML = `
    <div class="d-flex flex-column align-items-center justify-content-center p-4 bg-secondary text-white rounded">
      <p class="mb-3 text-primary">"No tienes ninguna cita agendada"</p>
      <a href="../schedule_appointment/sched_appointment.html" class="btn btn-primary">Agenda tu cita</a>
    </div>
`;

    cancelar_cita_El.style.display = "none";
    estado_El.classList.add("d-none");

}


    displayDonations(donationsData);
    renderPagination(donationsData);

  } catch (error) {
    console.error("Error fetching donations data:", error);
  }
};

const displayDonations = (donations) => {
  const container = document.getElementById("donations-container");

  if (!container) {
    console.warn("Donations container not found.");
    return;
  }

  container.innerHTML = "";

  const start = (currentPage - 1) * donationsPerPage;
  const end = start + donationsPerPage;
  const paginatedDonations = donations.slice(start, end);

  paginatedDonations.forEach((donation, index) => {
    const { donationDate, institutionId } = donation;
    const formattedDate = new Date(donationDate).toLocaleDateString("es-ES");

    const row = `
      <tr>
        <td>${start + index + 1}</td>
        <td>${formattedDate}</td>
        <td>${institutionId.name}</td>
        <td class="d-none d-md-table-cell">${institutionId.address}</td>
      </tr>
    `;

    container.innerHTML += row;
  });
};

// Pagination:

const renderPagination = (donations) => {
  const paginationContainer = document.getElementById("pagination-container");

  if (!paginationContainer) {
    console.warn("Pagination container not found.");
    return;
  }

  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(donations.length / donationsPerPage);

  if (totalPages > 1) {
    const ul = document.createElement("ul");
    ul.className = "pagination justify-content-center";

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.className = `page-item ${i === currentPage ? 'active' : ''}`;
      li.innerHTML = `<a class="page-link" href="#">${i}</a>`;

      li.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = i;
        displayDonations(donations);
        renderPagination(donations);
      });

      ul.appendChild(li);
    }

    paginationContainer.appendChild(ul);
  }
};

cancelar_cita_El.addEventListener("click", async function () {
  if (!appointmentId) {
    console.error("No appointment ID found!");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/appointments/${appointmentId}/cancel`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Appointment cancelled:", result);

    cancelar_cita_El.disabled = true;
  } catch (error) {
    console.error("Failed to cancel the appointment:", error);
  }

  cita_content_El.innerHTML = `
    <div class="d-flex flex-column align-items-center justify-content-center p-4 bg-secondary rounded">
      <p class="mb-3 text-primary fs-6">"No tienes ninguna cita agendada"</p>
      <a href="../schedule_appointment/sched_appointment.html" class="btn btn-primary">Agenda tu cita</a>
    </div>
    `;

    cancelar_cita_El.style.display = "none";
    estado_El.classList.add("d-none");

});


