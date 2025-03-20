import { PostRepositoryImpl } from "../../infrastructure/database/repositories/PostRespositoryImpl";
import { RedisCache } from "../../infrastructure/redis/RedisCache";
import { IGetPostParams, IGetPostResponse, IPost } from "../types/IPostService";

export class PostService {
  constructor(private readonly postRepository: PostRepositoryImpl) {}

  public async createPost(postData: IPost): Promise<any> {
    await RedisCache.clearAll();
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
    await RedisCache.delete("TopViewedPosts");

    if (cachedPost && typeof cachedPost === "string") {
      return JSON.parse(cachedPost);
    }

    const post = await this.postRepository.getByUrl(url);

    await RedisCache.set(cacheKey, JSON.stringify(post), 3600);

    return post;
  }

  public async getAllPosts({
    page = 1,
    limit = 10,
    sort = "desc",
    search,
    subject,
  }: IGetPostParams): Promise<{ posts: IPost[]; total: number }> {
    console.log(search, subject);

    const cacheKey = `posts:${page}:${limit}:${sort}:${search || ""}:${
      subject || ""
    }`;
    const cachedPosts = await RedisCache.get(cacheKey);

    if (cachedPosts && typeof cachedPosts === "string") {
      return JSON.parse(cachedPosts);
    }

    const filters: any = {};
    if (search) {
      filters.title = { contains: search };
    }
    if (subject && subject !== "none") {
      const subjectArray = subject.split(",");
      filters.subjects = { some: { name: { in: subjectArray } } };
    }

    const orderBy = { title: sort === "asc" ? "asc" : "desc" };
    const skip = (page - 1) * limit;

    const posts = await this.postRepository.getAll({
      where: filters,
      orderBy,
      skip,
      take: limit,
    });

    const total = await this.postRepository.count({ where: filters });

    const result = {
      posts,
      total,
      page,
      limit,
    };

    if (posts.length > 0) {
      await RedisCache.set(cacheKey, JSON.stringify(result), 3600);
    }

    return result;
  }

  public async getTopViewedPosts(): Promise<any> {
    const cacheKey = `TopViewedPosts`;
    const cachedPosts = await RedisCache.get(cacheKey);

    if (cachedPosts && typeof cachedPosts === "string") {
      return JSON.parse(cachedPosts);
    }

    const posts = await this.postRepository.getTopViewedPosts();

    if (posts.length > 0) {
      await RedisCache.set(cacheKey, JSON.stringify(posts), 3600);
    }

    return posts;
  }
}
