import { CreatePostDto, PostEntity, PublicationsRepository } from '../..';

interface CreatePostUseCase {
  execute(createPostDto: CreatePostDto): Promise<PostEntity>;
}

export class CreatePost implements CreatePostUseCase {
  constructor(private readonly publicationsRepository: PublicationsRepository) {}

  async execute(createPostDto: CreatePostDto): Promise<PostEntity> {
    return await this.publicationsRepository.createPost(createPostDto);
  }
}
