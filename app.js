// ==========================================
// VARIABLES GLOBALES
// ==========================================
const transacciones = [];
const form = document.querySelector("form");
const transactionList = document.querySelector("#transaction-list");
const alertBox = document.querySelector("#alert-box");

// Referencia al campo de búsqueda
const searchInput = document.querySelector("#search-transaction");

// Referencias a los filtros de tipo
const filterAll = document.querySelector("#filter-all");
const filterIncome = document.querySelector("#filter-income");
const filterExpense = document.querySelector("#filter-expense");

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
  
  if (!["income", "expense"].includes(this.tipo)) {
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
  const esEgreso = this.tipo === "expense";
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
    if (mov.tipo === "income") {
      return total + Number(mov.monto);
    } else {
      return total - Number(mov.monto);
    }
  }, 0);
  resumeBalance.innerHTML = `$${balance.toFixed(2)}`;

  const income = transacciones.filter(mov => mov.tipo === "income").reduce((total, mov) => total + Number(mov.monto), 0);
  resumeIncome.innerHTML = `$${income.toFixed(2)}`;

  const expense = transacciones.filter(mov => mov.tipo === "expense").reduce((total, mov) => total + Number(mov.monto), 0);
  resumeExpense.innerHTML = `$${expense.toFixed(2)}`;
}

// ==========================================
// FUNCIONES DE BÚSQUEDA
// ==========================================

/**
 * Filtra las transacciones según el texto de búsqueda y el tipo seleccionado
 * @param {string} searchText - Texto para filtrar las transacciones
 * @param {string} filterType - Tipo de transacción para filtrar ('all', 'income', 'expense')
 */
function filterTransactions(searchText = '', filterType = 'all') {
  // Convertimos el texto de búsqueda a minúsculas para hacer la comparación insensible a mayúsculas/minúsculas
  const searchLower = searchText.toLowerCase();
  
  // Filtramos primero por tipo
  let filteredByType = transacciones;
  
  if (filterType !== 'all') {
    filteredByType = transacciones.filter(mov => mov.tipo === filterType);
  }
  
  // Si no hay texto de búsqueda, mostramos todas las transacciones del tipo seleccionado
  if (searchLower === '') {
    renderFilteredTransactions(filteredByType);
    return;
  }
  
  // Filtramos las transacciones por tipo y texto de búsqueda
  const filteredTransactions = filteredByType.filter(
    mov => mov.descripcion.toLowerCase().includes(searchLower)
  );
  
  renderFilteredTransactions(filteredTransactions);
}

/**
 * Renderiza las transacciones filtradas en la tabla
 * @param {Array} filteredTransactions - Array de transacciones filtradas para mostrar
 */
function renderFilteredTransactions(filteredTransactions) {
  // Limpiamos la lista de transacciones
  transactionList.innerHTML = '';
  
  // Si no hay resultados, mostramos un mensaje
  if (filteredTransactions.length === 0) {
    const currentFilterType = document.querySelector('input[name="filter-type"]:checked').value;
    const filterTypeText = currentFilterType === 'all' ? '' : 
                           currentFilterType === 'income' ? ' de ingresos' : ' de gastos';
    
    const searchText = searchInput ? searchInput.value : '';
    const searchTextMessage = searchText ? ` con "${searchText}"` : '';
    
    transactionList.innerHTML = `
      <tr class="text-sm text-gray-500">
        <td colspan="4" class="px-6 py-8 text-center">
          <i class="fas fa-search text-gray-300 text-5xl mb-3 block" aria-hidden="true"></i>
          <p>No se encontraron transacciones${filterTypeText}${searchTextMessage}</p>
          <p class="text-xs mt-1">Intenta con otros criterios de búsqueda</p>
        </td>
      </tr>
    `;
    return;
  }
  
  // Renderizamos las transacciones filtradas
  filteredTransactions.forEach(mov => mov.render());
}

/**
 * Renderiza todas las transacciones en la tabla
 */
function renderAllTransactions() {
  // Limpiamos la lista de transacciones
  transactionList.innerHTML = '';
  
  // Si no hay transacciones, mostramos el mensaje predeterminado
  if (transacciones.length === 0) {
    transactionList.innerHTML = `
      <tr class="text-sm text-gray-500">
        <td colspan="4" class="px-6 py-8 text-center">
          <i class="fas fa-receipt text-gray-300 text-5xl mb-3 block" aria-hidden="true"></i>
          <p>No hay transacciones registradas</p>
          <p class="text-xs mt-1">Las transacciones que agregues aparecerán aquí</p>
        </td>
      </tr>
    `;
    return;
  }
  
  // Renderizamos todas las transacciones
  transacciones.forEach(mov => mov.render());
}

/**
 * Obtiene el tipo de filtro seleccionado actualmente
 * @returns {string} Tipo de filtro ('all', 'income', 'expense')
 */
function getCurrentFilterType() {
  return document.querySelector('input[name="filter-type"]:checked').value;
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
  
  // Aplicamos los filtros actuales después de añadir una nueva transacción
  const currentFilterType = getCurrentFilterType();
  const searchText = searchInput ? searchInput.value : '';
  filterTransactions(searchText, currentFilterType);
});

// Escuchamos el evento input del campo de búsqueda para filtrar transacciones en tiempo real
if (searchInput) {
  searchInput.addEventListener("input", function() {
    const currentFilterType = getCurrentFilterType();
    filterTransactions(this.value, currentFilterType);
  });
}

// Escuchamos los cambios en los filtros de tipo
if (filterAll) {
  filterAll.addEventListener("change", function() {
    if (this.checked) {
      const searchText = searchInput ? searchInput.value : '';
      filterTransactions(searchText, 'all');
    }
  });
}

if (filterIncome) {
  filterIncome.addEventListener("change", function() {
    if (this.checked) {
      const searchText = searchInput ? searchInput.value : '';
      filterTransactions(searchText, 'income');
    }
  });
}

if (filterExpense) {
  filterExpense.addEventListener("change", function() {
    if (this.checked) {
      const searchText = searchInput ? searchInput.value : '';
      filterTransactions(searchText, 'expense');
    }
  });
}