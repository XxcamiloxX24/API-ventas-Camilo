fetch(`https://localhost:7149/Categorias`)
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





function addCateg() {
    const addNombreText = document.getElementById('add-nombre').value;
    
  const categoria = {
    nombre: addNombreText
  };

  fetch(`https://localhost:7149/Categorias`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(categoria)
  })
    .then(response => response.json())
    .then(() => {
      alert("Agregado exitosamente");
      window.location.replace("../todasLasCategorias/categorias.html")
    })
    .catch(error => console.error('Unable to add item.', error));
}