import { User } from '../../domain/entities/User';
import { UserRepository } from '../repositories/UserRepository';

export class CreateUserCommand {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async execute(data: User): Promise<User> {
        return await this.userRepository.create(data);
    }
}