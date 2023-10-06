import { CategoryEntity, CreateCategoryDto, CreateProductDto, PageableDto, PaginationDto, ProductEntity } from '..';

export abstract class InventoryManagementRepository {
  abstract createProduct(createProductDto: CreateProductDto): Promise<ProductEntity>;
  abstract getProducts(paginationDto: PaginationDto): Promise<PageableDto<ProductEntity[]>>;
  abstract createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity>;
  abstract getCategories(paginationDto: PaginationDto): Promise<PageableDto<CategoryEntity[]>>;
}
