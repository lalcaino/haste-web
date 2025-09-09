<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailWarning = document.getElementById('emailWarning');
    const capsLockWarning = document.getElementById('capsLockWarning');

    const showToast = (message, type) => {
        const toastElement = document.getElementById('loginToast');
        const toastBody = document.getElementById('toastBody');
        toastBody.textContent = message;

        toastElement.classList.remove('bg-success', 'bg-danger');

        if (type === 'success') {
            toastElement.classList.add('bg-success');
        } else if (type === 'error') {
            toastElement.classList.add('bg-danger');
        }

        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    };

    if (emailInput && emailWarning) {
        emailInput.addEventListener('blur', () => {
            const emailValue = emailInput.value.trim();
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

            if (emailValue !== '' && !isValidEmail) {
                emailWarning.classList.remove('d-none');
            } else {
                emailWarning.classList.add('d-none');
            }
        });

        emailInput.addEventListener('input', () => {
            emailWarning.classList.add('d-none');
        });
    }

    if (passwordInput && capsLockWarning) {
        passwordInput.addEventListener('keyup', (e) => {
            if (e.getModifierState('CapsLock')) {
                capsLockWarning.classList.remove('d-none');
            } else {
                capsLockWarning.classList.add('d-none');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (!isValidEmail) {
                showToast('Por favor, corrige los errores del formulario.', 'error');
                emailWarning.classList.remove('d-none');
                return; 
            }

            const adminUser = { email: 'admin@duoc.cl', password: 'admin', role: 'admin' };
            const sellerUser = { email: 'vendedor@duoc.cl', password: 'vendedor', role: 'seller' };

            let userRole = '';

            if (email === adminUser.email && password === adminUser.password) {
                userRole = 'admin';
            } else if (email === sellerUser.email && password === sellerUser.password) {
                userRole = 'seller';
            }

            if (userRole) {
                localStorage.setItem('userRole', userRole);
                showToast(`Inicio de sesión exitoso. Redirigiendo al panel de ${userRole}.`, 'success');

                setTimeout(() => {
                    if (userRole === 'admin') {
                        window.location.href = 'admin/dashboard.html';
                    } else if (userRole === 'seller') {
                        window.location.href = 'admin/seller-dashboard.html';
                    }
                }, 2000);
                
            } else {
                showToast('Correo o contraseña incorrectos.', 'error');
            }
        });
    }
=======
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailWarning = document.getElementById('emailWarning');
    const capsLockWarning = document.getElementById('capsLockWarning');

    const showToast = (message, type) => {
        const toastElement = document.getElementById('loginToast');
        const toastBody = document.getElementById('toastBody');
        toastBody.textContent = message;

        toastElement.classList.remove('bg-success', 'bg-danger');

        if (type === 'success') {
            toastElement.classList.add('bg-success');
        } else if (type === 'error') {
            toastElement.classList.add('bg-danger');
        }

        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    };

    if (emailInput && emailWarning) {
        emailInput.addEventListener('blur', () => {
            const emailValue = emailInput.value.trim();
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

            if (emailValue !== '' && !isValidEmail) {
                emailWarning.classList.remove('d-none');
            } else {
                emailWarning.classList.add('d-none');
            }
        });

        emailInput.addEventListener('input', () => {
            emailWarning.classList.add('d-none');
        });
    }

    if (passwordInput && capsLockWarning) {
        passwordInput.addEventListener('keyup', (e) => {
            if (e.getModifierState('CapsLock')) {
                capsLockWarning.classList.remove('d-none');
            } else {
                capsLockWarning.classList.add('d-none');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (!isValidEmail) {
                showToast('Por favor, corrige los errores del formulario.', 'error');
                emailWarning.classList.remove('d-none');
                return; 
            }

            const adminUser = { email: 'admin@duoc.cl', password: 'admin', role: 'admin' };
            const sellerUser = { email: 'vendedor@duoc.cl', password: 'vendedor', role: 'seller' };

            let userRole = '';

            if (email === adminUser.email && password === adminUser.password) {
                userRole = 'admin';
            } else if (email === sellerUser.email && password === sellerUser.password) {
                userRole = 'seller';
            }

            if (userRole) {
                localStorage.setItem('userRole', userRole);
                showToast(`Inicio de sesión exitoso. Redirigiendo al panel de ${userRole}.`, 'success');

                setTimeout(() => {
                    if (userRole === 'admin') {
                        window.location.href = 'admin/dashboard.html';
                    } else if (userRole === 'seller') {
                        window.location.href = 'admin/seller-dashboard.html';
                    }
                }, 2000);
                
            } else {
                showToast('Correo o contraseña incorrectos.', 'error');
            }
        });
    }
>>>>>>> a2497f6b234155843b60b9a394b5446cb2720f71
});