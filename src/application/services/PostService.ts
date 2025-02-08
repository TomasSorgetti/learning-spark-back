import { PostRepositoryImpl } from "../../infrastructure/database/repositories/PostRespositoryImpl";
import { RedisCache } from "../../infrastructure/redis/RedisCache";
import { IPost } from "../interfaces/IPostService";

export class PostService {
  private postRepository: PostRepositoryImpl;
  constructor() {
    this.postRepository = new PostRepositoryImpl();
  }

  public async createPost(postData: IPost): Promise<any> {
    await RedisCache.delete("posts");
    return await this.postRepository.create(postData);
  }

  public async updatePost(postData: any): Promise<any> {
    await RedisCache.delete("posts");
    await RedisCache.delete(`post-${postData._id}`);
    return await this.postRepository.update(postData);
  }

  public async deletePost(_id: string): Promise<any> {
    await RedisCache.delete("posts");
    await RedisCache.delete(`post-${_id}`);
    return await this.postRepository.delete(_id);
  }

  public async getPost(url: string): Promise<any> {
    const cacheKey = `post-${url}`;
    const cachedPost = await RedisCache.get(cacheKey);

    if (cachedPost && typeof cachedPost === "string") {
      return JSON.parse(cachedPost);
    }

    const post = await this.postRepository.getByUrl(url);

    await RedisCache.set(cacheKey, JSON.stringify(post), 3600);

    return post;
  }

  public async getAllPosts(): Promise<any> {
    const cacheKey = `posts`;
    const cachedPosts = await RedisCache.get(cacheKey);

    if (cachedPosts && typeof cachedPosts === "string") {
      return JSON.parse(cachedPosts);
    }

    const posts = await this.postRepository.getAll();

    if (posts.length > 0) {
      await RedisCache.set(cacheKey, JSON.stringify(posts), 3600);
    }

    return posts;
  }
}
