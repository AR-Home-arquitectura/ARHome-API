import { CreatePostDto, PageableDto, PaginationDto, PostEntity } from '..';

export abstract class PublicationsRepository {
  abstract createPost(createPostDto: CreatePostDto): Promise<PostEntity>;
  abstract getPosts(paginationDto: PaginationDto): Promise<PageableDto<PostEntity[]>>;
}
