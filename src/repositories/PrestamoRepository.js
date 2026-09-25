import { db } from "../data/db.js";

// Repositorio encargado del acceso a datos de los Préstamos
export class PrestamoRepository {
  // Crear un nuevo registro de préstamo
  crearPrestamo(prestamo) {
    db.prestamos.push(prestamo);
    return prestamo;
  }

  // Buscar préstamo por ID
  buscarPorId(id) {
    return db.prestamos.find((p) => p.id === id) || null;
  }

  // Buscar todos los préstamos que están actualmente activos (no devueltos)
  buscarPrestamosActivos() {
    return db.prestamos.filter((p) => p.estado === "Activo");
  }

  // Buscar historial de préstamos de un aprendiz
  buscarPorAprendiz(idAprendiz) {
    return db.prestamos.filter((p) => p.idAprendiz === idAprendiz);
  }

  // Buscar si un equipo específico tiene un préstamo activo
  buscarActivoPorEquipo(idEquipo) {
    return db.prestamos.find(
      (p) => p.idEquipo === idEquipo && p.estado === "Activo"
    ) || null;
  }

  // Registrar la devolución del equipo
  registrarDevolucion(idPrestamo, fechaDevolucion = new Date().toISOString()) {
    const prestamo = this.buscarPorId(idPrestamo);
    if (prestamo) {
      prestamo.fechaDevolucion = fechaDevolucion;
      prestamo.estado = "Finalizado";
      return prestamo;
    }
    return null;
  }

  // Listar todos los registros
  listarTodos() {
    return [...db.prestamos];
  }
}
