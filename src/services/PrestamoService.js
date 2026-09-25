import { Prestamo } from "../entities/Prestamo.js";

// Capa de logica de negocio: implementacion de reglas y validaciones
export class PrestamoService {
  constructor({ aprendizRepository, equipoRepository, prestamoRepository }) {
    this.aprendizRepo = aprendizRepository;
    this.equipoRepo = equipoRepository;
    this.prestamoRepo = prestamoRepository;
  }

  // Consultar equipos en estado disponible
  obtenerEquiposDisponibles() {
    return this.equipoRepo.buscarDisponibles();
  }

  // Registrar un nuevo prestamo validando la disponibilidad del equipo
  realizarPrestamo({ idAprendiz, idEquipo }) {
    // Validar existencia del aprendiz
    const aprendiz = this.aprendizRepo.buscarPorId(idAprendiz);
    if (!aprendiz) {
      throw new Error(`El aprendiz con ID/documento "${idAprendiz}" no se encuentra registrado.`);
    }

    // Validar existencia del equipo
    const equipo = this.equipoRepo.buscarPorId(idEquipo);
    if (!equipo) {
      throw new Error(`El equipo con ID "${idEquipo}" no existe en el inventario.`);
    }

    // Validar que el equipo se encuentre disponible
    if (equipo.estado !== "Disponible") {
      throw new Error(`Accion no permitida: El equipo "${equipo.nombre}" no esta disponible (Estado actual: ${equipo.estado}).`);
    }

    // Generar registro de prestamo
    const nuevoId = `PR-${Date.now()}`;
    const prestamo = new Prestamo({
      id: nuevoId,
      idAprendiz: aprendiz.id,
      idEquipo: equipo.id,
      fechaPrestamo: new Date().toLocaleString("es-CO"),
      estado: "Activo"
    });

    this.prestamoRepo.crearPrestamo(prestamo);

    // Actualizar estado del equipo a prestado
    this.equipoRepo.actualizarEstado(equipo.id, "Prestado");

    return {
      mensaje: "Prestamo registrado exitosamente",
      prestamo,
      equipo: equipo.nombre,
      aprendiz: aprendiz.nombreCompleto
    };
  }

  // Registrar devolucion y liberar equipo
  registrarDevolucion(idPrestamo) {
    const prestamo = this.prestamoRepo.buscarPorId(idPrestamo);
    if (!prestamo) {
      throw new Error(`El prestamo con ID "${idPrestamo}" no existe.`);
    }

    if (prestamo.estado === "Finalizado") {
      throw new Error(`El prestamo "${idPrestamo}" ya fue finalizado previamente.`);
    }

    // Actualizar registro del prestamo
    const devolucion = this.prestamoRepo.registrarDevolucion(
      idPrestamo,
      new Date().toLocaleString("es-CO")
    );

    // Actualizar estado del equipo a disponible
    this.equipoRepo.actualizarEstado(prestamo.idEquipo, "Disponible");

    return {
      mensaje: "Devolucion registrada con exito. Equipo disponible nuevamente.",
      prestamo: devolucion
    };
  }

  // Consultar estado actual y responsable de un equipo
  consultarQuienTieneEquipo(idEquipo) {
    const equipo = this.equipoRepo.buscarPorId(idEquipo);
    if (!equipo) {
      throw new Error(`El equipo con ID "${idEquipo}" no existe.`);
    }

    if (equipo.estado !== "Prestado") {
      return {
        equipo: equipo.nombre,
        estado: equipo.estado,
        mensaje: "El equipo esta disponible en el ambiente de formacion (no esta prestado)."
      };
    }

    const prestamoActivo = this.prestamoRepo.buscarActivoPorEquipo(equipo.id);
    if (!prestamoActivo) {
      return {
        equipo: equipo.nombre,
        estado: equipo.estado,
        mensaje: "No se encontro registro activo asociado."
      };
    }

    const aprendiz = this.aprendizRepo.buscarPorId(prestamoActivo.idAprendiz);

    return {
      equipo: equipo.nombre,
      estado: equipo.estado,
      prestadoA: aprendiz ? aprendiz.nombreCompleto : "Desconocido",
      ficha: aprendiz ? aprendiz.ficha : "N/A",
      desde: prestamoActivo.fechaPrestamo
    };
  }
}
