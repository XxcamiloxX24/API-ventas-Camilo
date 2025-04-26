function addCliente() {
  const cliNombre = document.getElementById("add-nombre").value
  const cliApellido = document.getElementById("add-apellido").value
  const cliCorreo = document.getElementById("add-correo").value
  const cliDireccion = document.getElementById("add-direccion").value

  const clienteNuevo = {
    nombreCliente: cliNombre,
    apellidoCLiente: cliApellido,
    correoCLiente: cliCorreo,
    direccionCliente: cliDireccion
  };

  fetch(`https://crearapicamilo.somee.com/clientes`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(clienteNuevo)
  })
    .then(response => response.json())
    .then(() => {
      alert("Agregado exitosamente");
      window.location.replace("../todosLosClientes/clientes.html")
    })
    .catch(error => console.error('Unable to add item.', error));
}