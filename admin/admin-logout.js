document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Elimina la bandera de autenticación del almacenamiento local
            localStorage.removeItem('userRole');
            
            // Redirige al usuario a la página de inicio
            window.location.href = '../index.html';
        });
    }
});