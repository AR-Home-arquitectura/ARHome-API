import { CreateProductDto } from '../../dtos/inventory-management/create-product.dto';
import { ProductEntity } from '../../entities/product.entity';
import { InventoryManagementRepository } from '../../repositories/inventory-management.repository';

interface CreateProductUseCase {
  execute(createProductDto: CreateProductDto): Promise<ProductEntity>;
}

export class CreateProduct implements CreateProductUseCase {
  constructor(private readonly inventoryManagementRepository: InventoryManagementRepository) {}

  async execute(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return await this.inventoryManagementRepository.createProduct(createProductDto);
  }
}
