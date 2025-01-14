import { IPost, PostModel } from "../models/PostSchema";
import { IPostRepository } from "../../../domain/repositories/IPostRepository";
import { ConflictError } from "../../../shared/utils/app-errors";

export class PostRepositoryImpl implements IPostRepository {
  async create(post: Partial<IPost>): Promise<IPost> {
    const newPost = new PostModel(post);
    try {
      return await newPost.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictError(
          `Post with the given identifier already exists: ${JSON.stringify(
            error.keyValue
          )}`
        );
      }
      throw new ConflictError(`Failed to create post: ${error.message}`);
    }
  }

  async update(post: Partial<IPost>): Promise<IPost | null> {
    if (!post._id) {
      throw new ConflictError("post ID is required for update");
    }
    return PostModel.findByIdAndUpdate(post._id, post, {
      new: true,
    }).exec();
  }

  async delete(postId: string): Promise<IPost | null> {
    return PostModel.findByIdAndDelete(postId).exec();
  }

  async getById(postId: string): Promise<IPost | null> {
    const post = await PostModel.findById(postId).populate("subjectId").exec();
    if (!post) {
      throw new ConflictError(`Post with ID ${postId} not found`);
    }
    return post;
  }

  async getAll(): Promise<IPost[]> {
    return PostModel.find().populate("subjectId").exec();
  }
}
