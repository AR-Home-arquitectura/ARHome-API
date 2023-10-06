import { CategoryEntity, InventoryManagementRepository, PageableDto, PaginationDto } from '../..';

interface GetCategoriesUseCase {
  execute(paginationDto: PaginationDto): Promise<PageableDto<CategoryEntity[]>>;
}

export class GetCategories implements GetCategoriesUseCase {
  constructor(private readonly inventoryManagementRepository: InventoryManagementRepository) {}

  async execute(paginationDto: PaginationDto): Promise<PageableDto<CategoryEntity[]>> {
    return await this.inventoryManagementRepository.getCategories(paginationDto);
  }
}
