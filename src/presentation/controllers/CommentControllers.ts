import { Request, Response } from 'express';
import { CreateCommentCommand } from '../../aplications/command/CreateCommentCommand';
import { GetAllCommentsQuery } from '../../aplications/query/GetAllCommentsQuery';
import { FirestoreCommentRepository } from '../../infrastructure/persistence/firestore/repositories/FirestoreCommentRepository';

export class CommentController {
    
    public async createComment(req: Request, res: Response): Promise<Response> {
        const repoService = new FirestoreCommentRepository();
        const query = new CreateCommentCommand(repoService);

        const { idPost, author, text } = req.body;

        const comment = await query.execute({
            idPost,
            author,
            text,  
        });

        return res.status(200).json(comment)
    }

    public async getAllPosts(req: Request, res: Response): Promise<Response> {
        const repoService = new FirestoreCommentRepository();
        const query = new GetAllCommentsQuery(repoService);
        const { idPost } = req.params;
        const post = await query.execute(idPost);
        return res.status(200).json(post)
    }
}
