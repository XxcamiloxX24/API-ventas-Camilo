fetch(`https://crearapicamilo.somee.com/Categorias`)
            .then(response => response.json())
            .then(json => {
                json.map(function (elemento, i, elem) {
                    elem = document.getElementById("categSelect").innerHTML +=
                        `<option value="${json[i].idCategoria}">${json[i].nombre}</option>`
                    return elemento
                })
                
                console.log(json)
            })
            .catch(error => console.error('Unable to get items.', error));





function addProducto() {
    const addNombreText = document.getElementById('add-nombre').value;
    const addPrecioDecimal = parseFloat(document.getElementById('add-precio').value);
    const addCategoriaInt = parseInt(document.getElementById('categSelect').value);
    
  const producto = {
    nombre: addNombreText,
    precio: addPrecioDecimal,
    CategoriaId: addCategoriaInt
  };

  fetch(`https://crearapicamilo.somee.com/Productos/crear`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  })
    .then(response => response.json())
    .then(() => {
      alert("Agregado exitosamente");
      window.location.replace("../todosLosProductos/productos.html")
    })
    .catch(error => console.error('Unable to add item.', error));
}