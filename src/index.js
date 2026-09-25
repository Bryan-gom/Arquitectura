import { AprendizRepository } from "./repositories/AprendizRepository.js";
import { EquipoRepository } from "./repositories/EquipoRepository.js";
import { PrestamoRepository } from "./repositories/PrestamoRepository.js";
import { PrestamoService } from "./services/PrestamoService.js";
import { PrestamoController } from "./controllers/PrestamoController.js";

// ==========================================
// INICIALIZACIÓN DE LA ARQUITECTURA EN CAPAS
// ==========================================
// 1. Capa de Datos (Repositorios)
const aprendizRepo = new AprendizRepository();
const equipoRepo = new EquipoRepository();
const prestamoRepo = new PrestamoRepository();

// 2. Capa de Negocio (Servicios con reglas)
const prestamoService = new PrestamoService({
  aprendizRepository: aprendizRepo,
  equipoRepository: equipoRepo,
  prestamoRepository: prestamoRepo
});

// 3. Capa de Presentación / Controlador
const controller = new PrestamoController(prestamoService);

console.log("==================================================");
console.log(" 🚀 SISTEMA DE PRÉSTAMO DE EQUIPOS - SENA (ADSO)");
console.log(" Demostración de Arquitectura y Patrón Repositorio");
console.log("==================================================\n");

// PASO 1: Consultar equipos disponibles
console.log("🔹 1. Consultando equipos disponibles inicialmente:");
const resDisponibles = controller.listarEquiposDisponibles();
console.table(resDisponibles.data.map(e => ({ ID: e.id, Nombre: e.nombre, Estado: e.estado })));

// PASO 2: Realizar un préstamo exitoso
console.log("\n🔹 2. Aprendiz 'Bryan Gómez' solicita el préstamo del equipo 'EQ-01':");
const prestamo1 = controller.crearPrestamo({ idAprendiz: "AP-01", idEquipo: "EQ-01" });
console.log("Resultado:", prestamo1);

// PASO 3: Intentar prestar el mismo equipo a otro aprendiz (Demostración de la Regla del Punto 6)
console.log("\n🔹 3. Aprendiz 'Valery Castro' intenta solicitar el MISMO equipo 'EQ-01' (ya prestado):");
const intentoFallido = controller.crearPrestamo({ idAprendiz: "AP-02", idEquipo: "EQ-01" });
console.log("Resultado esperado (Bloqueo):", intentoFallido);

// PASO 4: Consultar quién tiene el equipo 'EQ-01'
console.log("\n🔹 4. Consultando quién tiene el equipo 'EQ-01' actualmente:");
const consultaQuien = controller.verQuienTieneEquipo("EQ-01");
console.log(consultaQuien.data);

// PASO 5: Registrar la devolución del equipo
console.log("\n🔹 5. Se registra la devolución del préstamo:");
const idPrestamoGenerado = prestamo1.prestamo.id;
const devolucion = controller.devolverEquipo(idPrestamoGenerado);
console.log("Resultado de devolución:", devolucion);

// PASO 6: Verificar que el equipo quedó disponible de nuevo
console.log("\n🔹 6. Verificando estado final de equipos disponibles:");
const resFinal = controller.listarEquiposDisponibles();
console.table(resFinal.data.map(e => ({ ID: e.id, Nombre: e.nombre, Estado: e.estado })));

console.log("\n✅ Todas las pruebas de la arquitectura y repositorios pasaron con éxito.");
