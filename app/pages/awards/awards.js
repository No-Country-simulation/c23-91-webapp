document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("donationsTableBody");
  const paginationContainer = document.getElementById("paginationContainer");
  const rowsPerPage = 8;

  // Fetch data from the server
  fetch("./response.json")
    .then((response) => response.json())
    .then((data) => {
      // Access the donations array from the response object
      const donations = data.donations;

      // Check if donations is an array
      if (!Array.isArray(donations)) {
        console.error("Donations data is not an array:", donations);
        return;
      }

      const totalPages = Math.ceil(donations.length / rowsPerPage);

      // Function to render the table rows
      const renderTableRows = (page) => {
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const pageData = donations.slice(startIndex, endIndex);

        tableBody.innerHTML = pageData
          .map(
            (item) => `
            <tr>
              <td>${item.numero}</td>
              <td>${item.fecha}</td>
              <td>${item.hospital}</td>
              <td class="d-none d-md-table-cell">${item.ubicacion}</td>
            </tr>
          `
          )
          .join("");
      };

      // Function to render the pagination buttons
      const renderPagination = () => {
        paginationContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
          const button = document.createElement("button");
          button.className = "btn btn-primary mx-1";
          button.textContent = i;
          button.addEventListener("click", () => renderTableRows(i));
          paginationContainer.appendChild(button);
        }
      };

      // Initial render
      renderTableRows(1);
      renderPagination();
    })
    .catch((error) => console.error("Error fetching data:", error));
});