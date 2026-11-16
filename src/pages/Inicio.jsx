import { Link } from "react-router";

export default function Inicio() {
  return (
    <section>
      <h1>Tu próxima historia comienza aquí</h1>
      <p>
        Bienvenido a Entre Páginas. Explora nuestras categorías y
        encuentra tu próxima lectura.
      </p>

      <Link to="/categorias">Explorar categorías</Link>
    </section>
  );
}