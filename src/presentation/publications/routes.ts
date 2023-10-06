import { Router } from 'express';
import { PublicationsController } from './controller';
import { MongoPublicationsDatasourceImpl, PublicationRepositoryImpl } from '../../infrastructure';

export class PublicationsRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new MongoPublicationsDatasourceImpl();
    const repository = new PublicationRepositoryImpl(datasource);
    const controller = new PublicationsController(repository);

    router.post('/posts', controller.createPost);
    router.get('/posts', controller.getPosts);

    return router;
  }
}
