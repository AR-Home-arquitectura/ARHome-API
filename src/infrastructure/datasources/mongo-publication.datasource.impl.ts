import { PostModel, UserModel } from '../../data/mongodb';
import {
  CreatePostDto,
  CustomError,
  PageableDto,
  PaginationDto,
  PostEntity,
  PublicationsDatasource
} from '../../domain';
import { PostMapper } from '../mappers/post.mapper';

export class MongoPublicationsDatasourceImpl implements PublicationsDatasource {
  async createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
    try {
      const post = new PostModel(createPostDto);

      await post.save();
      await post.populate('user');

      return PostMapper.postEntityFromObject(post);
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async getPosts(paginationDto: PaginationDto): Promise<PageableDto<PostEntity[]>> {
    const { page, limit } = paginationDto;

    try {
      const [total, posts] = await Promise.all([
        PostModel.countDocuments(),
        PostModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('user')
      ]);

      const data = posts.map((post) => PostMapper.postEntityFromObject(post));

      const response = new PageableDto<PostEntity[]>(page, limit, total, '', '', data);

      return response;
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }
}
