const productos = [
  { id: 1, nombre: "Remera básica", precio: 15000, categoria: "ropa", enStock: true , imagen:"imagenes/remera.png" },
  { id: 2, nombre: "Zapatillas topper", precio: 45000, categoria: "deportes", enStock: true , imagen:"imagenes/topper.png" },
  { id: 3, nombre: "Auriculares JBL", precio: 32000, categoria: "electronica", enStock: false ,imagen:"imagenes/auri.png"},
  { id: 4, nombre: "Silla gamer", precio: 148000, categoria: "hogar", enStock: false , imagen:"imagenes/silla.png"},
  { id: 5, nombre: "Campera invierno", precio: 28000, categoria: "ropa", enStock: true ,imagen:"imagenes/campera.png" },
  { id: 6, nombre: "Teclado mecánico", precio: 39000, categoria: "electronica", enStock: true , imagen:"imagenes/teclado.png"},
  { id: 7, nombre: "Pelota fútbol", precio: 12000, categoria: "deportes", enStock: false , imagen: "imagenes/pelota.png"},
  { id: 8, nombre: "Lámpara impresa en 3d", precio: 9000, categoria: "hogar", enStock: true , imagen: "imagenes/3d.png"},

]
  
const renderProductos = () => {
  const categoria = document.getElementById("categoria").value;
  const precioMax = Number(document.getElementById("precio").value);
  const soloStock = document.getElementById("stock").checked;
  const texto = document.getElementById("busqueda").value.toLowerCase();

  let resultado = productos
    .filter(p => !categoria || p.categoria === categoria)
    .filter(p => p.precio <= precioMax)
    .filter(p => !soloStock || p.enStock)
    .filter(p => p.nombre.toLowerCase().includes(texto));

  const contenedor = document.getElementById("contenedor-productos");

  if (resultado.length === 0) {
    contenedor.innerHTML = `<p class="empty">No se encontraron productos.</p>`;
    return;
  }

  contenedor.innerHTML = resultado.map(p => `
    <div class="card">
    <img src="${p.imagen}" alt="${p.nombre}" style="width:100%; height:150px; object-fit:cover; border-radius:8px;">
    
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <p>Categoría: ${p.categoria}</p>
      <p>${p.enStock ? "✅ En stock" : "❌ Sin stock"}</p>
    </div>
  `).join("");
};

document.getElementById("categoria").addEventListener("change", renderProductos);
document.getElementById("stock").addEventListener("change", renderProductos);
document.getElementById("busqueda").addEventListener("input", renderProductos);
document.getElementById("precio").addEventListener("input", (e) => {
  document.getElementById("valorPrecio").textContent = e.target.value;
  renderProductos();
});

renderProductos();