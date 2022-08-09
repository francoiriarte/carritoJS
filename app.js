//VARIABLES
const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //agregar cursos al carrito
  listaCursos.addEventListener("click", agregarCurso);

  //eliminar cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = [];
    limpiarHTML();
  });
}

//FUNCIONES
//agrega cursos al carrito
function agregarCurso(e) {
  e.preventDefault();

  //seleccionamos el curso
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

//elimina cursos del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //eliminar del arreglo de articulos
    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
    
    //volvemos a imprimir el carrito actualizado
    carritoHTML();
  }
}

//leer la informacion del curso que se quiere agregar al carrito
function leerDatosCurso(curso) {
  //creamos un objeto con el contenido del curso

  const infoCurso = {
    imagen: curso.querySelector("img").src,
    nombre: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //revisamos si un curso ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    //actualizamos cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //devuelve el objeto actualizado
      } else {
        return curso; //devuelve los objetos no duplicados
      }

      articulosCarrito = [...cursos];
    });
  } else {
    //agregamos el curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    console.log(articulosCarrito);
  }

  carritoHTML();
}

//mostrar carrito en el HTML
function carritoHTML() {
  //limpiar el HTML
  limpiarHTML();

  //recorrer el carrito y lista los cursos
  articulosCarrito.forEach((curso) => {
    const { imagen, nombre, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}"> x </a></td>
        `;

    //agregar el HTML del carrito en la tabla
    contenedorCarrito.appendChild(row);
  });
}

//vaciar el carrito para que no se imprima el array de productos dos veces
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
