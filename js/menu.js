document.addEventListener("DOMContentLoaded", () => {

    // Capturar todos los botones del menú
    const botones = document.querySelectorAll("a.btn");
    const alertContainer = document.getElementById("alert-container");

    botones.forEach((boton) => {
        boton.addEventListener("click", (event) => {
            event.preventDefault(); // Evita la redirección inmediata

            const nombrePantalla = boton.textContent.trim();
            const urlDestino = boton.getAttribute("href");

            // Crear alerta Bootstrap
            const alerta = document.createElement("div");
            alerta.className = "alert alert-info alert-dismissible fade show";
            alerta.role = "alert";
            alerta.innerHTML = `
                Redirigiendo a <strong>${nombrePantalla}</strong>.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;

            // Limpiar alertas anteriores
            alertContainer.innerHTML = "";
            alertContainer.appendChild(alerta);

            // Redirigir luego de 2 segundos
            setTimeout(() => {
                window.location.href = urlDestino;
            }, 2000);
        });
    });

    // Mostrar saldo actualizado
    const saldoElemento = document.querySelector("h2.fw-bold");
    let saldoActual = parseFloat(localStorage.getItem("saldo")) || 60000;
    saldoElemento.textContent = `$${saldoActual.toLocaleString()}`;
});
