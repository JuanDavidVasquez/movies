# Movie API

Este es un servicio RESTful para la gestión de usuarios, películas y categorías. Permite a los usuarios marcar películas como vistas y obtener listados con filtros.

## 📌 Características
- Gestión de usuarios.
- Gestión de películas y categorías.
- Filtrado de películas por categoría.
- Registro de películas vistas por usuarios.
- API documentada con Postman.
- Desplegable en Render.

## 📂 Modelo Relacional

La base de datos se estructura de la siguiente manera:

- **Users** (Usuarios)
  - `id` (UUID, Primary Key)
  - `name` (STRING, No nulo)
  - `email` (STRING, Único, No nulo)
  - `password` (STRING, No nulo)
  - `created_at` (TIMESTAMP)
  - `updated_at` (TIMESTAMP)

- **Movies** (Películas)
  - `id` (UUID, Primary Key)
  - `title` (STRING, No nulo)
  - `release_date` (DATE, No nulo)
  - `category_id` (UUID, Foreign Key → Categories.id)
  - `created_at` (TIMESTAMP)
  - `updated_at` (TIMESTAMP)

- **Categories** (Categorías)
  - `id` (UUID, Primary Key)
  - `name` (STRING, Único, No nulo)
  - `created_at` (TIMESTAMP)
  - `updated_at` (TIMESTAMP)

- **UserMovies** (Películas vistas por usuarios)
  - `id` (UUID, Primary Key)
  - `user_id` (UUID, Foreign Key → Users.id)
  - `movie_id` (UUID, Foreign Key → Movies.id)
  - `watched_at` (TIMESTAMP, Default: NOW)


## 🛠️ Endpoints

### 👤 Usuarios
| Método | Endpoint | Descripción |
|--------|---------|-------------|
| GET | `/users` | Lista todos los usuarios |
| POST | `/users` | Crea un nuevo usuario |

### 🎬 Películas
| Método | Endpoint | Descripción |
|--------|---------|-------------|
| GET | `/movies?category=drama` | Filtra películas por categoría |
| POST | `/movies` | Crea una nueva película |
| GET | `/movies/:id` | Obtiene una película por su ID |
| PUT | `/movies/:id` | Actualiza una película |
| DELETE | `/movies/:id` | Elimina una película |
| GET | `/movies/new-releases` | Obtiene estrenos recientes |
| POST | `/movies/mark-watched` | Un usuario marca una película como vista |

### 🎭 Categorías
| Método | Endpoint | Descripción |
|--------|---------|-------------|
| GET | `/categories` | Lista todas las categorías |
| POST | `/categories` | Crea una nueva categoría |

### 🎞️ Películas vistas
| Método | Endpoint | Descripción |
|--------|---------|-------------|
| GET | `/users-with-watched-movies` | Lista usuarios con películas vistas |


---

## 📝 Notas adicionales
- La API utiliza **Sequelize** con **TypeScript**.
- Se recomienda usar **PostgreSQL** en producción.



