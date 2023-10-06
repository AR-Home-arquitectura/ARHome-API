import { json } from 'stream/consumers';
import { CreatePost, CreatePostDto, CustomError, GetPosts, PaginationDto, PublicationsRepository } from '../../domain';
import { Request, Response } from 'express';

export class PublicationsController {
  constructor(private readonly publicationsRepository: PublicationsRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message });

    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  };

  createPost = (req: Request, res: Response) => {
    const [error, createPostDto] = CreatePostDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new CreatePost(this.publicationsRepository)
      .execute(createPostDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getPosts = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return res.status(400).json({ error });

    new GetPosts(this.publicationsRepository)
      .execute(paginationDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
