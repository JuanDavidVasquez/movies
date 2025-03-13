import { Request, RequestHandler, Response } from 'express';
import { Op } from 'sequelize';
import Movie from '../models/Movie';
import UserMovie from '../models/UserMovie';
import User from '../models/User';
import Category from '../models/Category';
import { validate } from 'uuid';

export class MovieController {
  static getMovies: RequestHandler = async (req, res): Promise<void> => {
    try {
      const { title, categoryId, page = 1, limit = 10 } = req.query;
      const pageNumber = Number(page);
      const limitNumber = Number(limit);
  
      if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
        res.status(400).json({ message: 'Invalid pagination parameters', status: 'error' });
        return;
      }
  
      const offset = (pageNumber - 1) * limitNumber;
      const whereClause: any = {};
  
      if (title) whereClause.title = { [Op.iLike]: `%${title}%` };
      if (categoryId) whereClause.categoryId = categoryId;
  
      const movies = await Movie.findAndCountAll({
        where: whereClause,
        include: [Category],
        limit: limitNumber,
        offset,
        order: [['releaseDate', 'DESC']],
      });
  
      res.status(200).json({
        message: 'Movies fetched',
        movies,
        status: 'success',
      });
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  };
  

  static async createMovie(req: Request, res: Response) {
    try {
      const movie = await Movie.create(req.body);
      res.status(201).json({
        message: 'Movie created',
        movie,
        status: 'success',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', status: 'error' });
    }
  }

  static async getMovieById(req: Request, res: Response): Promise<Response> {
    console.log("getMovieById");
    try {
      const { id } = req.params;
      if (!validate(id)) {
        return res.status(400).json({ message: 'Invalid movie ID', status: 'error' });
      }
  
      const movie = await Movie.findByPk(id, { include: [Category] });
      if (!movie) return res.status(404).json({ message: 'Movie not found', status: 'error' });
  
      res.status(200).json({
        message: 'Movie fetched',
        movie,
        status: 'success',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', status: 'error' });
    }
  }
  static async updateMovie(req: Request, res: Response) {
    try {
      const movie = await Movie.findByPk(req.params.id);
      if (!movie) return res.status(404).json({ message: 'Movie not found', status: 'error' });

      await movie.update(req.body);
      res.status(200).json({
        message: 'Movie updated',
        movie,
        status: 'success',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', status: 'error' });
    }
  }

  static async deleteMovie(req: Request, res: Response) {
    try {
      const movie = await Movie.findByPk(req.params.id);
      if (!movie) return res.status(404).json({ message: 'Movie not found', status: 'error' });

      await movie.destroy();
      res.status(200).json({
        message: 'Movie deleted',
        status: 'success',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', status: 'error' });
    }
  }

  static async getNewReleases(req: Request, res: Response) {
    try {
      const threeWeeksAgo = new Date();
      threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);

      const newMovies = await Movie.findAll({
        where: { releaseDate: { [Op.gte]: threeWeeksAgo } },
        include: [Category],
        order: [['releaseDate', 'DESC']],
      });

      res.status(200).json({
        message: 'New releases fetched',
        newMovies,
        status: 'success',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', status: 'error' });
    }
  }

  static async markAsWatched(req: Request, res: Response) {
    try {
        const { userId, movieId } = req.body;
        if (!userId || !movieId) {
            return res.status(400).json({ message: "Missing required fields", status: "error" });
        }

        const [userMovie, created] = await UserMovie.findOrCreate({
            where: { userId, movieId },
            defaults: { watchedAt: new Date() },
        });

        if (!created) {
            return res.status(400).json({ message: "Movie already marked as watched", status: "error" });
        }

        res.status(201).json({ message: "Movie marked as watched", status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", status: "error" });
    }
}




static async getUsersWithWatchedMovies(req: Request, res: Response) {
  console.log("getUsersWithWatchedMovies");
  try {
    const users = await User.findAll({
      include: [
        {
          model: Movie,
          as: "watchedMovies",
          through: { attributes: [] },
        },
      ],
      where: {
        '$watchedMovies.id$': { [Op.not]: null }, 
      },
    });

    res.status(200).json({
      message: "Users with watched movies fetched",
      users,
      status: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", status: "error" });
  }
}
}
