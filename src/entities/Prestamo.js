// Entidad Préstamo
export class Prestamo {
  constructor({ id, idAprendiz, idEquipo, fechaPrestamo = new Date().toISOString(), fechaDevolucion = null, estado = "Activo" }) {
    this.id = id;
    this.idAprendiz = idAprendiz;
    this.idEquipo = idEquipo;
    this.fechaPrestamo = fechaPrestamo;
    this.fechaDevolucion = fechaDevolucion;
    this.estado = estado; // "Activo" o "Finalizado"
  }
}
