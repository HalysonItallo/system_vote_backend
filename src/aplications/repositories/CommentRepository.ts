import { Comment } from '../../domain/entities/Comment';

export interface CommentRepository {
    create(data: Comment): Promise<Comment>;
    getAllComments(idPost: string): Promise<Comment[]>;
}