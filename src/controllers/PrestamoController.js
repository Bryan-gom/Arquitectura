// Capa de Controladores: Atiende peticiones del usuario o de la interfaz
export class PrestamoController {
  constructor(prestamoService) {
    this.service = prestamoService;
  }

  // GET: Listar equipos disponibles
  listarEquiposDisponibles() {
    try {
      const disponibles = this.service.obtenerEquiposDisponibles();
      return { ok: true, data: disponibles };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  // POST: Crear nuevo préstamo
  crearPrestamo(peticion) {
    try {
      const resultado = this.service.realizarPrestamo(peticion);
      return { ok: true, ...resultado };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  // PUT: Registrar devolución
  devolverEquipo(idPrestamo) {
    try {
      const resultado = this.service.registrarDevolucion(idPrestamo);
      return { ok: true, ...resultado };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  // GET: Consultar quién tiene un equipo
  verQuienTieneEquipo(idEquipo) {
    try {
      const resultado = this.service.consultarQuienTieneEquipo(idEquipo);
      return { ok: true, data: resultado };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}
