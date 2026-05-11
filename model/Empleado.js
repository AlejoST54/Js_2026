class Empleado {
    constructor(cc, nombresApellidos, direccion, email, telefono, sueldoBase, tipoEmpleado, tipoBonificacion) {
        this.cc = cc;
        this.nombresApellidos = nombresApellidos;
        this.direccion = direccion;
        this.email = email;
        this.telefono = telefono;
        this.sueldoBase = sueldoBase;
        this.tipoEmpleado = tipoEmpleado;
        this.tipoBonificacion = tipoBonificacion;
    }

    hallarSueldo() {
        let adicion = 0;
        if (this.tipoBonificacion === 'A') {
            adicion = 200000;
        } else if (this.tipoBonificacion === 'B') {
            adicion = 150000;
        } else if (this.tipoBonificacion === 'C') {
            adicion = 100000;
        } else if (this.tipoBonificacion === 'D') {
            adicion = 50000;
        }
        return parseFloat(this.sueldoBase) + adicion;
    }
}
