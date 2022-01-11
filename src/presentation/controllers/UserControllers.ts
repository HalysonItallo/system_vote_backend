import { Request, Response } from 'express';
import { CreateUserCommand } from '../../aplications/command/CreateUserCommand';
import { LoginUserCommand } from '../../aplications/command/LoginUserCommand';
import { FirestoreUserRepository } from '../../infrastructure/persistence/firestore/repositories/FirestoreUserRepository';

export class UserController {
    public async createUser(req: Request, res: Response): Promise<Response> {
        const repoService = new FirestoreUserRepository();
        const query = new CreateUserCommand(repoService);
        const { name, email, password, type } = req.body;
        const user = await query.execute({
            name: name,
            email: email,
            password: password,
        });
        return res.status(200).json(user)
    }

    public async login(req: Request, res: Response): Promise<Response> {
        const repoService = new FirestoreUserRepository();
        const query = new LoginUserCommand(repoService);
        const { email, password } = req.body;
        const user = await query.execute(email, password);
        return res.status(200).json(user)
    }
}
