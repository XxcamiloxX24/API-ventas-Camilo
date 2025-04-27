const idDetalle = localStorage.getItem("idEditar");


fetch(`https://crearapicamilo.somee.com/DetalleOrdens/detalle/${idDetalle}`)
    .then(response => response.json())
    .then(json => {
        detalle = json;
        return fetch(`https://crearapicamilo.somee.com/ordenes`)
    })
    .then(response => response.json())
    .then(json => {
      ordenes = json;
      
      return fetch(`https://crearapicamilo.somee.com/Productos`)
    })
    .then(response => response.json())
    .then(json => {
      productos = json;
      console.log(productos);
      console.log(detalle);
      console.log(ordenes);
      
      let opcionesOrdenes = ""; 
      let opcionesProductos = ""; 
        ordenes.forEach(orden => {
          opcionesOrdenes += `<option value="${orden.idOrden}" ${orden.idOrden === detalle.idOrden ? "selected" : ""}>${orden.descripcionOrden}</option>`;
        });
        productos.forEach(producto => {
          opcionesProductos += `<option value="${producto.idProducto}" ${producto.idProducto === detalle.productoId ? "selected" : ""}>${producto.nombre}</option>`;
        });

        document.getElementById("formularioEditar").innerHTML = `
            <label for="seleccionProducto" class="text-center">Producto: </label>
              <select class="form-control" id="seleccionProducto">
                ${opcionesProductos}
              </select>
            <br>
            <label for="add-cantidad" class="text-center">Cantidad de productos: </label>
              <input type="text" class="form-control" id="add-cantidad" placeholder="Cantidad de productos" value="${detalle.cantidad}">
            <br>
            <input type="submit" class="btn btn-success" value="Guardar Cambios" onclick="editarDetalle()">
        `;
      
    })
    
    .catch(error => console.error('Error obteniendo los datos.', error));

    function editarDetalle() {
      const id = localStorage.getItem("idEditar");
      const productoDetalle = parseInt(document.getElementById("seleccionProducto").value);
      const cantidadProductos = parseInt(document.getElementById("add-cantidad").value);
    
      const detalleActualizado = {
        idDetalle: parseInt(id),
        productoId: productoDetalle,
        cantidad: cantidadProductos
      };
    
      fetch(`https://crearapicamilo.somee.com/DetalleOrdens/editar/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(detalleActualizado)
      })
      .then(() => {
        alert("Editado correctamente");
        window.location.replace("../todosLosDetalles/DetalleOrden.html");
      })
      .catch(error => console.error('Unable to update item.', error));
    }
    