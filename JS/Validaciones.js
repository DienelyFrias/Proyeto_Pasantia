// Convertir input monto a moneda
function moneda(input) {
    let value = input.value.replace(/[^0-9]/g, ''); 
    if (value.length > 0) {
        input.value = 'RD$ ' + parseInt(value, 10).toLocaleString('es-DO'); 
    } else {
        input.value = '';
    }
}

// Formateo de datos de tarjeta
function formatearTarjeta(input) {
    let tarjeta = input.value.replace(/\s+/g, '');
    // Divide la cadena en grupos de 4 y vuelve a unirla con un espacio
    tarjeta = tarjeta.match(/.{1,4}/g).join(' ');
    input.value = tarjeta;
}

function formatearTelefono(input) {
    let telefono = input.value.replace(/\s+/g, '');
    // Esto divide la cadena en grupos de 3, 3 y 4 dígitos, y vuelve a unirla con espacios
    if (telefono.length > 3 && telefono.length <= 6) {
        telefono = telefono.slice(0, 3) + ' ' + telefono.slice(3);
    } else if (telefono.length > 6) {
        telefono = telefono.slice(0, 3) + ' ' + telefono.slice(3, 6) + ' ' + telefono.slice(6);
    }
    input.value = telefono;
}

// Limitar la longitud del número de teléfono
const telefonoInput = document.getElementById('telefono');
telefonoInput.addEventListener('input', function () {
    if (this.value.length > 12) {
        this.value = this.value.slice(0, 12);
    }
});

// Valor maximo para el cvv
const cvvInput = document.getElementById('cvv');
cvvInput.addEventListener('input', function () {
    if (this.value.length > 4) {
        this.value = this.value.slice(0, 4);
    }
});

// Validaciones del formulario
function validarFormulario(event) {
    event.preventDefault(); // Previene el envío del formulario por defecto

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const ciudad = document.getElementById('ciudad').value;
    const pais = document.getElementById('pais').value;
    const monto = document.getElementById('monto').value;
    const titular = document.getElementById('titular').value;
    const numeroTarjeta = document.getElementById('numero-tarjeta').value.replace(/\s+/g, ''); // Eliminar espacios en blanco
    const cvv = document.getElementById('cvv').value;

    if (nombre.trim() === '') {
        alert('Por favor, ingrese su nombre completo.');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return false;
    }

    if (telefono.trim() === '' || telefono.length !== 12) {
        alert('Por favor, ingrese un número de teléfono válido de 12 dígitos.');
        return false;
    }

    if (pais.trim() === 'Pais') {
        alert('Por favor, seleccione su país.');
        return false;
    }

    if (ciudad.trim() === 'Ciudad') {
        alert('Por favor, seleccione su ciudad.');
        return false;
    }

    if (monto.trim() === '' || isNaN(parseFloat(monto.replace(/[^0-9.-]+/g, "")))) {
        alert('Por favor, ingrese un monto válido.');
        return false;
    }

    if (titular.trim() === '') {
        alert('Por favor, ingrese el nombre del titular de la tarjeta.');
        return false;
    }

    if (numeroTarjeta.trim() === '' || numeroTarjeta.length !== 16) {
        alert('Por favor, ingrese un número de tarjeta válido de 16 dígitos.');
        return false;
    }

    if (cvv.trim() === '' || cvv.length < 3 || cvv.length > 4) {
        alert('Por favor, ingrese un CVV válido de 3 o 4 dígitos.');
        return false;
    }

    // Muestraer el mensaje de éxito
    document.getElementById('successMessage').style.display = 'block';
    // Oculta 
    document.getElementById('donationForm').style.display = 'none';
    return false; 
}

// Asociar la función validarFormulario al evento submit del formulario
const form = document.getElementById('donationForm');
form.addEventListener('submit', validarFormulario);
