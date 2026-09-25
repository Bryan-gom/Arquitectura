// Entidad Aprendiz
export class Aprendiz {
  constructor({ id, documento, nombreCompleto, ficha, correo }) {
    this.id = id;
    this.documento = documento;
    this.nombreCompleto = nombreCompleto;
    this.ficha = ficha;
    this.correo = correo;
  }
}
