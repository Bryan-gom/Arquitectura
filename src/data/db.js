// Base de datos en memoria para el sistema de prestamos
export const db = {
  aprendices: [
    {
      id: "AP-01",
      documento: "1020304050",
      nombreCompleto: "Bryan Gómez",
      ficha: "ADSO-2826",
      correo: "bryan@sena.edu.co"
    },
    {
      id: "AP-02",
      documento: "1098765432",
      nombreCompleto: "Valery Castro",
      ficha: "ADSO-2826",
      correo: "valery@sena.edu.co"
    }
  ],
  equipos: [
    {
      id: "EQ-01",
      codigoSerial: "LEN-88912",
      nombre: "Portátil Lenovo ThinkPad E14",
      tipo: "Portátil",
      estado: "Disponible"
    },
    {
      id: "EQ-02",
      codigoSerial: "DELL-44321",
      nombre: "Portátil Dell Inspiron 15",
      tipo: "Portátil",
      estado: "Disponible"
    },
    {
      id: "EQ-03",
      codigoSerial: "CHG-65W-01",
      nombre: "Cargador Universal 65W Tipo C",
      tipo: "Cargador",
      estado: "Disponible"
    }
  ],
  prestamos: []
};
