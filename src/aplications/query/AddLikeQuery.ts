import { Post } from '../../domain/entities/Post';
import { PostRepository } from '../repositories/PostRepository';

export class AddLikeQuery {
    private postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    public async execute(idPost: string): Promise<Post> {
        return await this.postRepository.addLike(idPost);
    }
}
