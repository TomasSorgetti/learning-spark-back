import { PostRepositoryImpl } from "../../infrastructure/database/repositories/PostRespositoryImpl";
import { RedisCache } from "../../infrastructure/redis/RedisCache";
import { CloudinaryService } from "../../infrastructure/services/CloudinaryService";
import { APIError, NotFoundError } from "../../shared/utils/app-errors";
import { IGetPostParams, IPost } from "../types/IPostService";

export class PostService {
  constructor(
    private readonly postRepository: PostRepositoryImpl,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  public async createPost(postData: IPost): Promise<any> {
    const result = await this.postRepository.create(postData);
    await Promise.all([
      RedisCache.deletePattern("posts:*"),
      RedisCache.delete("TopViewedPosts"),
    ]);
    return result;
  }

  public async updatePost(postData: any): Promise<any> {
    const previousImagePublicId =
      (await this.postRepository.getPublicImageId(postData._id)) || null;

    const updateData: any = { ...postData };

    if (updateData.image == null) {
      delete updateData.image;
      delete updateData.imagePublicId;
    }

    const result = await this.postRepository.update(updateData);

    if (!result) throw new NotFoundError("Post not found");

    try {
      await Promise.all([
        RedisCache.deletePattern("posts:*"),
        RedisCache.delete(`post-${postData._id}`),
        RedisCache.delete(`post-${postData.url}`),
        RedisCache.delete("TopViewedPosts"),
      ]);
    } catch (error) {
      throw new APIError("Error updating post in Caché", 500);
    }

    if (
      previousImagePublicId &&
      previousImagePublicId !== result.imagePublicId
    ) {
      try {
        await this.cloudinaryService.deleteImage(previousImagePublicId);
      } catch (cloudinaryError) {
        throw new APIError("Error deleting image from Cloudinary", 500);
      }
    }
    return result;
  }

  public async deletePost(_id: string): Promise<IPost | null> {
    const deletedPost = await this.postRepository.delete(_id);

    if (!deletedPost) {
      throw new NotFoundError("Post not found");
    }

    if (deletedPost) {
      try {
        await Promise.all([
          RedisCache.deletePattern("posts:*"),
          RedisCache.delete(`post-${_id}`),
          RedisCache.delete(`post-${deletedPost.url}`),
          RedisCache.delete("TopViewedPosts"),
        ]);
      } catch (redisError) {
        throw new APIError("Error deleting post from Caché", 500);
      }

      if (deletedPost.imagePublicId) {
        try {
          await this.cloudinaryService.deleteImage(deletedPost.imagePublicId);
        } catch (cloudinaryError) {
          throw new APIError("Error deleting image from Cloudinary", 500);
        }
      }
    }
    return deletedPost;
  }

  public async getPost(url: string): Promise<any> {
    const cacheKey = `post-${url}`;
    const cachedPost = await RedisCache.get(cacheKey);

    if (cachedPost && typeof cachedPost === "string") {
      try {
        return JSON.parse(cachedPost);
      } catch (e) {
        console.error("Error parsing cached post:", e);
      }
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
    const cacheKey = `posts:${page}:${limit}:${sort}:${search || ""}:${
      subject || ""
    }`;
    const cachedPosts = await RedisCache.get(cacheKey);

    if (cachedPosts && typeof cachedPosts === "string") {
      try {
        return JSON.parse(cachedPosts);
      } catch (e) {
        console.error("Error parsing cached posts:", e);
      }
    }

    const filters: any = {};
    if (search) filters.title = { contains: search };
    if (subject && subject !== "none") {
      const subjectArray = subject.split(",");
      filters.subjects = { some: { name: { in: subjectArray } } };
    }

    const orderBy = { title: sort === "asc" ? "asc" : "desc" };
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      this.postRepository.getAll({
        where: filters,
        orderBy,
        skip,
        take: limit,
      }),
      this.postRepository.count({ where: filters }),
    ]);

    const result = { posts, total, page, limit };

    if (posts.length > 0) {
      await RedisCache.set(cacheKey, JSON.stringify(result), 3600);
    }

    return result;
  }

  public async getTopViewedPosts(): Promise<any> {
    const cacheKey = "TopViewedPosts";
    const cachedPosts = await RedisCache.get(cacheKey);

    if (cachedPosts && typeof cachedPosts === "string") {
      try {
        return JSON.parse(cachedPosts);
      } catch (e) {
        console.error("Error parsing top viewed posts:", e);
      }
    }

    const posts = await this.postRepository.getTopViewedPosts();
    if (posts.length > 0) {
      await RedisCache.set(cacheKey, JSON.stringify(posts), 3600);
    }
    return posts;
  }
}
