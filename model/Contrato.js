class Contrato extends Empleado {
    constructor(cc, nombresApellidos, direccion, email, telefono, sueldoBase, tipoEmpleado, tipoBonificacion, tiempoContrato) {
        super(cc, nombresApellidos, direccion, email, telefono, sueldoBase, tipoEmpleado, tipoBonificacion);
        this.tiempoContrato = tiempoContrato;
    }
}
