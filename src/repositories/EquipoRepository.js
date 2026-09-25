import { db } from "../data/db.js";

// Repositorio encargado del acceso a datos de los Equipos
export class EquipoRepository {
  // Guardar nuevo equipo en la base de datos
  guardar(equipo) {
    db.equipos.push(equipo);
    return equipo;
  }

  // Buscar equipo por ID o Serial
  buscarPorId(idOSerial) {
    return db.equipos.find(
      (e) => e.id === idOSerial || e.codigoSerial === idOSerial
    ) || null;
  }

  // Listar únicamente equipos disponibles
  buscarDisponibles() {
    return db.equipos.filter((e) => e.estado === "Disponible");
  }

  // Listar todos los equipos registrados
  listarTodos() {
    return [...db.equipos];
  }

  // Actualizar estado del equipo ("Disponible" o "Prestado")
  actualizarEstado(id, nuevoEstado) {
    const equipo = this.buscarPorId(id);
    if (equipo) {
      equipo.estado = nuevoEstado;
      return equipo;
    }
    return null;
  }
}
