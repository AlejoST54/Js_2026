function crearEmpleado() {
    alert("Creando empleado de forma correcta...");

    const empleado = new Empleado(
        document.getElementById("ccId").value,
        document.getElementById("nombresApellidosId").value,
        document.getElementById("direccionId").value,
        document.getElementById("emailId").value,
        document.getElementById("telefonoId").value,
        document.getElementById("sueldoBaseId").value,
        document.getElementById("tipoEmpleadoId").value,
        document.getElementById("tipoBonificacionId").value
    );

    console.log(empleado);

    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    empleados.push(empleado);
    localStorage.setItem("empleados", JSON.stringify(empleados));

    mostrarEmpleados();
}

function mostrarEmpleados() {
    const empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    console.log(empleados);

    const tbody = document.querySelector('#tablaEmpleados tbody');

    tbody.innerHTML = `<tr>
        <td>No.</td>
        <td>CC</td>
        <td>Nombres y Apellidos</td>
        <td>Dirección</td>
        <td>Email</td>
        <td>Teléfono</td>
        <td>Sueldo Base</td>
        <td>Tipo de Empleado</td>
        <td>Tipo de Bonificación</td>
        <td>Sueldo Total</td>
        <td>Modificar</td>
        <td>Eliminar</td>
    </tr>`;

    empleados.forEach(function(emp, index) {
        const obj = new Empleado(emp.cc, emp.nombresApellidos, emp.direccion, emp.email, emp.telefono, emp.sueldoBase, emp.tipoEmpleado, emp.tipoBonificacion);
        const sueldoTotal = obj.hallarSueldo();

        const fila = `<tr>
            <td>${index + 1}</td>
            <td>${emp.cc}</td>
            <td>${emp.nombresApellidos}</td>
            <td>${emp.direccion}</td>
            <td>${emp.email}</td>
            <td>${emp.telefono}</td>
            <td>${emp.sueldoBase}</td>
            <td>${emp.tipoEmpleado}</td>
            <td>${emp.tipoBonificacion}</td>
            <td>${sueldoTotal}</td>
            <td><button type="button" class="btn btn-warning" onclick="prepararActualizar(${index})">Actualizar</button></td>
            <td><button type="button" class="btn btn-danger" onclick="eliminarEmpleado(${index})">Eliminar</button></td>
        </tr>`;
        tbody.innerHTML += fila;
    });

    document.getElementById("totalNomina").innerText = "Total Nómina Mensual: $" + hallarTotalNomina();
}

function hallarTotalNomina() {
    const empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    let total = 0;
    empleados.forEach(function(emp) {
        const obj = new Empleado(emp.cc, emp.nombresApellidos, emp.direccion, emp.email, emp.telefono, emp.sueldoBase, emp.tipoEmpleado, emp.tipoBonificacion);
        total += obj.hallarSueldo();
    });
    return total;
}

function guardarEmpleado() {
    const index = document.getElementById("indexEditar").value;
    if (index === "") {
        crearEmpleado();
    } else {
        actualizarEmpleado();
    }
}

function prepararActualizar(index) {
    alert("Preparando actualización del empleado No. " + (index + 1));

    const empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    const emp = empleados[index];

    document.getElementById("ccId").value = emp.cc;
    document.getElementById("nombresApellidosId").value = emp.nombresApellidos;
    document.getElementById("direccionId").value = emp.direccion;
    document.getElementById("emailId").value = emp.email;
    document.getElementById("telefonoId").value = emp.telefono;
    document.getElementById("sueldoBaseId").value = emp.sueldoBase;
    document.getElementById("tipoEmpleadoId").value = emp.tipoEmpleado;
    document.getElementById("tipoBonificacionId").value = emp.tipoBonificacion;
    document.getElementById("indexEditar").value = index;

    document.getElementById('seccionRegistrarse').style.display = "block";
    document.getElementById('seccionRegistrarse').scrollIntoView({behavior: "smooth"});
}

function actualizarEmpleado() {
    alert("Actualizando empleado...");

    const index = document.getElementById("indexEditar").value;
    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];

    empleados[index] = new Empleado(
        document.getElementById("ccId").value,
        document.getElementById("nombresApellidosId").value,
        document.getElementById("direccionId").value,
        document.getElementById("emailId").value,
        document.getElementById("telefonoId").value,
        document.getElementById("sueldoBaseId").value,
        document.getElementById("tipoEmpleadoId").value,
        document.getElementById("tipoBonificacionId").value
    );

    localStorage.setItem("empleados", JSON.stringify(empleados));
    document.getElementById("indexEditar").value = "";

    mostrarEmpleados();
}

function buscarEmpleado() {
    const texto = document.getElementById("buscarId").value.toLowerCase();
    const empleados = JSON.parse(localStorage.getItem("empleados")) || [];

    const resultado = empleados.filter(function(emp) {
        return emp.nombresApellidos.toLowerCase().includes(texto) ||
               emp.cc.toLowerCase().includes(texto);
    });

    console.log(resultado);

    const tbody = document.querySelector('#tablaEmpleados tbody');

    tbody.innerHTML = `<tr>
        <td>No.</td>
        <td>CC</td>
        <td>Nombres y Apellidos</td>
        <td>Dirección</td>
        <td>Email</td>
        <td>Teléfono</td>
        <td>Sueldo Base</td>
        <td>Tipo de Empleado</td>
        <td>Tipo de Bonificación</td>
        <td>Sueldo Total</td>
        <td>Modificar</td>
        <td>Eliminar</td>
    </tr>`;

    resultado.forEach(function(emp, index) {
        const obj = new Empleado(emp.cc, emp.nombresApellidos, emp.direccion, emp.email, emp.telefono, emp.sueldoBase, emp.tipoEmpleado, emp.tipoBonificacion);
        const sueldoTotal = obj.hallarSueldo();

        const fila = `<tr>
            <td>${index + 1}</td>
            <td>${emp.cc}</td>
            <td>${emp.nombresApellidos}</td>
            <td>${emp.direccion}</td>
            <td>${emp.email}</td>
            <td>${emp.telefono}</td>
            <td>${emp.sueldoBase}</td>
            <td>${emp.tipoEmpleado}</td>
            <td>${emp.tipoBonificacion}</td>
            <td>${sueldoTotal}</td>
            <td><button type="button" class="btn btn-warning" onclick="prepararActualizar(${empleados.indexOf(emp)})">Actualizar</button></td>
            <td><button type="button" class="btn btn-danger" onclick="eliminarEmpleado(${empleados.indexOf(emp)})">Eliminar</button></td>
        </tr>`;
        tbody.innerHTML += fila;
    });
}

function eliminarEmpleado(index) {
    alert("Eliminando empleado No. " + (index + 1));

    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    empleados.splice(index, 1);
    localStorage.setItem("empleados", JSON.stringify(empleados));

    mostrarEmpleados();
}
