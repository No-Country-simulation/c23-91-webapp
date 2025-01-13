document.addEventListener('click', (event) => {
    const dropdown = document.querySelector('.dropdown-menu');
    const userMenuButton = document.getElementById('userMenuButton');

    if (!userMenuButton.contains(event.target) && dropdown.classList.contains('show')) {
        userMenuButton.click(); // Triggers Bootstrap's dropdown toggle
    }
});

