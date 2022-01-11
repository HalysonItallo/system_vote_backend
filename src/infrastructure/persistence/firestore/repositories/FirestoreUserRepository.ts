import { db } from "..";
import { UserRepository } from "../../../../aplications/repositories/UserRepository";
import { User } from "../../../../domain/entities/User";


export class FirestoreUserRepository implements UserRepository {
    public async create(data: User): Promise<User> {

        const { name, email,
            password } = data

        const user = {
            name: name,
            email: email,
            password: password,
            }

        await db.collection('users').add(user)

        return user as User
    }

    public async login(email: string, password: string): Promise<User> {
        const user = await db.collection('users').where('email', '==', email).get()

        if (!user.empty) {
            const userDocs = user.docs[0]
            const userData = userDocs.data() as User
            
            if (userData.password === password) {
                return {id: userDocs.id,...userData}
            }
        }
        const userNull = {
            name: '',
            email: '',
            password: '',
        }
        return userNull
    }
}
