// ==========================================
// VARIABLES GLOBALES
// ==========================================
const transacciones = [];
const form = document.querySelector("form");
const transactionList = document.querySelector("#transaction-list");
const alertBox = document.querySelector("#alert-box");

// ==========================================
// CONSTRUCTOR Y MÉTODOS DE MOVIMIENTO
// ==========================================

/**
 * Constructor para crear un nuevo movimiento
 */
function Movimiento(tipo, monto, descripcion) {
  this.tipo = tipo;
  this.monto = monto;
  this.descripcion = descripcion;
  this.fecha = new Date();
}

/**
 * Método para validar un movimiento
 * @returns {Object} Resultado de la validación
 */
Movimiento.prototype.validarMovimiento = function () {
  if (this.monto <= 0) {
    return {
      ok: false,
      message: "El monto debe ser mayor a 0",
    };
  }
  
  if (this.descripcion.trim() === "") {
    return {
      ok: false,
      message: "Debe completar la descripcion",
    };
  }
  
  if (!["ingreso", "gasto"].includes(this.tipo)) {
    return {
      ok: false,
      message: "El valor tipo es erroneo",
    };
  }

  return {
    ok: true,
    message: "Movimiento registrado correctamente",
  };
};

/**
 * Método para formatear la fecha
 * @returns {string} Fecha formateada como dd/mm/yyyy hh:mm:ss
 */
Movimiento.prototype.formatDate = function() {
  const day = String(this.fecha.getDate()).padStart(2, '0');
  const month = String(this.fecha.getMonth() + 1).padStart(2, '0');
  const year = this.fecha.getFullYear();
  const hours = String(this.fecha.getHours()).padStart(2, '0');
  const minutes = String(this.fecha.getMinutes()).padStart(2, '0');
  const seconds = String(this.fecha.getSeconds()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

/**
 * Método para renderizar un movimiento en la tabla
 */
Movimiento.prototype.render = function () {
  const esEgreso = this.tipo === "gasto";
  const colorTexto = esEgreso ? "text-red-600" : "text-green-600";
  const colorFondo = esEgreso ? "bg-red-200" : "bg-green-200";
  const signo = esEgreso ? "-" : "+";

  const newRow = `
    <tr class="hover:${colorFondo} ${colorFondo}/30 transition-colors duration-200">
      <td class="px-4 py-3 font-medium">${this.descripcion}</td>
      <td class="px-4 py-3 ${colorTexto} font-bold">${signo}$${Math.abs(
    this.monto
  ).toFixed(2)}</td>
      <td class="px-4 py-3 text-gray-500">${this.formatDate()}</td>
      <td class="px-4 py-3">
        <span class="inline-block rounded-full px-3 py-1 text-xs ${colorFondo} ${colorTexto}">
          ${this.tipo}
        </span>
      </td>
    </tr>
  `;

  transactionList.innerHTML += newRow;
};

// ==========================================
// FUNCIONES DE UTILIDAD
// ==========================================

/**
 * Muestra una alerta personalizada
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo de alerta ('error' o 'success')
 */
function mostrarAlerta(mensaje, tipo) {
  alertBox.innerHTML = `
    <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span class="sr-only">Info</span>
    <div>${mensaje}</div>
  `;

  alertBox.className = `
    fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg flex items-center border 
    ${tipo === "error" ? "text-red-800 border-red-300 bg-red-50" : "border-green-300 text-green-800 bg-green-50"}
  `;

  alertBox.classList.remove("hidden");

  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 3000);
}

/**
 * Obtiene los datos del formulario
 * @returns {Object} Datos del formulario
 */
function getDataFromForm() {
  const type = document.querySelector('input[name="type"]:checked').value;
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  
  return {
    type,
    amount,
    description
  };
}

/**
 * Crea un nuevo movimiento a partir de los datos proporcionados
 * @param {Object} movement - Datos del movimiento
 */
function createMovement(movement) {
  const nuevoMovimiento = new Movimiento(
    movement.type,
    movement.amount,
    movement.description
  );

  const validacion = nuevoMovimiento.validarMovimiento();

  if (validacion.ok) {
    transacciones.push(nuevoMovimiento);
    
    // Verificar si es el primer movimiento para limpiar el mensaje de "No hay transacciones"
    if (transacciones.length === 1) {
      transactionList.innerHTML = '';
    }
    
    nuevoMovimiento.render();
    mostrarAlerta(validacion.message, "success");
    form.reset();
  } else {
    mostrarAlerta(validacion.message, "error");
  }
}

/**
 * Recalcula y actualiza los totales en la interfaz
 */
function recalculateTotals() {
  const resumeBalance = document.querySelector("#resume-balance");
  const resumeIncome = document.querySelector("#resume-income");
  const resumeExpense = document.querySelector("#resume-expense");

  const balance = transacciones.reduce((total, mov) => {
    if (mov.tipo === "ingreso") {
      return total + Number(mov.monto);
    } else {
      return total - Number(mov.monto);
    }
  }, 0);
  resumeBalance.innerHTML = `$${balance.toFixed(2)}`;

  const income = transacciones.filter(mov => mov.tipo === "ingreso").reduce((total, mov) => total + Number(mov.monto), 0);
  resumeIncome.innerHTML = `$${income.toFixed(2)}`;

  const expense = transacciones.filter(mov => mov.tipo === "gasto").reduce((total, mov) => total + Number(mov.monto), 0);
  resumeExpense.innerHTML = `$${expense.toFixed(2)}`;
}

// ==========================================
// EVENT LISTENERS
// ==========================================

// Escuchamos el evento submit del formulario
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const newMovement = getDataFromForm();
  createMovement(newMovement);
  recalculateTotals();
});