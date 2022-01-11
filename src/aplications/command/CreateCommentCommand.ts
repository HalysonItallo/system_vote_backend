import { Comment } from '../../domain/entities/Comment';
import { CommentRepository } from '../repositories/CommentRepository';

export class CreateCommentCommand {
    private commentRepository: CommentRepository;

    constructor(commentRepository: CommentRepository) {
        this.commentRepository = commentRepository;
    }

    public async execute(data: Comment): Promise<Comment> {
        return await this.commentRepository.create(data);
    }
}