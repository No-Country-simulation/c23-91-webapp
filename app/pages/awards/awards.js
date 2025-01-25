document.addEventListener('DOMContentLoaded', () => {

    function fetchDonationData() {
      const userId = localStorage.getItem("userId");
      fetch(`http://localhost:8080/api/users/${userId}/details`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          const donationsTableBody = document.getElementById('donationsTableBody');
          donationsTableBody.innerHTML = '';
           
          data.forEach((donation, index) => {
             
            const row = document.createElement('tr');
  
             
            if (index % 2 === 0) {
              row.classList.add('table-light'); 
            } else {
              row.classList.add('table-primary'); 
            }
  
             
            const numberCell = document.createElement('td');
            numberCell.textContent = donation.number;
  
            const dateCell = document.createElement('td');
            dateCell.textContent = donation.date;
  
            const hospitalCell = document.createElement('td');
            hospitalCell.textContent = donation.hospital;
  
            const addressCell = document.createElement('td');
            addressCell.textContent = donation.address;
  
             
            row.appendChild(numberCell);
            row.appendChild(dateCell);
            row.appendChild(hospitalCell);
            row.appendChild(addressCell);
  
            donationsTableBody.appendChild(row);
          });
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          alert('An error occurred while fetching the data.');
        });
    }
  
     
    fetchDonationData();
  });
  