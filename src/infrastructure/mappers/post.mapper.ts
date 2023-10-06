import { CustomError, PostEntity } from '../../domain';
import { UserMapper } from './user.mapper';

export class PostMapper {
  static postEntityFromObject(object: { [key: string]: any }): PostEntity {
    const { id, _id, title, description, image, user } = object;

    if (!id || !_id) throw CustomError.badRequest('Missing Id');
    if (!title) throw CustomError.badRequest('Missing title');
    if (!description) throw CustomError.badRequest('Missing description');
    if (!image) throw CustomError.badRequest('Missing image');
    if (!user) throw CustomError.badRequest('Missing user');

    return new PostEntity(id || _id, title, description, image, UserMapper.userEntityFromObject(user));
  }
}
