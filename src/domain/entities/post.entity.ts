import { UserEntity } from './user.entity';

export class PostEntity {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public image: string,
    public user: UserEntity
  ) {}
}
