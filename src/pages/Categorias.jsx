import { useEffect, useState } from "react";
import { Link } from "react-router";
import { obtenerCategorias } from "../services/categoriasService";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let activo = true;

    obtenerCategorias()
      .then((datos) => {
        if (activo) {
          setCategorias(datos);
        }
      })
      .catch((errorConsulta) => {
        if (activo) {
          setError(errorConsulta.message);
        }
      })
      .finally(() => {
        if (activo) {
          setCargando(false);
        }
      });

    return () => {
      activo = false;
    };
  }, [intento]);

  function reintentar() {
    setError("");
    setCargando(true);
    setIntento((valor) => valor + 1);
  }

  return (
    <section aria-labelledby="titulo-categorias" aria-busy={cargando}>
      <h1 id="titulo-categorias">Categorías de libros</h1>
      <p>Encuentra una historia según tus intereses.</p>

      {cargando && (
        <p role="status">Cargando categorías…</p>
      )}

      {!cargando && error && (
        <div className="mensaje-error" role="alert">
          <h2>No pudimos cargar las categorías</h2>
          <p>{error}</p>
          <button type="button" onClick={reintentar}>
            Reintentar
          </button>
          <Link to="/">Volver al inicio</Link>
        </div>
      )}

      {!cargando && !error && categorias.length === 0 && (
        <p role="status">
          Todavía no hay categorías disponibles. Vuelve a visitarnos pronto.
        </p>
      )}

      {!cargando && !error && categorias.length > 0 && (
        <div className="lista-categorias">
          {categorias.map((categoria) => (
            <article className="tarjeta-categoria" key={categoria.id}>
              <h2>{categoria.nombre}</h2>
              <p>{categoria.descripcion}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}