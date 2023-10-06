import { CategoryEntity, CreateCategoryDto, CreateProductDto, PageableDto, ProductEntity, PaginationDto } from '..';

export abstract class InventoryManagementDatasource {
  abstract createProduct(createProductDto: CreateProductDto): Promise<ProductEntity>;
  abstract getProducts(paginationDto: PaginationDto): Promise<PageableDto<ProductEntity[]>>;
  abstract createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity>;
  abstract getCategories(paginationDto: PaginationDto): Promise<PageableDto<CategoryEntity[]>>;
}
