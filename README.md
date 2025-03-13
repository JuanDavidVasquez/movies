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
# 🚀 Cuestionario Técnico  

## 📌 Preguntas y Respuestas  

### 1⃣ ¿Cuál es el propósito de `module.exports`?  
En **Node.js**, `module.exports` se usa para exportar funciones, objetos o variables de un archivo, permitiendo su reutilización en otros módulos con `require` o `import`.  
💡 **Nota:** Actualmente, prefiero utilizar `export` e `import` en mis proyectos con **TypeScript**.  

---  

### 2⃣ ¿Qué es un middleware?  
Es una **función intermedia** en **Express** (u otro framework) que procesa la solicitud antes de enviarla a la ruta final.  
Se usa comúnmente para:  
✔ **Autenticación** (JWT, Passport.js).  
✔ **Validaciones** (express-validator, yup).  
✔ **Logs y monitoreo** (Morgan, Winston).  
✔ **Manejo de errores personalizados**.  

---

### 3⃣ ¿Cuál es la diferencia entre código bloqueante y código no bloqueante?  
🔹 **Bloqueante:** Ejecuta operaciones en secuencia, **deteniendo la ejecución** hasta que termine cada tarea.  
🔹 **No bloqueante:** Permite ejecutar múltiples tareas de manera **asíncrona**, sin bloquear el hilo principal.  

💡 **Ejemplo en Node.js:**  
```js
// Código Bloqueante (Sincrónico)
const fs = require("fs");
const data = fs.readFileSync("archivo.txt", "utf8");
console.log(data); // Bloquea hasta que el archivo se lea completamente

// Código No Bloqueante (Asíncrono)
fs.readFile("archivo.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
console.log("Esto se ejecuta antes de leer el archivo"); // No espera
```

---

### 4⃣ ¿Qué biblioteca de JavaScript usaría para manejar datos en tiempo real?  
🔹 **Socket.IO** → Ideal para **WebSockets** en **React, NestJS o Node.js**, permitiendo comunicación en tiempo real.  

📌 **Otras opciones:**  
- **Redis Pub/Sub** → Para sincronización en múltiples instancias.  
- **Firebase Realtime Database** → Para actualizaciones en tiempo real sin backend propio.  

---

### 5⃣ ¿Cuál es la principal ventaja de trabajar un proyecto dockerizado?  
🛠 **Portabilidad y consistencia**. Docker permite que una aplicación se ejecute en cualquier entorno sin importar el sistema operativo o configuración.  

✔ Se evita el clásico: "En mi máquina funciona, pero en producción no".  
✔ Facilita la configuración y despliegue en cualquier servidor.  
✔ Aisla dependencias para evitar conflictos.  

---

### 6⃣ ¿Cuál es la diferencia entre una imagen y un volumen en Docker?  
📌 **Imagen:** Es la plantilla que contiene la aplicación y sus dependencias. Ejemplo: `node:18-alpine`.  
📌 **Volumen:** Es el almacenamiento persistente que sobrevive incluso cuando los contenedores se eliminan.  

💡 **Ejemplo práctico:**  
```sh
docker run -d -v ./data:/var/lib/mysql mysql:latest
```
✅ **La imagen** contiene MySQL, pero **los datos quedan almacenados en el volumen**.  

---

### 7⃣ ¿Con qué herramienta se puede orquestar un proyecto con múltiples imágenes en Docker?  
🔹 **Docker Compose** → Para entornos de desarrollo y pequeñas implementaciones.  
🔹 **Kubernetes** → Para escalar y gestionar múltiples servicios en producción.  

💡 **Ejemplo de `docker-compose.yml` básico:**  
```yaml
version: '3.8'
services:
  app:
    image: node:18
    volumes:
      - .:/usr/src/app
    ports:
      - "3000:3000"
```

---

### 8⃣ ¿Cuál es la principal ventaja de trabajar con un clúster de Kubernetes?  
🌍 **Escalabilidad y tolerancia a fallos.**  
Kubernetes permite distribuir la carga entre múltiples nodos, asegurando:  
✔ **Alta disponibilidad** y balanceo de carga.  
✔ **Automatización de despliegues** y escalado.  
✔ **Recuperación automática de fallos**.  

💡 Aunque aún no lo uso en proyectos reales, conozco la teoría y su potencial en arquitecturas escalables.

---

✨ **Espero que este cuestionario refleje mis conocimientos y experiencia en desarrollo backend y frontend.** 🚀




