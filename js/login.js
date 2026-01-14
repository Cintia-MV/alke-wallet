// Credenciales válidas
const EMAIL_CORRECTO = "admin@mail.com";
const PASSWORD_CORRECTO = "1234";

// Mostrar alertas Bootstrap con jQuery
function mostrarAlerta(mensaje, tipo) {
    $("#alert-container").html(`
        <div class="col-12 col-md-4">
            <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                ${mensaje}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        </div>
    `);
}

// Validar email con regex
function emailValido(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

// Envío del formulario con jQuery
$("#loginForm").submit(function (event) {
    event.preventDefault(); // evita recarga

    const email = $("#email").val().trim();
    const password = $("#password").val().trim();

    // Campos vacíos
    if (email === "" || password === "") {
        mostrarAlerta("⚠️ Todos los campos son obligatorios", "warning");
        return;
    }

    // Email inválido
    if (!emailValido(email)) {
        mostrarAlerta("❌ El formato del email no es válido", "danger");
        return;
    }

    // Credenciales
    if (email === EMAIL_CORRECTO && password === PASSWORD_CORRECTO) {
        mostrarAlerta("✅ Login exitoso. Redirigiendo...", "success");

        setTimeout(() => {
            window.location.href = "menu.html";
        }, 1500);

    } else {
        mostrarAlerta("❌ Email o contraseña incorrectos", "danger");
    }
});
