import { User } from '../../domain/entities/User';

export interface UserRepository {
    create(data: User): Promise<User>;
    login(email: string, password: string): Promise<User>;
}