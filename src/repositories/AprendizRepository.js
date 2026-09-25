import { db } from "../data/db.js";

// Repositorio para la gestion de datos de aprendices
export class AprendizRepository {
  // Guardar aprendiz
  guardar(aprendiz) {
    db.aprendices.push(aprendiz);
    return aprendiz;
  }

  // Buscar aprendiz por identificador o documento
  buscarPorId(idODocumento) {
    return db.aprendices.find(
      (a) => a.id === idODocumento || a.documento === idODocumento
    ) || null;
  }

  // Listar todos los aprendices registrados
  listarTodos() {
    return [...db.aprendices];
  }
}
