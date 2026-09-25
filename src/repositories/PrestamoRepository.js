import { db } from "../data/db.js";

// Repositorio para la gestion de datos de prestamos
export class PrestamoRepository {
  // Registrar prestamo
  crearPrestamo(prestamo) {
    db.prestamos.push(prestamo);
    return prestamo;
  }

  // Buscar prestamo por identificador
  buscarPorId(id) {
    return db.prestamos.find((p) => p.id === id) || null;
  }

  // Listar prestamos con estado activo
  buscarPrestamosActivos() {
    return db.prestamos.filter((p) => p.estado === "Activo");
  }

  // Consultar historial de prestamos por aprendiz
  buscarPorAprendiz(idAprendiz) {
    return db.prestamos.filter((p) => p.idAprendiz === idAprendiz);
  }

  // Consultar prestamo activo de un equipo especifico
  buscarActivoPorEquipo(idEquipo) {
    return db.prestamos.find(
      (p) => p.idEquipo === idEquipo && p.estado === "Activo"
    ) || null;
  }

  // Registrar fecha de devolucion y actualizar estado a finalizado
  registrarDevolucion(idPrestamo, fechaDevolucion = new Date().toISOString()) {
    const prestamo = this.buscarPorId(idPrestamo);
    if (prestamo) {
      prestamo.fechaDevolucion = fechaDevolucion;
      prestamo.estado = "Finalizado";
      return prestamo;
    }
    return null;
  }

  // Listar todos los registros de prestamos
  listarTodos() {
    return [...db.prestamos];
  }
}
