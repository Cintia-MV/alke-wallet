$(document).ready(function () {


    //ALERTAS (auto-ocultables)

    let alertaTimeout = null;

    function alerta(msg, tipo = "info", tiempo = 2500) {

        const container = $("#alert-container");

        container.html(`
            <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                ${msg}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);

        if (alertaTimeout) {
            clearTimeout(alertaTimeout);
        }

        alertaTimeout = setTimeout(() => {
            container.find(".alert").alert("close");
        }, tiempo);
    }

    // Obtener saldo desde localStorage o valor inicial
    let saldoActual = parseFloat(localStorage.getItem("saldo")) || 60000;

    // Mostrar saldo actual
    $("#saldo-actual").text(`$${saldoActual.toLocaleString()}`);


    //Evento depósito

    $("#depositar").click(function () {

        const monto = parseFloat($("#amount").val());

        // Validación
        if (isNaN(monto) || monto <= 0) {
            alerta("Ingrese un monto válido.", "warning");
            return;
        }

        // Actualizar saldo
        saldoActual += monto;
        localStorage.setItem("saldo", saldoActual);

        // Guardar movimiento
        const movimiento = { tipo: "Depósito", monto: monto };
        let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
        movimientos.push(movimiento);
        localStorage.setItem("movimientos", JSON.stringify(movimientos));

        // Mostrar alerta éxito
        alerta("Depósito realizado con éxito.", "success");

        // Leyenda del monto depositado
        $("#leyenda-deposito").text(`Monto depositado: $${monto.toLocaleString()}`);

        // Redirigir al menú luego de 2 segundos
        setTimeout(() => {
            window.location.href = "menu.html";
        }, 2000);
    });

});
