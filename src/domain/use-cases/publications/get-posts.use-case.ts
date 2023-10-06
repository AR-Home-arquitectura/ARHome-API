import { PageableDto, PaginationDto, PostEntity, PublicationsRepository } from '../..';

interface GetPostsUseCase {
  execute(paginationDto: PaginationDto): Promise<PageableDto<PostEntity[]>>;
}

export class GetPosts implements GetPostsUseCase {
  constructor(private readonly publicationsRepository: PublicationsRepository) {}

  async execute(paginationDto: PaginationDto): Promise<PageableDto<PostEntity[]>> {
    return await this.publicationsRepository.getPosts(paginationDto);
  }
}
