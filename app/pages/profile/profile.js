document.addEventListener("DOMContentLoaded", function () {

    const numeroTotalDonacionesEl = document.getElementById("numero-total-donaciones");
    const numeroTotalPuntosEl = document.getElementById("userTotalPoints");
    console.log('Este es el numero total de puntos: ' + numeroTotalPuntosEl);


    // Load user data in 'datos personales' form
    async function loadFormData() {
        const spinner = document.getElementById("spinner");
        spinner.style.display = "block";
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
            user = data.payload.user;
            console.log(user);
            const userDonationsArray = data.payload.user.donations;
            const userTotalDonations = userDonationsArray.length;
            numeroTotalDonacionesEl.textContent = userTotalDonations;

            const userTotalPoints = data.payload.user.totalPoints;
            numeroTotalPuntosEl.textContent = userTotalPoints;


            console.log(data.payload.user.donations);


            //Load principal user data
            document.getElementById("userTitle").textContent = user.firstName || "";
            document.querySelector("label.font-semibold").textContent = "Nuevo Nivel";

            //Load user data in form
            document.getElementById("inputName").value = `${user.firstName || ""} ${user.lastName || ""}`.trim();
            document.getElementById("inputEmail").value = user.email || "";
            document.getElementById("inputBloodType").value = user.bloodType || "";
            document.getElementById("inputBithday").value = user.birthday || "";
            document.getElementById("inputGender").value = user.gender || "";

            if (user.diseases.length > 0) {
                document.getElementById("inputDiseases").value = "Si";
                user.diseases.forEach(disease => {
                    const pillContainer = document.getElementById("selectedDiseases");
                    const pill = createDiseasePill(disease.name.toLowerCase(), disease.name);
                    pillContainer.appendChild(pill);
                });
            } else if (user.diseases === 0) {
                document.getElementById("inputDiseases").value = "No";
            }
        } catch (error) {
            console.error("Error al cargar los datos del formulario:", error);
        } finally {
                document.getElementById("profile-content").classList.remove('d-none');
                spinner.style.display = "none";
            }
    }

    // Call function on window load
    loadFormData();
});

function createDiseasePill(diseaseValue, diseaseName) {
    const pill = document.createElement('span');
    pill.className = 'badge bg-secondary text-primary p-2 rounded-pill mx-1';
    pill.dataset.value = diseaseValue;
    pill.textContent = diseaseName;

    return pill;
}
