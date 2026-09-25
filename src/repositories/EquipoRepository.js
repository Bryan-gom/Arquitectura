import { db } from "../data/db.js";

// Repositorio para la gestion de datos de equipos
export class EquipoRepository {
  // Guardar equipo
  guardar(equipo) {
    db.equipos.push(equipo);
    return equipo;
  }

  // Buscar equipo por identificador o serial
  buscarPorId(idOSerial) {
    return db.equipos.find(
      (e) => e.id === idOSerial || e.codigoSerial === idOSerial
    ) || null;
  }

  // Listar equipos disponibles
  buscarDisponibles() {
    return db.equipos.filter((e) => e.estado === "Disponible");
  }

  // Listar todos los equipos registrados
  listarTodos() {
    return [...db.equipos];
  }

  // Actualizar estado del equipo
  actualizarEstado(id, nuevoEstado) {
    const equipo = this.buscarPorId(id);
    if (equipo) {
      equipo.estado = nuevoEstado;
      return equipo;
    }
    return null;
  }
}
