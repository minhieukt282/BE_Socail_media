import {AppDataSource} from "../data-source";
import {Post} from "../model/post";


export class PostRepo{
    private postRepo: any

    constructor() {
        AppDataSource.initialize().then(connection =>{
            this.postRepo = connection.getRepository(Post)
        })
    }

    create = async (newPost: any)=>{
        await this.postRepo.save(newPost)
    }
    find = async ()=>{
        let query = 'select * from posts '
       let post = await this.postRepo.find(query)
        return post
    }
    update= async (idEdit:number,post)=>{
       await this.postRepo.update({postId:idEdit},post)
    }
    delete = async (id: number)=>{
        await this.postRepo.delete(id)
    }
}