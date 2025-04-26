const id = localStorage.getItem("idEditar");
let producto = {}; 


fetch(`https://crearapicamilo.somee.com/Productos/${id}`)
    .then(response => response.json())
    .then(json => {
        producto = json;
        return fetch(`https://crearapicamilo.somee.com/Categorias`); 
    })
    .then(response => response.json())
    .then(categorias => {
        let opciones = ""; 
        categorias.forEach(categoria => {
            opciones += `<option value="${categoria.idCategoria}" ${categoria.idCategoria === producto.categoria.idCategoria ? "selected" : ""}>${categoria.nombre}</option>`;
        });

        document.getElementById("formularioEditar").innerHTML = `
            <label for="add-nombre" class="text-center text-white">Nombre: </label>
            <input type="text" class="form-control" id="add-nombre" placeholder="Nombre del producto" value="${producto.nombre}">
            <br>
            <label for="add-precio" class="text-center text-white">Precio: </label>
            <input type="text" class="form-control" id="add-precio" placeholder="Precio del producto" value="${producto.precio}">
            <br>
            <label for="categSelect" class="text-center text-white">Categoria: </label>
            <select class="form-control" id="categSelect">${opciones}</select>
            <br>
            <input type="submit" class="btn btn-success" value="Guardar Cambios" onclick="editarProducto()">
        `;

        console.log("Producto:", producto);
        console.log("Categorías:", categorias);
    })
    .catch(error => console.error('Error obteniendo los datos.', error));

    function editarProducto() {
      const nombreProd = document.getElementById("add-nombre").value
      const precioProd = parseFloat(document.getElementById("add-precio").value)
      const categProd = parseInt(document.getElementById("categSelect").value)

      const prodActualizado = {
        idProducto: id,
        nombre: nombreProd,
        precio: precioProd,
        categoriaId: categProd
      };
    
      fetch(`https://crearapicamilo.somee.com/Productos/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(prodActualizado)
      })
      .then(() => {
        console.log("editado correctamente")
        window.location.replace("../todosLosProductos/productos.html")
      })
      .catch(error => console.error('Unable to update item.', error));
    }