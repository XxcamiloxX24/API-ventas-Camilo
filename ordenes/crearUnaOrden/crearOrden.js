
fetch("https://crearapicamilo.somee.com/clientes")
.then(response => response.json())
.then(json => {
    console.log(json);
    
    json.forEach(cliente => {
      document.getElementById("add-cliente").innerHTML += `
      <option value="${cliente.idCliente}">${cliente.nombreCliente}</option>
      `
    });
  })

function addOrden() {
  const ordDescrip = document.getElementById("add-descripcion").value
  const ordEstado = document.getElementById("add-selectEstado").value
  const ordTotal = parseFloat(document.getElementById("add-total").value)
  const ordCliente = parseInt(document.getElementById("add-cliente").value)

  const OrdenNueva = {
    descripcionOrden: ordDescrip,
    estadoOrden: ordEstado,
    totalOrden: ordTotal,
    clienteId: ordCliente
  };

  fetch(`https://crearapicamilo.somee.com/ordenes`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(OrdenNueva)
  })
    .then(response => response.json())
    .then(() => {
      alert("Agregado exitosamente");
      window.location.replace("../todasLasOrdenes/ordenes.html")
    })
    .catch(error => console.error('Unable to add item.', error));
}