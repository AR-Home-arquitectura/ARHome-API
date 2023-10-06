import { CategoryEntity } from './cateogry.entity';
import { UserEntity } from './user.entity';

export class ProductEntity {
  constructor(
    public id: string,
    public name: string,
    public stock: number,
    public price: number,
    public description: string,
    public user: UserEntity,
    public category: CategoryEntity,
  ) {}
}
