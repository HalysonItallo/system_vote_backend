import express from 'express'
import cors from 'cors'
import './infrastructure/persistence/firestore/repositories/FirestoreUserRepository'
import { UserController } from './presentation/controllers/UserControllers';
import { PostController } from './presentation/controllers/PostControllers';
import { CommentController } from './presentation/controllers/CommentControllers';


const app = express()
app.use(express.json())
app.use(cors())

const userController = new UserController()
const postController = new PostController()
const commentController = new CommentController()

app.post('/createUser', userController.createUser)

app.post('/login', userController.login)

app.post('/createPost', postController.createPost)

app.get('/getMyPosts/:idUser', postController.getMyPosts)

app.get('/getAllPosts', postController.getAllPosts)

app.get('/addLike/:id', postController.addLike)

app.get('/addDislike/:id', postController.addDislike)

app.post('/createComment', commentController.createComment)

app.get('/getAllComments/:idPost', commentController.getAllPosts)

app.listen(3333, () => {
    console.log('App running...')
})