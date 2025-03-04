# PERSONAL BUDGET

## Descripción
Una aplicación JavaScript simple que te ayuda a realizar un seguimiento de tus finanzas personales mediante el registro de ingresos y egresos. El programa te permite registrar transacciones y proporciona un resumen de tus movimientos financieros.

## Cómo funciona
1. El programa comienza solicitando los detalles de la transacción:
   - Nombre de la transacción
   - Tipo de transacción (1 para Ingreso, 2 para Egreso)
   - Monto de la transacción

2. Después de cada transacción, puedes elegir:
   - Agregar otra transacción
   - Finalizar y ver el resumen

3. Al finalizar, el programa muestra una tabla resumen con:
   - Total de ingresos
   - Total de egresos
   - Balance final
   - Número total de transacciones

## Funciones

### registrarIngresoOEgreso()
- Función principal que maneja el registro de transacciones
- Utiliza prompts para recolectar la información de la transacción
- Almacena las transacciones en un arreglo global
- Continúa hasta que el usuario decida terminar

### calcularIngresoOEgreso()
- Calcula el total de ingresos y egresos
- Procesa todas las transacciones registradas
- Calcula el balance final
- Contabiliza el número total de transacciones
- Almacena los resultados en un arreglo global

### mostrarIngresoOEgreso()
- Muestra el resumen financiero
- Presenta una tabla con los totales de ingresos, egresos, balance y cantidad de transacciones en consola

## Autor

- **GitHub**: [github-eber2k1](https://github.com/eber2k1)  
- **Correo**: lit27k@gmail.com