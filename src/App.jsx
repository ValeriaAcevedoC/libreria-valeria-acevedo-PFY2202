import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
} from "react-router";
import Inicio from "./pages/Inicio";
import Categorias from "./pages/Categorias";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="encabezado">
          <Link to="/" className="marca">
            Entre Páginas
          </Link>

          <nav aria-label="Navegación principal">
            <NavLink to="/" end>
              Inicio
            </NavLink>
            <NavLink to="/categorias">
              Categorías
            </NavLink>
          </nav>
        </header>

        <main className="contenido">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route
              path="*"
              element={
                <section>
                  <h1>Página no encontrada</h1>
                  <p>La dirección que buscas no existe.</p>
                  <Link to="/">Volver al inicio</Link>
                </section>
              }
            />
          </Routes>
        </main>

        <footer className="pie">
          <p>Entre Páginas · Un mundo de historias por descubrir</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}