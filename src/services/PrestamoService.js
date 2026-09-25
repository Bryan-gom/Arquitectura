import { Prestamo } from "../entities/Prestamo.js";

// Capa de Negocio: Aplica todas las reglas del sistema
export class PrestamoService {
  constructor({ aprendizRepository, equipoRepository, prestamoRepository }) {
    this.aprendizRepo = aprendizRepository;
    this.equipoRepo = equipoRepository;
    this.prestamoRepo = prestamoRepository;
  }

  // Regla 1: Consultar equipos disponibles
  obtenerEquiposDisponibles() {
    return this.equipoRepo.buscarDisponibles();
  }

  // Regla 2: Realizar un préstamo validando disponibilidad (Punto 6 del taller)
  realizarPrestamo({ idAprendiz, idEquipo }) {
    // 1. Validar que el aprendiz exista
    const aprendiz = this.aprendizRepo.buscarPorId(idAprendiz);
    if (!aprendiz) {
      throw new Error(`El aprendiz con ID/documento "${idAprendiz}" no se encuentra registrado.`);
    }

    // 2. Validar que el equipo exista
    const equipo = this.equipoRepo.buscarPorId(idEquipo);
    if (!equipo) {
      throw new Error(`El equipo con ID "${idEquipo}" no existe en el inventario.`);
    }

    // 3. Regla principal: Evitar que un equipo ya prestado vuelva a prestarse
    if (equipo.estado !== "Disponible") {
      throw new Error(`Acción no permitida: El equipo "${equipo.nombre}" no está disponible (Estado actual: ${equipo.estado}).`);
    }

    // 4. Crear el registro del préstamo
    const nuevoId = `PR-${Date.now()}`;
    const prestamo = new Prestamo({
      id: nuevoId,
      idAprendiz: aprendiz.id,
      idEquipo: equipo.id,
      fechaPrestamo: new Date().toLocaleString("es-CO"),
      estado: "Activo"
    });

    this.prestamoRepo.crearPrestamo(prestamo);

    // 5. Actualizar el estado del equipo a "Prestado"
    this.equipoRepo.actualizarEstado(equipo.id, "Prestado");

    return {
      mensaje: "Préstamo registrado exitosamente",
      prestamo,
      equipo: equipo.nombre,
      aprendiz: aprendiz.nombreCompleto
    };
  }

  // Regla 3: Registrar devolución y liberar el equipo
  registrarDevolucion(idPrestamo) {
    const prestamo = this.prestamoRepo.buscarPorId(idPrestamo);
    if (!prestamo) {
      throw new Error(`El préstamo con ID "${idPrestamo}" no existe.`);
    }

    if (prestamo.estado === "Finalizado") {
      throw new Error(`El préstamo "${idPrestamo}" ya fue finalizado previamente.`);
    }

    // Actualizar registro del préstamo
    const devolucion = this.prestamoRepo.registrarDevolucion(
      idPrestamo,
      new Date().toLocaleString("es-CO")
    );

    // Devolver el estado del equipo a "Disponible"
    this.equipoRepo.actualizarEstado(prestamo.idEquipo, "Disponible");

    return {
      mensaje: "Devolución registrada con éxito. Equipo disponible nuevamente.",
      prestamo: devolucion
    };
  }

  // Regla 4: Consultar quién tiene un equipo prestado actualmente
  consultarQuienTieneEquipo(idEquipo) {
    const equipo = this.equipoRepo.buscarPorId(idEquipo);
    if (!equipo) {
      throw new Error(`El equipo con ID "${idEquipo}" no existe.`);
    }

    if (equipo.estado !== "Prestado") {
      return {
        equipo: equipo.nombre,
        estado: equipo.estado,
        mensaje: "El equipo está disponible en el ambiente de formación (no está prestado)."
      };
    }

    const prestamoActivo = this.prestamoRepo.buscarActivoPorEquipo(equipo.id);
    if (!prestamoActivo) {
      return {
        equipo: equipo.nombre,
        estado: equipo.estado,
        mensaje: "No se encontró registro activo asociado."
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
