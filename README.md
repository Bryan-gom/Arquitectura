# Sistema de Préstamo de Equipos – SENA (ADSO)

Proyecto de demostración de **Arquitectura en Capas** y **Patrón Repositorio** para la actividad de Arquitectura de Software.

---

## 📁 Estructura del Proyecto en VS Code

```text
sistema-prestamo-sena/
│
├── src/
│   ├── data/
│   │   └── db.js                    # Base de datos simulada en memoria
│   │
│   ├── entities/                    # Modelos / Entidades del negocio
│   │   ├── Aprendiz.js              # Entidad Aprendiz
│   │   ├── Equipo.js                # Entidad Equipo
│   │   └── Prestamo.js              # Entidad Préstamo
│   │
│   ├── repositories/                # Patrón Repositorio (Acceso a Datos)
│   │   ├── AprendizRepository.js    # Consultas y guardado de aprendices
│   │   ├── EquipoRepository.js      # Consultas de disponibilidad y estados
│   │   └── PrestamoRepository.js    # Registro de préstamos y devoluciones
│   │
│   ├── services/                    # Capa de Lógica de Negocio
│   │   └── PrestamoService.js       # Reglas de negocio (validaciones, bloqueos)
│   │
│   ├── controllers/                 # Capa de Controladores / Presentación
│   │   └── PrestamoController.js    # Manejo de peticiones y respuestas
│   │
│   └── index.js                     # Archivo principal de ejecución y pruebas
│
├── package.json
└── README.md
```

---

## ⚙️ Cómo ejecutar el proyecto

1. Abre una terminal en la carpeta del proyecto en VS Code:
```bash
node src/index.js
```

2. O con npm:
```bash
npm start
```

---

## 🧠 ¿Cómo funciona cada capa?

1. **Entities (`src/entities/`):** Definen la estructura de los objetos (qué datos tiene un Aprendiz, un Equipo o un Préstamo).
2. **Repositories (`src/repositories/`):** Son los únicos que tocan la base de datos (`db.js`). Tienen métodos como `guardar()`, `buscarPorId()` y `actualizarEstado()`.
3. **Services (`src/services/`):** El cerebro del sistema. Valida si el equipo está disponible antes de prestarlo. Si ya está prestado, bloquea la acción.
4. **Controllers (`src/controllers/`):** Reciben las peticiones del usuario o de una vista web y entregan las respuestas con formato de éxito o error.
