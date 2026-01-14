$(document).ready(function () {

    //Capturar ID del DOM
    const lista = $("#lista-contactos");
    const enviarBtn = $("#enviar-dinero");


    //ALERTAS (auto-ocultables)

    let alertaTimeout = null;

    function alerta(msg, tipo = "info", tiempo = 2500) {

        const container = $("#alert-container");

        container.html(`
            <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                ${msg}
                <button class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);

        if (alertaTimeout) {
            clearTimeout(alertaTimeout);
        }

        alertaTimeout = setTimeout(() => {
            container.find(".alert").alert("close");
        }, tiempo);
    }


    // Mostrar / ocultar formulario contacto
    $("#btn-nuevo-contacto").click(() => $("#form-contacto").removeClass("d-none"));
    $("#cancelar-contacto").click(() => $("#form-contacto").addClass("d-none"));

    //Render contactos
    function renderContactos(filtro = "") {
        lista.empty();
        let contactos = JSON.parse(localStorage.getItem("contactos")) || [];

        contactos
            .filter(c =>
                c.nombre.toLowerCase().includes(filtro) ||
                c.alias.toLowerCase().includes(filtro)
            )
            .forEach(c => {
                lista.append(`
                    <li class="list-group-item contacto">
                        <input type="radio" name="contacto">
                        ${c.nombre} | ${c.alias} | ${c.banco}
                    </li>
                `);
            });
    }

    renderContactos();
    actualizarAutocomplete();


    //Buscar contacto
    $("#search").on("input", function () {
        renderContactos($(this).val().toLowerCase());
    });


    // Seleccionar contacto
    $(document).on("change", "input[name='contacto']", function () {
        $(".contacto").removeClass("active");
        $(this).closest(".contacto").addClass("active");
        enviarBtn.removeClass("d-none");
    });


    //Autocomplete

    function actualizarAutocomplete() {
        const dataList = $("#contactos-autocomplete");
        dataList.empty();

        let contactos = JSON.parse(localStorage.getItem("contactos")) || [];

        contactos.forEach(c => {
            dataList.append(`
                <option value="${c.nombre}">
                <option value="${c.alias}">
            `);
        });
    }


    //Guardar contacto

    $("#guardar-contacto").click(() => {
        const nombre = $("#nombre").val();
        const cbu = $("#cbu").val();
        const alias = $("#alias").val();
        const banco = $("#banco").val();

        if (!nombre || !cbu || !alias || !banco) {
            alerta("Todos los campos son obligatorios", "warning");
            return;
        }

        if (!/^\d{9,}$/.test(cbu)) {
            alerta("CBU inválido", "danger");
            return;
        }

        let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
        contactos.push({ nombre, cbu, alias, banco });
        localStorage.setItem("contactos", JSON.stringify(contactos));

        $("#form-contacto").addClass("d-none");
        renderContactos();
        actualizarAutocomplete();
        alerta("Contacto agregado correctamente", "success");
    });

    // Abrir modal enviar dinero
    enviarBtn.click(() => {
        $("#montoEnviar").val("");
        $("#modalEnviarDinero").modal("show");
    });


    //Confirmar envío
    $("#confirmar-envio").click(() => {

        let monto = parseFloat($("#montoEnviar").val());

        if (isNaN(monto) || monto <= 0) {
            alerta("Monto no válido", "danger");
            return;
        }

        let saldo = parseFloat(localStorage.getItem("saldo")) || 60000;

        if (monto > saldo) {
            alerta("Saldo insuficiente", "danger");
            return;
        }

        saldo -= monto;
        localStorage.setItem("saldo", saldo);

        $("#modalEnviarDinero").modal("hide");
        alerta("Transferencia realizada con éxito", "success");
    });


    //Limpiar alertas al abrir modal
    $("#modalEnviarDinero").on("show.bs.modal", () => {
        $("#alert-container").empty();
    });

});
