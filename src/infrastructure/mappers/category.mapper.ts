import { CategoryEntity, CustomError } from '../../domain';

export class CategoryMapper {
  static categoryEntityFromObject(object: { [key: string]: any }) {
    const { id, _id, name } = object;

    if (!id || !_id) throw CustomError.badRequest('Missing id');

    if (!name) throw CustomError.badRequest('Missing name');

    return new CategoryEntity(id || _id, name);
  }
}
