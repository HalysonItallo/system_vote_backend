import { Comment } from '../../domain/entities/Comment';
import { CommentRepository } from '../repositories/CommentRepository';

export class GetAllCommentsQuery {
    private commentRepository: CommentRepository;

    constructor(commentRepository: CommentRepository) {
        this.commentRepository = commentRepository;
    }

    public async execute(idPost: string): Promise<Comment[]> {
        return await this.commentRepository.getAllComments(idPost);
    }
}
