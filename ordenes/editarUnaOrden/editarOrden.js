const id = localStorage.getItem("idEditar");
let orden = {}; 


fetch(`https://crearapicamilo.somee.com/ordenes/${id}`)
    .then(response => response.json())
    .then(json => {
        orden = json;
        console.log(orden);
        
        return fetch(`https://crearapicamilo.somee.com/clientes`)})
        .then(response => response.json())
        .then(clientes => {

          let opciones = ""; 
          clientes.forEach(cliente => {
              opciones += `<option value="${cliente.idCliente}" ${cliente.idCliente === orden.cliente.idCliente ? "selected" : ""}>${cliente.nombreCliente}</option>`;
          });
          console.log(clientes);
          document.getElementById("formularioEditar").innerHTML = `
              <label for="add-descripcion" class="text-center text-white">Descripcion: </label>
                      <textarea type="text" class="form-control" id="add-descripcion" placeholder="Descripcion de la orden">${orden.descripcionOrden}</textarea>
                  <br>
                  <label for="add-selectEstado" class="text-center text-white">Estado:</label>
                  <select id="add-selectEstado" class="form-control">
                      <option value="Facturación" ${orden.estadoOrden == "Facturación" ? "selected" : ""} >Facturación</option>
                      <option value="Preparación" ${orden.estadoOrden == "Preparación" ? "selected" : ""} >Preparación</option>
                      <option value="En envío" ${orden.estadoOrden == "En envío" ? "selected" : ""} >En envío</option>
                      <option value="Entregado" ${orden.estadoOrden == "Entregado" ? "selected" : ""} >Entregado</option>
                      <option value="Cancelación" ${orden.estadoOrden == "Cancelación" ? "selected" : ""} >Cancelación</option>
                  </select>
                  <br>
                  <label for="add-total" class="text-center text-white">Total: </label>
                      <input type="text" class="form-control" id="add-total" placeholder="Total de la orden" value="${orden.totalOrden}">
                  <br>
  
                  <label for="add-cliente" class="text-center text-white">Cliente: </label>
                      <select id="add-cliente" class="form-control">
                          ${opciones}
                      </select>
                      
                  <br>
              <input type="submit" class="btn btn-success" value="Guardar Cambios" onclick="editarOrden()">
          `;
        })
    .catch(error => console.error('Error obteniendo los datos.', error));

    function editarOrden() {
      const ordDescripcion = document.getElementById("add-descripcion").value
      const ordEstado = document.getElementById("add-selectEstado").value
      const ordTotal = parseFloat(document.getElementById("add-total").value)
      const ordCliente = document.getElementById("add-cliente").value

      const ordenActualizada = {
        descripcionOrden: ordDescripcion,
        estadoOrden: ordEstado,
        totalOrden: ordTotal,
        clienteId: ordCliente
      };
    
      fetch(`https://crearapicamilo.somee.com/ordenes/editar/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ordenActualizada)
      })
      .then(() => {
        alert("editado correctamente")
        window.location.replace("../todasLasOrdenes/ordenes.html")
      })
      .catch(error => console.error('Unable to update item.', error));
    }