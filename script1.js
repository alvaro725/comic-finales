// Variable global para almacenar los datos
let datos = [];

// Variable para controlar si estamos editando y cuál índice
let indiceEditar = -1;

function validar() {
  // Limpiar errores
  document.getElementById('errorNombre').textContent = '';
  document.getElementById('errorEmail').textContent = '';

  // Obtener valores
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();

  let esValido = true;

  // Validar nombre
  if (nombre === '') {
    document.getElementById('errorNombre').textContent = 'El nombre es obligatorio.';
    esValido = false;
  }

  // Validar email simple
  if (email === '') {
    document.getElementById('errorEmail').textContent = 'El email es obligatorio.';
    esValido = false;
  } else if (!validarEmail(email)) {
    document.getElementById('errorEmail').textContent = 'Email no válido.';
    esValido = false;
  }

  if (!esValido) return;

  // Agregar o actualizar
  if (indiceEditar === -1) {
    datos.push({ nombre, email });
  } else {
    datos[indiceEditar] = { nombre, email };
    indiceEditar = -1;
    document.getElementById('btn').textContent = 'Enviar';
  }

  // Limpiar formulario
  document.getElementById('miFormulario').reset();

  // Mostrar tabla actualizada
  mostrarTabla();
}

function validarEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function mostrarTabla() {
  const tbody = document.getElementById('cuerpoTabla');
  tbody.innerHTML = '';

  datos.forEach((dato, index) => {
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td>${dato.nombre}</td>
      <td>${dato.email}</td>
      <td>
        <button onclick="editar(${index})">Editar</button>
        <button onclick="eliminar(${index})">Eliminar</button>
      </td>
    `;

    tbody.appendChild(fila);
  });
}

function eliminar(index) {
  if (confirm('¿Seguro que quieres eliminar este registro?')) {
    datos.splice(index, 1);
    mostrarTabla();
  }
}

function editar(index) {
  const dato = datos[index];
  document.getElementById('nombre').value = dato.nombre;
  document.getElementById('email').value = dato.email;

  indiceEditar = index;
  document.getElementById('btn').textContent = 'Actualizar';
}

