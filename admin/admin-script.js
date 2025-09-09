document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('createUserForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    function validateField(input, validationFn) {
        const value = input.value.trim();
        const feedback = input.nextElementSibling;
        
        if (validationFn(value)) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            feedback.textContent = '';
            return true;
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            feedback.textContent = 'El campo no cumple con los requisitos.';
            return false;
        }
    }

    const nameValidation = (value) => value.length > 0 && value.length <= 100;
    const passwordValidation = (value) => value.length >= 4 && value.length <= 10;
    const emailDomainValidation = (value) => {
        const allowedDomains = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
        return allowedDomains.some(domain => value.endsWith(domain));
    };
    
    function validateEmail(value) {
        if (!value) {
            emailInput.nextElementSibling.textContent = 'El correo es requerido.';
            return false;
        }
        if (value.length > 100) {
            emailInput.nextElementSibling.textContent = 'El correo no puede exceder los 100 caracteres.';
            return false;
        }
        if (!emailDomainValidation(value)) {
            emailInput.nextElementSibling.textContent = 'Solo se permiten correos de @duoc.cl, @profesor.duoc.cl y @gmail.com.';
            return false;
        }
        return true;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let isValid = true;
        
        if (!validateField(nameInput, nameValidation)) {
            nameInput.nextElementSibling.textContent = 'El nombre es requerido y no puede exceder los 100 caracteres.';
            isValid = false;
        }

        if (!validateEmail(emailInput.value.trim())) {
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
            isValid = false;
        } else {
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
        }

        if (!validateField(passwordInput, passwordValidation)) {
            passwordInput.nextElementSibling.textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
            isValid = false;
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.classList.remove('is-valid');
            confirmPasswordInput.classList.add('is-invalid');
            confirmPasswordInput.nextElementSibling.textContent = 'Las contraseñas no coinciden.';
            isValid = false;
        } else {
            validateField(confirmPasswordInput, passwordValidation);
        }

        if (isValid) {
            alert('Usuario creado exitosamente. (Este sería el punto para enviar los datos a la base de datos)');
            form.reset();
            document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });
        }
    });
});