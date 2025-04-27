
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
    fetch("https://crearapicamilo.somee.com/Productos")
        .then(response => response.json())
        .then(json => {
            productTable.clear();

            json.forEach(elemento => {
                productTable.row.add([
                    elemento.idProducto,
                    elemento.nombre,
                    elemento.precio,
                    elemento.categoria.nombre,
                    `<button class="btn btn-warning" onclick="editarProd(${elemento.idProducto})"><i class="bi bi-pencil-square"></i></button>
                     <button class="btn btn-danger"  onclick="eliminarProd(${elemento.idProducto})"><i class="bi bi-trash3-fill"></i></button>`
                ]);
            });

            productTable.draw();
        })
        .catch(error => console.error('Unable to get items.', error));
}

function crearProd() {
    window.location.replace("../crearUnProducto/crearProducto.html")
}

function editarProd(id){
    localStorage.setItem("idEditar", id)
    window.location.replace("../editarUnProducto/editarProducto.html")
}

function eliminarProd(id) {
    let opcion = confirm("¿Desea realmente eliminar este elemento?")
    if (opcion) {
        alert("Eliminado correctamente!")
        fetch(`https://crearapicamilo.somee.com/Productos/${id}`, {
            method: 'DELETE'
          })
          .then(() => {
              document.getElementById("allProd").innerHTML = "";
              getItems()})
          .catch(error => console.error('Unable to delete item.', error));
    } else {
        getItems();
    }
     
}