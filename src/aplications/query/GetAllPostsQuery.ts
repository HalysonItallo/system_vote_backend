import { Post } from '../../domain/entities/Post';
import { PostRepository } from '../repositories/PostRepository';

export class GetAllPostsQuery {
    private postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    public async execute(): Promise<Post[]> {
        return await this.postRepository.getAllPosts();
    }
}
