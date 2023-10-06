import { Request, Response } from 'express';
import {
  CreateCategory,
  CreateCategoryDto,
  CreateProduct,
  CreateProductDto,
  CustomError,
  GetCategories,
  GetProducts,
  InventoryManagementRepository,
  PaginationDto
} from '../../domain';

export class InventoryManagementController {
  constructor(private readonly inventoryManagementRepository: InventoryManagementRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message });

    console.log(error);

    return res.status(500).json({ error: 'Internal server error' });
  };

  createProduct = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create(req.body);

    if (error) res.status(400).json({ error });

    new CreateProduct(this.inventoryManagementRepository)
      .execute(createProductDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  createCategory = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

    if (error) res.status(400).json({ error });

    new CreateCategory(this.inventoryManagementRepository)
      .execute(createCategoryDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getProducts = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) res.status(400).json({ error });

    new GetProducts(this.inventoryManagementRepository)
      .execute(paginationDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getCategories = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) res.status(400).json({ error });

    new GetCategories(this.inventoryManagementRepository)
      .execute(paginationDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
