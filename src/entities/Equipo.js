// Entidad Equipo
export class Equipo {
  constructor({ id, codigoSerial, nombre, tipo, estado = "Disponible" }) {
    this.id = id;
    this.codigoSerial = codigoSerial;
    this.nombre = nombre;
    this.tipo = tipo;
    this.estado = estado; // "Disponible" o "Prestado"
  }
}
