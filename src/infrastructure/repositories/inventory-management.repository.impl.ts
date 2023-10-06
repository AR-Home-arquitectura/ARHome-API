import {
  CreateProductDto,
  ProductEntity,
  PaginationDto,
  PageableDto,
  CreateCategoryDto,
  CategoryEntity,
  InventoryManagementRepository,
  InventoryManagementDatasource
} from '../../domain';

export class InventoryManagementRepositoryImpl implements InventoryManagementRepository {
  constructor(private readonly inventoryManagementDatasource: InventoryManagementDatasource) {}

  createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.inventoryManagementDatasource.createProduct(createProductDto);
  }

  getProducts(paginationDto: PaginationDto): Promise<PageableDto<ProductEntity[]>> {
    return this.inventoryManagementDatasource.getProducts(paginationDto);
  }

  createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.inventoryManagementDatasource.createCategory(createCategoryDto);
  }

  getCategories(paginationDto: PaginationDto): Promise<PageableDto<CategoryEntity[]>> {
    return this.inventoryManagementDatasource.getCategories(paginationDto);
  }
}
