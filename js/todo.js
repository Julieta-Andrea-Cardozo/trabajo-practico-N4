const btnAgregar = document.getElementById("btnAgregar");
const inputTarea = document.getElementById("inputTarea");
const listaTareas = document.getElementById("listaTareas");
const contador = document.getElementById("contador");

const actualizarContador = () => {
  const pendientes = listaTareas.querySelectorAll("li:not(.completada)").length;
  contador.textContent = pendientes;
};

const agregarTarea = () => {
  const texto = inputTarea.value.trim();
  if (!texto) {
    alert("No podés agregar una tarea vacía.");
    return;
  }

  const li = document.createElement("li");
  li.textContent = texto;

  li.addEventListener("click", () => {
    li.classList.toggle("completada");
    actualizarContador();
  });

  const btn = document.createElement("button");
  btn.textContent = "🗑️";
  btn.className = "btn-eliminar";
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); 
    li.remove();
    actualizarContador();
  });

  li.appendChild(btn);
  listaTareas.appendChild(li);
  inputTarea.value = "";
  actualizarContador();
};

btnAgregar.addEventListener("click", agregarTarea);

inputTarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter") agregarTarea();
});