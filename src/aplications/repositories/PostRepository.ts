import { Post } from '../../domain/entities/Post';

export interface PostRepository {
    create(data: Post): Promise<Post>;
    getAllPosts(): Promise<Post[]>;
    getMyPosts(idUser: string): Promise<Post[]>;
    addLike(idPost: string): Promise<Post>;
    addDislike(idPost: string): Promise<Post>;
}