/* 
 query.selector(sirve para indicarle que elemento queremos buscar del html) le podemos agregar cosas

Luego de crear el formulario con los respectivos input y el boton creara al alumno.
se deber traer todas las etiquetas del HTML al javascript y guardarlas en una variable
constante (const) por seguridad y porque no cambiaran en la vida del software. 

El document.getElementByID me trae las etiquetas del html que cumplan con el nombre de ID introducido
como parametro en el getElementById("id de la etiqueta a llamar").
*/

/*con la porpiedad const (la variable que necesitemos)= document.querySelector*
estamos haciendo una busqueda del documento, que sea tipo id/ */
/* estamos creando un evento con el submit, cuando le den clieck al enviar
ahora con el nombre del formulario  addEventListener('submit' ,(e) =>)
cuando utilizamos la propiedad e.preventdefault se lo utiliza para eliminar el comportamiento de que
se recargue la pagina constantemente*/
/*
ahora estamos por hacer la validacion si username es igual al vacio o passwprd es igual al vacio
que nos retorno un (alerta que nos diga que todos los campos son necesarios)
if { username ==="" && passwprd === "") return alert( )}
     */

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const tipoFactura = document.getElementById("factura");
const producto = document.getElementById("producto");
const cantidad = document.getElementById("cantidad");
const precio = document.getElementById("precio");
const btnAgregarVenta = document.getElementById("agregar");
const btnPagar = document.getElementById("pagado");
let seccionCliente;
let seccionFactura;
const contenedorData = document.getElementById("contenedor-data");


function pintarContenedorData() {

    contenedorData.innerHTML = "";
    contenedorData.innerHTML = `
    <article id="seccion-cliente"></article>
    <article id="seccion-factura"></article>
    `
}

pintarContenedorData()

/* 
Ahora debemos crear una variable let de forma global llamada ID. Esta variable es un contador 
que por cada alumno que voy cargando aumenta en 1 su valor. Debe ser let para poder cambiar su valor
en la ejecucion del programa 
*/

let ID = 0;
/* 
Creamos un arreglo (lista) donde se pueda guardar los alumnos luegos de crearlos. Sera const
para proteger su tipo de dato que sera array.
*/
let arrayCliente = [];
let arrayFactura = [];

/* 
Ahora se debera crear una funcion que tendra codigo reutilizabe para la utilizacion del crud. Su objetivo
es llamar una etiqueta padre del html y crearle adentro una etiqueta hija DIV para poder asignarles
los valores de cada cliente guardado en un array. Su funcion es pintar el DOM con javascript de manera dinamica en el
orden que vayamos creando la lista cliente  y guardandolos en un array.
*/

function pintarCliente(array) {
    /*aqui comenxamos la busqueda, es un id*/
    seccionCliente = document.getElementById("seccion-cliente");
    seccionCliente.innerHTML = "";
    seccionCliente.innerHTML = "<h2>Descripcion de Venta</h2>";
    array.forEach((e) => {
        const divCliente = document.createElement("div");
        divCliente.innerHTML = `
        <h3>Cliente: </h3>
        <div class="cliente d-flex flex-column justify-content-start align-items-start gap-3" id="cliente${e.id}">
            <p><strong>Nombre:</strong> ${e.nombre}</p>
            <p><strong>Apellido:</strong> ${e.apellido}</p>
        </div>
        `
        seccionCliente.appendChild(divCliente);
    });
}

function pintarFactura(array) {
    seccionFactura = document.getElementById("seccion-factura");
    seccionFactura.innerHTML = "";
    array.forEach((e) => {
        const divCliente = document.createElement("div");
        divCliente.innerHTML = `
        <h3>Descripcion de factura:</h3>
        <div class="factura d-flex flex-column justify-content-start align-items-start gap-3" id="factura${e.id}">
            <p><strong>Tipo:</strong> ${e.tipo}</p>
            <p><strong>Producto:</strong> ${e.producto}</p>
            <p><strong>Cantidad:</strong> ${e.cantidad}</p>
            <p><strong>Precio:</strong> ${e.precio}</p>
            <p><strong>Total:</strong> ${e.precio * e.cantidad}</p>
        </div>
        `

        seccionFactura.appendChild(divCliente);
    });
}

/* 
Por ultimo hacemos uso del boton donde necesitamos crear el evento click
ahi dentro creamos un objeto llamado alumno y dentro guardamos toda la data que
el usuario ingresa desde las etiquetas input despues creamos una validacion donde solamente
me permite guardar ese alumno en un array si todo los campos son distintos a un string vacion.
Osea solamente se puede guardar un alumno si tiene un nombre, un apellido y una comision.

Si el alumno cumple con las condiciones se agrega a un array con el metodo .push(alumno) se aumenta un consecutivo
a la variable ID y se llama a la funcion pintarcliente() donde le pasamos por parametro el array con los alumnos cargados
*/


btnAgregarVenta.addEventListener("click", () => {
    pintarContenedorData()
    const cliente = {
        id: ID,
        nombre: nombre.value,
        apellido: apellido.value,
    }

    const factura = {
        id: ID,
        producto: producto.value,
        tipo: tipoFactura.value,
        cantidad: parseInt(cantidad.value),
        precio: parseFloat(precio.value)
    }

    if (cliente.nombre !== "" && cliente.apellido !== "") {
        arrayCliente.push(cliente);
        localStorage.setItem("clientes", JSON.stringify(arrayCliente))
        pintarCliente(arrayCliente)
    } else {
        alert("No se puede cargar un cliente sin nombre y apellido")
    }

    if (factura.producto !== "" && factura.tipo !== "" && factura.precio !== 0) {
        arrayFactura.push(factura);
        localStorage.setItem("facturas", JSON.stringify(arrayFactura))
        pintarFactura(arrayFactura)
    } else {
        alert("No se puede cargar una factura sin precio y sin un producto")
    }
})

btnPagar.addEventListener("click", () => {
    contenedorData.innerHTML = "";
    contenedorData.innerHTML = `
    <h2>Cargar nueva facturacion</h2>
    `
    alert("Venta cargada correctamente en la Base de datos")

})


/* 
Con este codigo se puede crear y leer los objetos, falta editarlos y eliminarlos.
*/