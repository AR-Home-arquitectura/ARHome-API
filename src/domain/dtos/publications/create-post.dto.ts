import { Validators } from '../../../config';

export class CreatePostDto {
  private constructor(public title: string, public description: string, public image: string, public user: string) {}

  static create(object: { [key: string]: any }): [string?, CreatePostDto?] {
    const { title, description, image, user } = object;

    if (!title) return ['Missing title', undefined];
    if (!description) return ['Missing description', undefined];
    if (!image) return ['Missing image', undefined];
    if (!user) return ['Missing user id', undefined];
    if (!Validators.isMongoID(user)) return ['Invalid user ID', undefined];

    return [undefined, new CreatePostDto(title, description, image, user)];
  }
}
