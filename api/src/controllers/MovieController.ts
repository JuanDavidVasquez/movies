import type { Request, Response } from 'express';
import Movie from '../models/Movie';

export class MovieController {
  static async getMovies(req: Request, res: Response) {
    try {
      const movies = await Movie.findAll()
      res.status(200).json({
        message: 'Movies fetched',
        movies,
        status: 'success'
      })
    } catch (error) {
      console.log(error)
      
    }
  }
  static async createMovie(req: Request, res: Response) {
    try {
        const movie = new Movie(req.body)
        await movie.save()
        res.status(201).json({
            message: 'Movie created',
            movie,
            status: 'success'
        })
    } catch (error) {
        console.log(error)
    }
  }

  //Traer movie con category
  static async getMovie(req: Request, res: Response) {
    try {
      const movie = await Movie.findByPk(req.params.id)
      res.status(200).json({
        message: 'Movie fetched',
        movie,
        status: 'success'
      })
    } catch (error) {
      console.log(error)
    }
  }
  static async updateMovie(req: Request, res: Response) {
    try {
      const movie = await Movie.findByPk(req.params.id)
      await movie.update(req.body)
      res.status(200).json({
        message: 'Movie updated',
        movie,
        status: 'success'
      })
    } catch (error) {
      console.log(error)
    }
  }
  static async deleteMovie(req: Request, res: Response) {
    try {
      const movie = await Movie.findByPk(req.params.id)
      await movie.destroy()
      res.status(200).json({
        message: 'Movie deleted',
        status: 'success'
      })
    } catch (error) {
      console.log(error)
    }
  }
}