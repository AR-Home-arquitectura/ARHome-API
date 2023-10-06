import { CategoryEntity, CreateCategoryDto, InventoryManagementRepository } from '../..';

interface CreateCategoriesUseCase {
  execute(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity>;
}

export class CreateCategory implements CreateCategoriesUseCase {
  constructor(private readonly inventoryManagementRepository: InventoryManagementRepository) {}

  async execute(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.inventoryManagementRepository.createCategory(createCategoryDto);
  }
}
