$(document).ready(function() {
    var costoPorMateria = 50000; // Costo en colones de cada materia
    
    var materiasSeleccionadas = [];

    // Función para actualizar la lista de materias seleccionadas
    function actualizarListaMaterias() {
        var listaMateriasHTML = "";
        for (var i = 0; i < materiasSeleccionadas.length; i++) {
            listaMateriasHTML += "<li class='list-group-item'>" + materiasSeleccionadas[i] + "</li>";
        }
        $("#materias-seleccionadas").html(listaMateriasHTML);

        // Calcular y mostrar el costo total
        var costoTotal = materiasSeleccionadas.length * costoPorMateria;
        $("#costo-total").text("₡ " + costoTotal.toLocaleString());
    }

    // Evento al hacer clic en una materia
    $(".materia").click(function(e) {
        e.preventDefault();
        var materiaNombre = $(this).text();
        var materiaId = $(this).data("id");

        // Verificar si la materia ya está seleccionada
        var index = materiasSeleccionadas.indexOf(materiaNombre);
        if (index === -1) {
            materiasSeleccionadas.push(materiaNombre);
            $(this).addClass("active");
        } else {
            materiasSeleccionadas.splice(index, 1);
            $(this).removeClass("active");
        }

        // Actualizar la lista de materias seleccionadas
        actualizarListaMaterias();
    });

    // Evento al hacer clic en el botón Matricular
    $("#btn-matricular").click(function() {
        var metodoPago = $("#metodo-pago").val();
        var fechaActual = new Date().toLocaleDateString(); // Fecha actual en formato local

        // Preparar el contenido del archivo de texto
        var contenidoArchivo = "Materias seleccionadas:\n";
        for (var i = 0; i < materiasSeleccionadas.length; i++) {
            contenidoArchivo += "- " + materiasSeleccionadas[i] + "\n";
        }
        contenidoArchivo += "\nCosto total: ₡ " + (materiasSeleccionadas.length * costoPorMateria).toLocaleString() + "\n";
        contenidoArchivo += "Método de pago: " + metodoPago + "\n";
        contenidoArchivo += "Fecha de matrícula: " + fechaActual + "\n";

        // Crear un objeto Blob con el contenido
        var blob = new Blob([contenidoArchivo], { type: 'text/plain' });

        // Crear un objeto URL para el Blob
        var url = window.URL.createObjectURL(blob);

        // Crear un elemento <a> para descargar el archivo
        var a = document.createElement("a");
        a.href = url;
        a.download = "matricula_info.txt"; // Nombre del archivo
        document.body.appendChild(a);
        a.click();

        // Limpiar y revocar el objeto URL
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        // Mostrar mensaje de matrícula exitosa (puede eliminarse en producción)
        alert("Matrícula exitosa. Se ha descargado un archivo con la información.");
    });
});
