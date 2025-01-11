const userMenu = document.querySelector('.user-menu');
const dropdownMenu = document.querySelector('.dropdown-menu');

userMenu.addEventListener('click', () => {
    const isVisible = dropdownMenu.style.display === 'block';
    dropdownMenu.style.display = isVisible ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) {
        dropdownMenu.style.display = 'none';
    }
});
