//Controlador principal

//Crear los métodos 

//1. Método o función para crear empleados

function crearEmpleado() {
alert("Creando empleado de forma correcta..."); 

//instanciar la clase
const empleado = new Empleado(
    document.getElementById("tipoDocumentoId").value,
    document.getElementById("documentoId").value,
    document.getElementById("nombreId").value,
    document.getElementById("apellidosId").value,
    document.getElementById("emailId").value,
    document.getElementById("usuarioId").value,
    document.getElementById("pwdId").value
);

console.log(empleado);

//get para el localStorage API - Lado cliente
let empleados = JSON.parse(localStorage.getItem("empleados")) || [];

//push para agregar el nuevo empleado al array de empleados
empleados.push(empleado);   

//set para guardar el array de empleados actualizado en el localStorage
localStorage.setItem("empleados", JSON.stringify(empleados));

mostrarEmpleados();
}

function mostrarEmpleados() {
    const empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    console.log(empleados);

    const tbody = document.querySelector('#tablaEmpleados tbody');

    // Limpiar la tabla antes de volver a pintarla (excepto el encabezado)
    tbody.innerHTML = `<tr>
        <td>No.</td>
        <td>Tipo de documento</td>
        <td>Documento</td>
        <td>Nombres</td>
        <td>Apellidos</td>  
        <td>Email</td>
        <td>Usuario</td>
        <td>Password</td>
    </tr>`;

    empleados.forEach(function(emp, index){
        const fila = `<tr>
            <td>${index + 1}</td>
            <td>${emp.tipo_documento}</td>
            <td>${emp.cc}</td>
            <td>${emp.nombre}</td>
            <td>${emp.apellido}</td>
            <td>${emp.email}</td>
            <td>${emp.usuario}</td>
            <td>${emp.password}</td>
            <td><button type="button" class="btn btn-warning" data-index="${index}" onclick="prepararActualizar(${index})">Actualizar</button></td>
            <td><button type="button" class="btn btn-danger" data-index="${index}" onclick="eliminarEmpleado(${index})">Eliminar</button></td>
        </tr>`;
        tbody.innerHTML += fila;
    });
}

//2. Función que decide si crear o actualizar según si hay un index guardado
function guardarEmpleado() {
    const index = document.getElementById("indexEditar").value;
    if (index === "") {
        crearEmpleado();
    } else {
        actualizarEmpleado();
    }
}

//3. Método para preparar el formulario con los datos del empleado a actualizar
function prepararActualizar(index) {
    alert("Preparando actualización del empleado No. " + (index + 1));

    const empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    const emp = empleados[index];

    // Llenar el formulario con los datos del empleado seleccionado
    document.getElementById("tipoDocumentoId").value = emp.tipo_documento;
    document.getElementById("documentoId").value = emp.cc;
    document.getElementById("nombreId").value = emp.nombre;
    document.getElementById("apellidosId").value = emp.apellido;
    document.getElementById("emailId").value = emp.email;
    document.getElementById("usuarioId").value = emp.usuario;
    document.getElementById("pwdId").value = emp.password;

    // Guardar el index en un campo oculto para saber cuál actualizar
    document.getElementById("indexEditar").value = index;

    // Mostrar la sección de registro con el formulario
    document.getElementById('seccionRegistrarse').style.display = "block";
    document.getElementById('seccionRegistrarse').scrollIntoView({behavior: "smooth"});
}

//3. Método para actualizar el empleado
function actualizarEmpleado() {
    alert("Actualizando empleado...");

    const index = document.getElementById("indexEditar").value;
    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];

    // Reemplazar el empleado en la posición index con los nuevos datos
    empleados[index] = new Empleado(
        document.getElementById("tipoDocumentoId").value,
        document.getElementById("documentoId").value,
        document.getElementById("nombreId").value,
        document.getElementById("apellidosId").value,
        document.getElementById("emailId").value,
        document.getElementById("usuarioId").value,
        document.getElementById("pwdId").value
    );

    localStorage.setItem("empleados", JSON.stringify(empleados));

    // Limpiar el index oculto
    document.getElementById("indexEditar").value = "";

    mostrarEmpleados();
}

//5. Método para buscar empleados
function buscarEmpleado() {
    const texto = document.getElementById("buscarId").value.toLowerCase();
    const empleados = JSON.parse(localStorage.getItem("empleados")) || [];

    // filter para quedarse solo con los que coincidan en nombre, apellido o documento
    const resultado = empleados.filter(function(emp) {
        return emp.nombre.toLowerCase().includes(texto) ||
               emp.apellido.toLowerCase().includes(texto) ||
               emp.cc.toLowerCase().includes(texto);
    });

    console.log(resultado);

    const tbody = document.querySelector('#tablaEmpleados tbody');

    tbody.innerHTML = `<tr>
        <td>No.</td>
        <td>Tipo de documento</td>
        <td>Documento</td>
        <td>Nombres</td>
        <td>Apellidos</td>  
        <td>Email</td>
        <td>Usuario</td>
        <td>Password</td>
    </tr>`;

    resultado.forEach(function(emp, index){
        const fila = `<tr>
            <td>${index + 1}</td>
            <td>${emp.tipo_documento}</td>
            <td>${emp.cc}</td>
            <td>${emp.nombre}</td>
            <td>${emp.apellido}</td>
            <td>${emp.email}</td>
            <td>${emp.usuario}</td>
            <td>${emp.password}</td>
            <td><button type="button" class="btn btn-warning" onclick="prepararActualizar(${empleados.indexOf(emp)})">Actualizar</button></td>
            <td><button type="button" class="btn btn-danger" onclick="eliminarEmpleado(${empleados.indexOf(emp)})">Eliminar</button></td>
        </tr>`;
        tbody.innerHTML += fila;
    });
}

//4. Método para eliminar un empleado
function eliminarEmpleado(index) {
    alert("Eliminando empleado No. " + (index + 1));

    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];

    // splice elimina 1 elemento en la posición index
    empleados.splice(index, 1);

    localStorage.setItem("empleados", JSON.stringify(empleados));

    mostrarEmpleados();
}
