import { AprendizRepository } from "./repositories/AprendizRepository.js";
import { EquipoRepository } from "./repositories/EquipoRepository.js";
import { PrestamoRepository } from "./repositories/PrestamoRepository.js";
import { PrestamoService } from "./services/PrestamoService.js";
import { PrestamoController } from "./controllers/PrestamoController.js";

// Inicializacion de capas del sistema
// 1. Capa de acceso a datos (Repositorios)
const aprendizRepo = new AprendizRepository();
const equipoRepo = new EquipoRepository();
const prestamoRepo = new PrestamoRepository();

// 2. Capa de logica de negocio (Servicios)
const prestamoService = new PrestamoService({
  aprendizRepository: aprendizRepo,
  equipoRepository: equipoRepo,
  prestamoRepository: prestamoRepo
});

// 3. Capa de presentacion (Controlador)
const controller = new PrestamoController(prestamoService);

console.log("Sistema de Prestamo de Equipos - SENA");
console.log("Demostracion de arquitectura en capas y patron repositorio\n");

// 1. Consultar equipos disponibles
console.log("1. Consulta de equipos disponibles inicialmente:");
const resDisponibles = controller.listarEquiposDisponibles();
console.table(resDisponibles.data.map(e => ({ ID: e.id, Nombre: e.nombre, Estado: e.estado })));

// 2. Realizar un prestamo
console.log("\n2. Registro de prestamo para el equipo EQ-01 por el aprendiz Bryan Gomez:");
const prestamo1 = controller.crearPrestamo({ idAprendiz: "AP-01", idEquipo: "EQ-01" });
console.log("Resultado:", prestamo1);

// 3. Validacion de disponibilidad ante solicitud simultanea
console.log("\n3. Intento de prestamo del mismo equipo EQ-01 (equipo ya prestado):");
const intentoFallido = controller.crearPrestamo({ idAprendiz: "AP-02", idEquipo: "EQ-01" });
console.log("Resultado obtenido:", intentoFallido);

// 4. Consultar responsable del equipo
console.log("\n4. Consulta del estado actual y responsable del equipo EQ-01:");
const consultaQuien = controller.verQuienTieneEquipo("EQ-01");
console.log(consultaQuien.data);

// 5. Registrar devolucion del equipo
console.log("\n5. Registro de devolucion del equipo:");
const idPrestamoGenerado = prestamo1.prestamo.id;
const devolucion = controller.devolverEquipo(idPrestamoGenerado);
console.log("Resultado de devolucion:", devolucion);

// 6. Verificar actualizacion del inventario
console.log("\n6. Verificacion del estado de equipos disponibles tras devolucion:");
const resFinal = controller.listarEquiposDisponibles();
console.table(resFinal.data.map(e => ({ ID: e.id, Nombre: e.nombre, Estado: e.estado })));

console.log("\nPruebas finalizadas correctamente.");
