const idOrden = localStorage.getItem("verDetalle");

console.log(idOrden);


fetch(`https://crearapicamilo.somee.com/Productos`)
            .then(response => response.json())
            .then(json => {
              console.log(json)
                json.map(function (elemento, i, elem) {
                    elem = document.getElementById("productSelect").innerHTML +=
                        `<option value="${json[i].idProducto}">${json[i].nombre}</option>`;
                        
                    return elemento
                })
                console.log(json);
                
            })
            .catch(error => console.error('Unable to get items.', error));





function addProducto() {
    const addOrdenId = idOrden;
    const addProducto = parseInt(document.getElementById('productSelect').value);
    const addCantidad = parseInt(document.getElementById('add-Cantidad').value);
    
  const producto = {
    ordenId: addOrdenId,
    productoId: addProducto,
    cantidad: addCantidad
  };

  fetch(`https://crearapicamilo.somee.com/DetalleOrdens`, {
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
      window.location.replace("../todosLosDetalles/detalleOrden.html")
    })
    .catch(error => console.error('Unable to add item.', error));
}