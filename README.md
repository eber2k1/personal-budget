# 📌 Personal Budget

Aplicación web moderna para gestionar tus finanzas personales, permitiendo registrar ingresos y egresos con un resumen detallado de tus movimientos financieros.

## 🛠️ Descripción
**Personal Budget** es una aplicación desarrollada con **JavaScript**, **HTML5** y **Tailwind CSS** que facilita el seguimiento de tus finanzas diarias, mostrando un resumen claro de los ingresos, egresos y balance final en una interfaz moderna y fácil de usar.

## ✨ Características

- **💼 Gestión de transacciones**
  - Registro de ingresos y gastos
  - Validación de datos en tiempo real
  - Alertas informativas para feedback al usuario

- **📊 Dashboard financiero**
  - Resumen visual de balance total
  - Total de ingresos y gastos
  - Actualización en tiempo real

- **🎨 Interfaz de usuario moderna**
  - Diseño responsivo para todos los dispositivos
  - Construido con Tailwind CSS
  - Iconografía con Font Awesome
  - Efectos visuales y transiciones suaves

## 🚀 Cómo usar

1. **Registro de transacciones:**
   - Completa el formulario con la descripción y monto
   - Selecciona el tipo de transacción (ingreso o gasto)
   - Haz clic en "Guardar Transacción"

2. **Visualización de datos:**
   - Revisa el historial de transacciones en la tabla


## 🔧 Tecnologías utilizadas

- **Frontend:**
  - HTML5
  - JavaScript (Vanilla)
  - [Tailwind CSS](https://tailwindcss.com/) para estilos
  - [Font Awesome](https://fontawesome.com/) para iconografía

##   Estructura del proyecto

```
personal-budget/
├── index.html      # Estructura y componentes de la interfaz
├── app.js          # Lógica de la aplicación y manipulación del DOM
└── README.md       # Documentación del proyecto
```

## 🔑 Funcionalidades principales

### 📌 Gestión de transacciones
- Validación de datos antes de registrar una transacción
- Feedback visual mediante alertas personalizadas
- Actualización automática del balance y resumen


###   Interfaz de usuario
- Diseño moderno y responsivo
- Tarjetas informativas con efectos visuales
- Formularios intuitivos con validación en tiempo real
- Tabla de datos con estilos personalizados según el tipo de transacción

##  📝 Historial de Usuarios

### 🔍 HU1: Búsqueda de transacciones por descripción

**Como** usuario del gestor de presupuesto personal, **quiero** poder buscar transacciones por su descripción **para** encontrar rápidamente movimientos específicos en mi historial.

**Criterios de Aceptación:**
1. Debe haber un campo de búsqueda en la sección de historial de transacciones con un ícono de lupa y un texto placeholder que diga "Buscar por descripción...".

2. La búsqueda debe filtrar las transacciones en tiempo real mientras el usuario escribe, mostrando solo aquellas que contengan el texto ingresado, sin distinguir entre mayúsculas y minúsculas. Si no hay coincidencias, debe aparecer un mensaje indicando que no hay resultados.

3. El campo de búsqueda debe poder usarse con el teclado, tener buen contraste visual y mantener el mismo diseño, colores y estilo de la aplicación.

### 🔍 HU2: Filtrar transacciones por tipo

**Como** usuario del gestor de presupuesto personal, **quiero** filtrar las transacciones por su tipo (ingresos, gastos o todos) **para** ver solo los movimientos que me interesan.

**Criterios de Aceptación:**
1. Debe haber un grupo de opciones tipo radio en la sección de historial de transacciones para seleccionar entre "Todos", "Ingresos" y "Gastos".

2. Al elegir una opción, la tabla debe actualizarse inmediatamente para mostrar solo las transacciones del tipo seleccionado, manteniendo cualquier filtro de búsqueda por texto ingresado.

3. Los filtros deben estar claramente identificados con iconos y colores distintivos (verde para ingresos, rojo para gastos), ser accesibles con el teclado y mantener el mismo diseño y estilo de la aplicación. 

## 🧑‍💻 Autor
- **GitHub**: [github-eber2k1](https://github.com/eber2k1)  
- **Correo**: lit27k@gmail.com
