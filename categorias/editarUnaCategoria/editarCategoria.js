const id = localStorage.getItem("idEditar");
let producto = {}; 


fetch(`https://crearapicamilo.somee.com/Categorias/${id}`)
    .then(response => response.json())
    .then(json => {
        
        console.log(json);
        document.getElementById("formularioEditar").innerHTML = `
            <label for="categSelect" class="text-center text-white">Categoria: </label>
            <input type="text" class="form-control" placeholder="Nombre de la categoria" id="categNombre" value="${json.nombre}">
            <br>
            <input type="submit" class="btn btn-success" value="Guardar Cambios" onclick="editarCategoria()">
        `;
        
    })
    .catch(error => console.error('Error obteniendo los datos.', error));

    function editarCategoria() {
      const categNombre = document.getElementById("categNombre").value

      const categActualizado = {
        nombre: categNombre,
      };
    
      fetch(`https://crearapicamilo.somee.com/Categorias/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categActualizado)
      })
      .then(() => {
        console.log("editado correctamente")
        window.location.replace("../todasLasCategorias/categorias.html")
      })
      .catch(error => console.error('Unable to update item.', error));
    }