# Librería Entre Páginas

Proyecto de Valeria Acevedo para PFY2202. Aplicación web que permite explorar categorías de libros y consultar sus descripciones desde una API local.

## Funcionalidades

- Página de inicio con acceso al listado de categorías.
- Navegación entre Inicio y Categorías sin recargar la página.
- Consulta de categorías desde una API creada con JSON Server.
- Mensajes de carga, listado vacío y errores de conexión.
- Botón para reintentar una consulta que falló.
- Página de aviso para direcciones inexistentes.
- Caché de categorías durante 60 segundos y tiempo máximo de consulta de 8 segundos.

## Tecnologías

- React.
- React Router.
- Vite.
- JavaScript y CSS.
- JSON Server.
- ESLint.

## Requisitos

Node.js 22.12 o superior y npm.

## Instalación y ejecución

1. Abre una terminal en la carpeta del proyecto.
2. Instala las dependencias con `npm install`.
3. Inicia la API con `npx json-server db.json --port 3001`.
4. Abre otra terminal en la misma carpeta y ejecuta `npm run dev`.
5. Abre en el navegador la dirección que indique Vite, normalmente http://localhost:5173.

Mantén ambas terminales abiertas mientras usas la aplicación. La API de categorías está disponible en http://localhost:3001/categorias.

## Comandos disponibles

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la versión de producción en la carpeta `dist`.
- `npm run preview`: permite revisar localmente la versión de producción después de compilarla.
- `npm run lint`: revisa el código con ESLint.
- `npx json-server db.json --port 3001`: inicia la API local.

## Organización del proyecto

- `src/App.jsx`: estructura principal y rutas de navegación.
- `src/main.jsx`: punto de entrada de React.
- `src/pages/Inicio.jsx`: página de bienvenida.
- `src/pages/Categorias.jsx`: listado de categorías y estados de la consulta.
- `src/services/categoriasService.js`: conexión con la API, caché y manejo de errores.
- `src/App.css` y `src/index.css`: estilos de la aplicación.
- `db.json`: datos de las categorías utilizados por JSON Server.
- `vite.config.js`: configuración de Vite.

## Datos y configuración

Cada categoría contiene un identificador (`id`), un nombre (`nombre`) y una descripción (`descripcion`). El archivo `db.json` incluye las categorías Ficción, Ciencia ficción, Fantasía, Misterio, Historia e Infantil.

La dirección de la API se configura en la constante `API_URL` de `src/services/categoriasService.js`. Si cambias el puerto de JSON Server, actualiza también esa dirección.
