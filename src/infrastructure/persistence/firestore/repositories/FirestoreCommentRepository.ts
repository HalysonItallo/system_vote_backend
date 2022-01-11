import { db } from "..";
import { CommentRepository } from "../../../../aplications/repositories/CommentRepository";
import { Comment } from "../../../../domain/entities/Comment";


export class FirestoreCommentRepository implements CommentRepository {
    
    public async create(data: Comment): Promise<Comment> {

        const { idPost, author, text } = data

        const comment = {        
            idPost,
            author,
            text,
        }

        await db.collection('comments').add(comment)

        return comment as Comment
    }

    public async getAllComments(idPost: string): Promise<Comment[]> {
        const commentRef = db.collection('comments');
        const commentDoc = await commentRef.get();
        const comments: Comment[] = [];
        if (idPost !== null){
            commentDoc.forEach((doc: any) => {
                if (doc.data().idPost === idPost) {
                    comments.push({ id: doc.id, ...doc.data() })
                }
            });
        }
        return comments as Comment[];
    }
}
