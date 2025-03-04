# 📌 Personal Budget

Aplicación sencilla para gestionar tus finanzas personales, permitiendo registrar ingresos y egresos con un resumen detallado de tus movimientos financieros.

## 🛠️ Descripción
**Personal Budget** es una aplicación escrita en **JavaScript** que facilita el seguimiento de tus finanzas diarias, mostrando un resumen claro de los ingresos, egresos y balance final.

## 🚀 Cómo funciona
1. El programa solicita los siguientes datos para cada transacción:
   - 📝 Nombre de la transacción
   - 🔄 Tipo de transacción: `1` para **Ingreso**, `2` para **Egreso**
   - 💰 Monto de la transacción

2. Después de cada transacción, puedes elegir:
   - Agregar otra transacción
   - Finalizar y ver el resumen

3. Al finalizar, se muestra un resumen con:
   - 📊 Total de ingresos
   - 📉 Total de egresos
   - 💵 Balance final
   - 🔢 Número total de transacciones

## 🔑 Funciones Principales

### 📌 registrarIngresoOEgreso()
- Maneja el registro de transacciones.
- Utiliza `prompt()` para recolectar la información.
- Almacena las transacciones en un arreglo global.
- Permite múltiples registros hasta que el usuario finalice.

### 📌 calcularIngresoOEgreso()
- Calcula:
  - Total de ingresos.
  - Total de egresos.
  - Balance final.
  - Número total de transacciones.
- Almacena los resultados en un arreglo global.

### 📌 mostrarIngresoOEgreso()
- Muestra un resumen financiero con los totales y balance.
- Presenta la información en formato de tabla usando la consola.

## 📄 Ejemplo de Uso
```js
registrarIngresoOEgreso();
calcularIngresoOEgreso();
mostrarIngresoOEgreso();
```
## 🧑‍💻 Autor
- **GitHub**: [github-eber2k1](https://github.com/eber2k1)  
- **Correo**: lit27k@gmail.com