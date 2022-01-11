import { Post } from '../../domain/entities/Post';
import { PostRepository } from '../repositories/PostRepository';

export class GetMyPostsQuery {
    private postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    public async execute(idUser: string): Promise<Post[]> {
        return await this.postRepository.getMyPosts(idUser);
    }
}
