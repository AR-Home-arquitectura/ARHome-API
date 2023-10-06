import { Router } from 'express';
import { Authroutes } from './auth/routes';
import { InventoryManagementRoutes } from './inventory-management/routes';
import { PublicationsRoutes } from './publications/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', Authroutes.routes);

    router.use('/api/inventory-management', InventoryManagementRoutes.routes);

    router.use('/api/publications', PublicationsRoutes.routes);

    return router;
  }
}
