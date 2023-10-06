import { InventoryManagementRepository, PageableDto, PaginationDto, ProductEntity } from '../..';

interface GetProductsUseCase {
  execute(paginationDto: PaginationDto): Promise<PageableDto<ProductEntity[]>>;
}

export class GetProducts implements GetProductsUseCase {
  constructor(private readonly inventoryManagementRepository: InventoryManagementRepository) {}

  async execute(paginationDto: PaginationDto): Promise<PageableDto<ProductEntity[]>> {
    return await this.inventoryManagementRepository.getProducts(paginationDto);
  }
}
