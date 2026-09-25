// Capa de controladores: gestion de peticiones y respuestas
export class PrestamoController {
  constructor(prestamoService) {
    this.service = prestamoService;
  }

  // Listar equipos en estado disponible
  listarEquiposDisponibles() {
    try {
      const disponibles = this.service.obtenerEquiposDisponibles();
      return { ok: true, data: disponibles };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  // Registrar nuevo prestamo
  crearPrestamo(peticion) {
    try {
      const resultado = this.service.realizarPrestamo(peticion);
      return { ok: true, ...resultado };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  // Registrar devolucion de un equipo
  devolverEquipo(idPrestamo) {
    try {
      const resultado = this.service.registrarDevolucion(idPrestamo);
      return { ok: true, ...resultado };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  // Consultar estado actual de un equipo
  verQuienTieneEquipo(idEquipo) {
    try {
      const resultado = this.service.consultarQuienTieneEquipo(idEquipo);
      return { ok: true, data: resultado };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}
