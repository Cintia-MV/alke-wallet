$(document).ready(function () {

    const lista = $("#lista-movimientos");

    // Obtener movimientos reales desde localStorage
    const listaTransacciones = JSON.parse(localStorage.getItem("movimientos")) || [];

    // Opciones de tipo de transaccion
    function getTipoTransaccion(tipo) {
        switch (tipo) {
            case "deposito":
                return "Depósito";
            case "transferencia":
                return "Transferencia";
            case "compra":
                return "Compra";
            default:
                return tipo;
        }
    }

    // Mostrar movimientos según filtro
    function mostrarUltimosMovimientos(filtro = "todos") {
        lista.empty();

        let filtrados = listaTransacciones.filter(mov => {
            if (filtro === "todos") return true;

            const tipo = mov.tipo.toLowerCase();

            if (filtro === "deposito") return tipo.includes("depósito");
            if (filtro === "transferencia") return tipo.includes("transferencia");
            if (filtro === "compra") return tipo.includes("compra");

            return false;
        });

        if (filtrados.length === 0) {
            lista.append(`<li class="list-group-item">No hay movimientos</li>`);
            return;
        }

        filtrados.slice().reverse().forEach(mov => {
            lista.append(`
            <li class="list-group-item">
                ${mov.fecha || ""} - 
                ${mov.tipo} - 
                $${mov.monto.toLocaleString()}
            </li>
        `);
        });
    }


    // Evento filtro
    $("#filtro-tipo").change(function () {
        mostrarUltimosMovimientos($(this).val());
    });

    // Carga inicial
    mostrarUltimosMovimientos();
});

