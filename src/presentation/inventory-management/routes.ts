import { Router } from 'express';
import { InventoryManagementRepositoryImpl, MongoInventoryManagementDatasourceImpl } from '../../infrastructure';
import { InventoryManagementController } from './controller';

export class InventoryManagementRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new MongoInventoryManagementDatasourceImpl();
    const repository = new InventoryManagementRepositoryImpl(datasource);
    const controller = new InventoryManagementController(repository);

    router.post('/products', controller.createProduct);
    router.post('/category', controller.createCategory);
    router.get('/products', controller.getProducts);
    router.get('/categories', controller.getCategories);

    return router;
  }
}
