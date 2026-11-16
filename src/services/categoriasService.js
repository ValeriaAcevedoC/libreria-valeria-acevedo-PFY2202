const API_URL = "http://localhost:3001/categorias";
const DURACION_CACHE = 60_000;

let cache = null;
let fechaCache = 0;
let peticionPendiente = null;

export function obtenerCategorias() {
  const cacheVigente =
    cache !== null && Date.now() - fechaCache < DURACION_CACHE;

  if (cacheVigente) {
    return Promise.resolve(cache);
  }

  if (peticionPendiente) {
    return peticionPendiente;
  }

  peticionPendiente = consultarCategorias().finally(() => {
    peticionPendiente = null;
  });

  return peticionPendiente;
}

async function consultarCategorias() {
  const controller = new AbortController();
  const temporizador = setTimeout(() => controller.abort(), 8000);

  try {
    const respuesta = await fetch(API_URL, {
      signal: controller.signal,
    });

    if (!respuesta.ok) {
      if (respuesta.status === 404) {
        throw new Error("No se encontró el servicio de categorías.");
      }

      if (respuesta.status >= 500) {
        throw new Error("El servidor tiene un problema. Intenta nuevamente.");
      }

      throw new Error(`No se pudo completar la consulta (${respuesta.status}).`);
    }

    const datos = await respuesta.json();

    const datosValidos =
      Array.isArray(datos) &&
      datos.every(
        (categoria) =>
          categoria !== null &&
          typeof categoria === "object" &&
          ["string", "number"].includes(typeof categoria.id) &&
          typeof categoria.nombre === "string" &&
          typeof categoria.descripcion === "string"
      );

    if (!datosValidos) {
      throw new Error("El servidor entregó categorías con un formato incorrecto.");
    }

    cache = datos;
    fechaCache = Date.now();

    return datos;
    } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        "La consulta tardó demasiado. Vuelve a intentarlo.",
        { cause: error }
      );
    }

    if (error instanceof TypeError) {
      throw new Error(
        "No pudimos conectar con el servidor. Revisa tu conexión y que la API esté encendida.",
        { cause: error }
      );
    }

    throw error;
  } finally {
    clearTimeout(temporizador);
  }
}