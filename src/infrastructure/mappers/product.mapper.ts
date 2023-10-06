import { CustomError, ProductEntity } from '../../domain';
import { CategoryMapper } from './category.mapper';
import { UserMapper } from './user.mapper';

export class ProductMapper {
  static productEntityFromObject(object: { [key: string]: any }) {
    const { id, _id, name, stock, price, description, user, category } = object;

    if (!_id || !id) throw CustomError.badRequest('Missing id');

    if (!stock) throw CustomError.badRequest('Invalid Stock');

    if (!price) throw CustomError.badRequest('Invalid Price');

    if (!description) throw CustomError.badRequest('Invalid Description');

    if (!name) throw CustomError.badRequest('Missing name');

    if (!user) throw CustomError.badRequest('Missing user');

    if (!category) throw CustomError.badRequest('Missing category');

    return new ProductEntity(
      id || _id,
      name,
      stock,
      price,
      description,
      UserMapper.userEntityFromObject(user),
      CategoryMapper.categoryEntityFromObject(category)
    );
  }
}
