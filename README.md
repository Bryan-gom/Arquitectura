# Sistema de Prestamo de Equipos - SENA

Implementacion de arquitectura en capas y patron repositorio para el sistema de gestion de prestamos de equipos de formacion.

## Estructura del Proyecto

```text
sistema-prestamo-sena/
├── src/
│   ├── controllers/
│   │   └── PrestamoController.js
│   ├── data/
│   │   └── db.js
│   ├── entities/
│   │   ├── Aprendiz.js
│   │   ├── Equipo.js
│   │   └── Prestamo.js
│   ├── repositories/
│   │   ├── AprendizRepository.js
│   │   ├── EquipoRepository.js
│   │   └── PrestamoRepository.js
│   ├── services/
│   │   └── PrestamoService.js
│   └── index.js
├── package.json
└── README.md
```

## Descripcion de Capas

1. **Entidades (src/entities):** Definen las estructuras y modelos de datos del sistema (Aprendiz, Equipo y Prestamo).
2. **Repositorios (src/repositories):** Implementan el patron repositorio para encapsular las operaciones de lectura, insercion y actualizacion en la fuente de datos.
3. **Servicios (src/services):** Contienen la logica de negocio, validaciones de disponibilidad de equipos y reglas de operacion.
4. **Controladores (src/controllers):** Gestionan las peticiones entrantes y estructuran las respuestas del sistema.
5. **Punto de entrada (src/index.js):** Ejecuta la integracion de las capas y las pruebas de los casos de uso.

## Instrucciones de Ejecucion

Para ejecutar la aplicacion y las pruebas integradas:

```bash
npm start
```

O directamente mediante Node.js:

```bash
node src/index.js
```
