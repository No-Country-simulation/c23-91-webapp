const logoutBtn = document.getElementById('logoutBtn')
  logoutBtn.addEventListener('click', (event) => {
    const confirmation = confirm('¿Está seguro de que desea cerrar sesión?');
    if (confirmation) {
        localStorage.removeItem('token');
        alert('Ha cerrado su sesión');
        const absoluteUrl = `${window.location.origin}/app/index.html`;
        window.location.href = absoluteUrl;
    }
});


/*

document.addEventListener("DOMContentLoaded", function() {
logoutBtn.addEventListener('click', () => {
    fetch('/logout', {
    method: 'POST', credentials: 'include' })
        .then(() => {
            localStorage.removeItem('token');
            alert('Ha cerrado su sesión');
            const absoluteUrl = `${window.location.origin}/app/index.html`;
        window.location.href = absoluteUrl;
        })
        .catch((error) => console.error('Error logging out:', error));
});
)};


*/