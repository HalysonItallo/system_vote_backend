import { User } from '../../domain/entities/User';
import { UserRepository } from '../repositories/UserRepository';

export class LoginUserCommand {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async execute(email: string, password: string): Promise<User> {
        return await this.userRepository.login(email, password);
    }
}
