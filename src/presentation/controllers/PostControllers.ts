import { Request, Response } from 'express';
import { CreatePostCommand } from '../../aplications/command/CreatePostCommand';
import { AddDislikeQuery } from '../../aplications/query/AddDislikeQuery';
import { AddLikeQuery } from '../../aplications/query/AddLikeQuery';
import { GetAllPostsQuery } from '../../aplications/query/GetAllPostsQuery';
import { GetMyPostsQuery } from '../../aplications/query/GetMyPostsQuery';
import { FirestorePostRepository } from '../../infrastructure/persistence/firestore/repositories/FirestorePostRepository';

export class PostController {
    
    public async createPost(req: Request, res: Response): Promise<Response> {
        const repoService = new FirestorePostRepository();
        const query = new CreatePostCommand(repoService);

        const { idUser, author, text } = req.body;

        const post = await query.execute({
            idUser,
            author,
            text,
            countLike: 0,
            countDislike: 0    
        });

        return res.status(200).json(post)
    }

    public async getAllPosts(req: Request, res: Response): Promise<Response> {
        const repoService = new FirestorePostRepository();
        const query = new GetAllPostsQuery(repoService);
        const post = await query.execute();
        return res.status(200).json(post)
    }

    public async getMyPosts(req: Request, res: Response): Promise<Response> {
        const repoService = new FirestorePostRepository();
        const query = new GetMyPostsQuery(repoService);
        const { idUser } = req.params;
        const post = await query.execute(idUser);
        return res.status(200).json(post)
    }

    public async addLike(req: Request, res: Response): Promise<Response> {
        const repoService = new FirestorePostRepository();
        const query = new AddLikeQuery(repoService);
        const { id } = req.params;
        const post = await query.execute(id)
        return res.status(200).json(post)
    }

    public async addDislike(req: Request, res: Response): Promise<Response> {
        const repoService = new FirestorePostRepository();
        const query = new AddDislikeQuery(repoService);
        const { id } = req.params;
        const post = await query.execute(id)
        return res.status(200).json(post)
    }
}
