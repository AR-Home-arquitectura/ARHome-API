import {
  CreatePostDto,
  PageableDto,
  PaginationDto,
  PostEntity,
  PublicationsDatasource,
  PublicationsRepository
} from '../../domain';

export class PublicationRepositoryImpl implements PublicationsRepository {
  constructor(private readonly publicationsDatasource: PublicationsDatasource) {}

  createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.publicationsDatasource.createPost(createPostDto);
  }

  getPosts(paginationDto: PaginationDto): Promise<PageableDto<PostEntity[]>> {
    return this.publicationsDatasource.getPosts(paginationDto);
  }
}
