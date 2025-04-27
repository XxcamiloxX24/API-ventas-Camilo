const id = localStorage.getItem("verDetalle");
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
    fetch(`https://crearapicamilo.somee.com/DetalleOrdens/orden/${id}`)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            
            productTable.clear();

            json.forEach(elemento => {
                productTable.row.add([
                    elemento.idDetalle,
                    elemento.orden.descripcionOrden,
                    elemento.producto.nombre,
                    elemento.producto.precio,
                    elemento.cantidad,
                    elemento.producto.precio * elemento.cantidad,
                    `<button class="btn btn-warning" onclick="editarDetalle(${elemento.idDetalle})"><i class="bi bi-pencil-square"></i></button>
                     <button class="btn btn-danger"  onclick="eliminarDetal(${elemento.idDetalle})"><i class="bi bi-trash3-fill"></i></button>`
                ]);
            });

            productTable.draw();
        })
        .catch(error => console.error('Unable to get items.', error));
}

function aggDetalle() {
    window.location.replace("../crearUnDetalle/crearDetalle.html")
}

function editarDetalle(id){
    localStorage.setItem("idEditar", id)
    window.location.replace("../editarUnDetalle/editarDetalle.html")
}

function eliminarDetal(id) {
    let opcion = confirm("¿Desea realmente eliminar este elemento?")
    if (opcion) {
        alert("Eliminado correctamente!")
        fetch(`https://crearapicamilo.somee.com/DetalleOrdens/${id}`, {
            method: 'DELETE'
          })
          .then(() => {
              location.reload();})
          .catch(error => console.error('Unable to delete item.', error));
    } else {
        location.reload();
    }
     
}