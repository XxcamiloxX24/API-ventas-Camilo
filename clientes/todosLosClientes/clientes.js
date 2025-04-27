
let productTable;
 
$(document).ready(function () {
    getItems();
    productTable = $("#myTable").DataTable({
        paging: true,
        ordering: true,
        searching: true,
        lengthMenu: [5,10,15,20],
        language: {
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",  
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }

        }
    });

    
    $("#myTable").on("click", "tr", function () {
        productTable.$("tr.selected").removeClass("selected");
        $(this).addClass("selected")
    });

});

function getItems() {
    fetch("https://crearapicamilo.somee.com/clientes")
        .then(response => response.json())
        .then(json => {
            console.log(json);
            
            productTable.clear();

            json.forEach(elemento => {
                productTable.row.add([
                    elemento.idCliente,
                    elemento.nombreCliente,
                    elemento.apellidoCLiente,
                    elemento.correoCLiente,
                    elemento.direccionCliente,
                    `<button class="btn btn-warning" onclick="editarCliente(${elemento.idCliente})"><i class="bi bi-pencil-square"></i></button>
                     <button class="btn btn-danger"  onclick="eliminarCliente(${elemento.idCategoria})"><i class="bi bi-trash3-fill"></i></button>`
                ]);
            });

            productTable.draw();
        })
        .catch(error => console.error('Error al obtener las categorias: ', error));
}

function crearCliente() {
    window.location.replace("../crearUnCliente/crearCliente.html")
}

function editarCliente(id){
    localStorage.setItem("idEditar", id)
    window.location.replace("../editarUnCliente/editarCliente.html")
}

function eliminarCliente(id) {
    let opcion = confirm("¿Desea realmente eliminar este elemento?")
    if (opcion) {
        alert("Eliminado correctamente!")
        fetch(`https://crearapicamilo.somee.com/clientes/${id}`, {
            method: 'DELETE'
          })
          .then(() => {
              location.reload();})
          .catch(error => console.error('Unable to delete item.', error));
    } else {
        location.reload();
    }
          
     
}