import { Post } from '../../domain/entities/Post';
import { PostRepository } from '../repositories/PostRepository';

export class CreatePostCommand {
    private postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    public async execute(data: Post): Promise<Post> {
        return await this.postRepository.create(data);
    }
}