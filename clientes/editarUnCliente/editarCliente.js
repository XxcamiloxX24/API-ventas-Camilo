const id = localStorage.getItem("idEditar");
let producto = {}; 


fetch(`https://crearapicamilo.somee.com/clientes/${id}`)
    .then(response => response.json())
    .then(json => {
        
        console.log(json);
        document.getElementById("formularioEditar").innerHTML = `
            <label for="add-nombre" class="text-center">Nombre: </label>
            <input type="text" class="form-control" id="add-nombre" placeholder="Nombre del cliente" value="${json.nombreCliente}">
            <br>
            <label for="add-apellido" class="text-center">Apellido: </label>
            <input type="text" class="form-control" id="add-apellido" placeholder="Apellido del cliente" value="${json.apellidoCLiente}">
            <br>
            <label for="add-correo" class="text-center">Correo: </label>
            <input type="text" class="form-control" id="add-correo" placeholder="Correo del Cliente" value="${json.correoCLiente}">
            <br>
            <label for="add-direccion" class="text-center">Direccion: </label>
            <input type="text" class="form-control" id="add-direccion" placeholder="Direccion del cliente" value="${json.direccionCliente}">
            <br>
            <input type="submit" class="btn btn-success" value="Guardar Cambios" onclick="editarCliente()">
        `;
        
    })
    .catch(error => console.error('Error obteniendo los datos.', error));

    function editarCliente() {
      const cliNombre = document.getElementById("add-nombre").value
      const cliApellido = document.getElementById("add-apellido").value
      const cliCorreo = document.getElementById("add-correo").value
      const cliDireccion = document.getElementById("add-direccion").value

      const clienteActualizado = {
        nombreCliente: cliNombre,
        apellidoCLiente: cliApellido,
        correoCLiente: cliCorreo,
        direccionCliente: cliDireccion
      };
    
      fetch(`https://crearapicamilo.somee.com/clientes/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteActualizado)
      })
      .then(() => {
        console.log("editado correctamente")
        window.location.replace("../todosLosClientes/clientes.html")
      })
      .catch(error => console.error('Unable to update item.', error));
    }