class Contrato extends Empleado {
    constructor(tiempoEmpleado, cc, nombre, apellido, direccion, email, telefono, sueldoBase, tipoEmpleado, tipoBonificacion) {
        super(cc, nombre, apellido, direccion, email, telefono, sueldoBase, tipoEmpleado, tipoBonificacion);
        this.tiempoEmpleado = tipoEmpleado;
    }
}