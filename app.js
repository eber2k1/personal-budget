console.log("<------- Personal Budget -------->");

// Descripción del objetivo del programa
/**
 * "Como usuario, quiero registrar el nombre, tipo(ingreso ó egreso) y monto 
 * de una compra o ingreso, para llevar un control de mi dinero."
 * Criterios de Aceptación:
 * El sistema solicita el nombre y duración.
 * Si el nombre está vacío o la duración es menor o igual a cero, muestra un mensaje de error.
 * Si los datos son válidos, se guarda la actividad.
 */

// Variables globales
const transacciones = [];
const resumenTransaccionces = [];

// Función que registra transacciones
function registrarIngresoOEgreso() {
  while (true) {
    const transaccion = prompt("Ingrese la nueva transacción");
    const tipoDeTransaccion = prompt(
      "Escoja el tipo de transacción \n1) Ingreso\n2) Egreso\n\n Solo debe poner el número de la opción"
    );
    const monto = prompt("Ingrese el monto de la transacción");

    transacciones.push({
      transaccion,
      tipoDeTransaccion,
      monto,
    });

    const confirmacion = confirm("Desea agregar otra transacción?");
    if (confirmacion === false) {
      break;
    }
  }
}

// Función que calcula el ingreso y egreso total
function calcularIngresoOEgreso() {
  let ingresos = 0;
  let egresos = 0;
  let cantidadDeTransacciones = 0;

  for (let i = 0; i < transacciones.length; i++) {
    const transaccionActual = transacciones[i];
    if (transaccionActual.tipoDeTransaccion === "1") {
      ingresos += Number(transaccionActual.monto);
    } else if (transaccionActual.tipoDeTransaccion === "2") {
      egresos += Number(transaccionActual.monto);
    }
    cantidadDeTransacciones++;
  }

  const total = ingresos - egresos;
  resumenTransaccionces.push({
    ingresos,
    egresos,
    total,
    cantidadDeTransacciones,
  });
}

// Función que muestra el resumen de transacciones
function mostrarIngresoOEgreso() {
  calcularIngresoOEgreso();
  console.table(resumenTransaccionces);
}

// Ejecución de las funciones
registrarIngresoOEgreso();
mostrarIngresoOEgreso();

// Función que mapea los nombres de las transacciones
const nombreMovimientos = transacciones.map((transaccion) => transaccion.transaccion);
console.log(transacciones);
console.log(nombreMovimientos);

// Función que filtra las transacciones mayores a 100
const masDe100 = transacciones.filter((transaccion) => transaccion.tipoDeTransaccion === '2' && transaccion.monto > 100);
console.log(masDe100);

// Función que busca una transacción por nombre
const nombredelatransaccion = prompt("Ingrese el nombre de la transacción que desea buscar");
const buscarMovimiento = transacciones.find((transaccion) => transaccion.transaccion === nombredelatransaccion);
console.log(buscarMovimiento);