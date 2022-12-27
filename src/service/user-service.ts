
import {RandomId} from "./random-id";
import {PostRepo} from "../repo/postRepo";

export class UserService {
    private randomId: RandomId
    private postRepo: PostRepo

    constructor() {
        this.randomId = new RandomId()
        this.postRepo = new PostRepo()
    }
    create = async (data: any)=>{
        data.postId = this.randomId.random();
        data.timeUpdate = this.randomId.today()
        await this.postRepo.create(data)
        return{
            code: 201,
            message:"create ok"
        }
    }
    showPost = async ()=>{
        let post = await this.postRepo.find()
        return post
    }
    updatePost = async (idEdit,post)=>{
       let posts =  await this.postRepo.update(idEdit,post)
        return{
            message:"edit ok",
            posts
        }
    }
    deletePost = async (postId)=>{
        console.log(postId)
        let posts =await this.postRepo.delete(postId);
        return {
            message:"delete ok",
            posts
        }
    }
}