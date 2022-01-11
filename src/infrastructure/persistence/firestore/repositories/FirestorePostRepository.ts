import { db } from "..";
import { PostRepository } from "../../../../aplications/repositories/PostRepository";
import { Post } from "../../../../domain/entities/Post";


export class FirestorePostRepository implements PostRepository {
    
    public async create(data: Post): Promise<Post> {

        const { idUser, author, text, countLike, countDislike } = data


        const post = {        
            idUser,
            author,
            text,
            countLike,
            countDislike,
        }

        await db.collection('posts').add(post)

        return post as Post
    }

    public async getAllPosts(): Promise<Post[]> {
        const postRef = db.collection('posts');
        const postDoc = await postRef.get();
        const posts: Post[] = [];
        postDoc.forEach((doc: any) => {
            posts.push({ id: doc.id, ...doc.data() })
        })
        return posts as Post[];
    }

    public async getMyPosts(idUser: string): Promise<Post[]> {
        const postRef = db.collection('posts');
        const postDoc = await postRef.get();
        const posts: Post[] = [];
        if (idUser !== null){
            postDoc.forEach((doc: any) => {
                if (doc.data().idUser === idUser) {
                    posts.push({ id: doc.id, ...doc.data() })
                }
            });
        }
        return posts as Post[];
    } 

    public async addLike (id: string): Promise<Post> {
        const postRef = db.collection('posts');
        const postDoc = await postRef.get();

        const post = {
            countLike: 0,
        }

        postDoc.forEach((doc: any) => {
            if(doc.id === id) {
                post.countLike = doc.data().countLike + 1;
                doc.ref.update({ countLike: doc.data().countLike + 1 })
                if(doc.data().countDislike > 0) {
                    doc.ref.update({ countDislike: doc.data().countDislike - 1 })
                }
            }
        })
       
        return post as Post;
    }

    public async addDislike(id: string): Promise<Post> {
        const postRef = db.collection('posts');
        const postDoc = await postRef.get();

        const post = {
            countDislike: 0,
        }

        postDoc.forEach((doc: any) => {
            if(doc.id === id) {
                post.countDislike = doc.data().countDislike + 1;
                doc.ref.update({ countDislike: doc.data().countDislike + 1 })
                if(doc.data().countLike > 0) {
                    doc.ref.update({ countLike: doc.data().countLike - 1 })
                }
            }
        })
       
        return post as Post;
    }
}
