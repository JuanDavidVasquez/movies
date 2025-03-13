import { Router } from 'express';
import { MovieController } from '../controllers/MovieController';

const router = Router();

// Obtener listado de películas con filtros, orden y paginación
router.get('/', MovieController.getMovies);

// Crear una película con su respectiva categoría
router.post('/', MovieController.createMovie);

// Obtener usuarios con películas vistas
router.get('/users-with-watched-movies', MovieController.getUsersWithWatchedMovies);

// Obtener una película por su id
router.get('/:id', MovieController.getMovieById.bind(MovieController));

// Actualizar una película
router.put('/:id', MovieController.updateMovie.bind(MovieController));

// Eliminar una película
router.delete('/:id', MovieController.deleteMovie.bind(MovieController));

// Obtener los estrenos de las últimas tres semanas
router.get('/new-releases', MovieController.getNewReleases.bind(MovieController));

// Marcar una película como vista por un usuario
router.post('/mark-watched', MovieController.markAsWatched.bind(MovieController));



export default router;
