import { db } from "../data/db.js";

// Repositorio encargado del acceso a datos de los Aprendices
export class AprendizRepository {
  // Guardar nuevo aprendiz
  guardar(aprendiz) {
    db.aprendices.push(aprendiz);
    return aprendiz;
  }

  // Buscar por ID o por documento
  buscarPorId(idODocumento) {
    return db.aprendices.find(
      (a) => a.id === idODocumento || a.documento === idODocumento
    ) || null;
  }

  // Listar todos los aprendices
  listarTodos() {
    return [...db.aprendices];
  }
}
