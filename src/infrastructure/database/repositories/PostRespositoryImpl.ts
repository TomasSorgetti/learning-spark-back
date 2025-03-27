import { IPost, PostModel } from "../models/subjects/PostSchema";
import { IPostRepository } from "../../../domain/repositories/IPostRepository";
import { ConflictError } from "../../../shared/utils/app-errors";
import { SortOrder } from "mongoose";
import mongoose from "mongoose";
import { validateUserData } from "../../../shared/validators/userValidator";

interface PostFilterOptions {
  where?: any;
  orderBy?: { title: string };
  skip?: number;
  take?: number;
}

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

    const updateData: any = { ...post };

    if (updateData.image == null) {
      delete updateData.image;
      delete updateData.imagePublicId;
    }

    if (typeof updateData.tags === "string") {
      updateData.tags = updateData.tags
        .split(",")
        .map((tag: string) => tag.trim());
    }

    return PostModel.findByIdAndUpdate(
      post._id,
      { $set: updateData },
      { new: true }
    ).exec();
  }

  async delete(postId: string): Promise<IPost | null> {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      console.log("Not a valid ObjectId:", postId);
      return null;
    }
    try {
      return await PostModel.findByIdAndDelete(postId).exec();
    } catch (error: any) {
      if (error.name === "CastError") {
        return null;
      }
      throw error;
    }
  }

  async getPublicImageId(postId: string): Promise<string | null> {
    const post = await PostModel.findOne({ _id: postId }).exec();

    if (!post) {
      throw new ConflictError(`Post with url ${postId} not found`);
    }

    if (!post.imagePublicId) {
      return null;
    }

    return post.imagePublicId;
  }

  async getByUrl(url: string): Promise<IPost | null> {
    const post = await PostModel.findOne({ url }).populate("subjectId").exec();
    if (!post) {
      throw new ConflictError(`Post with url ${url} not found`);
    }
    post.views++;
    await post.save();
    return post;
  }

  async getAll(options: PostFilterOptions): Promise<IPost[]> {
    const {
      where = {},
      orderBy = { title: -1 },
      skip = 0,
      take = 10,
    } = options;

    const query: any = {};
    if (where.title) {
      query.title = { $regex: where.title.contains, $options: "i" };
    }
    if (where.subjects) {
      query.subjectId = { $in: where.subjects.some.name.in };
    }

    const sort: { title: SortOrder } =
      orderBy.title === "asc" ? { title: 1 } : { title: -1 };

    return PostModel.find(query)
      .populate("subjectId")
      .sort(sort)
      .skip(skip)
      .limit(take)
      .exec();
  }

  async count(options: { where?: any }): Promise<number> {
    const { where = {} } = options;
    const query: any = {};
    if (where.title) {
      query.title = { $regex: where.title.contains, $options: "i" };
    }
    if (where.subjects) {
      query.subjectId = { $in: where.subjects.some.name.in };
    }
    return PostModel.countDocuments(query).exec();
  }

  async getTopViewedPosts(): Promise<IPost[]> {
    return PostModel.find()
      .sort({ views: -1 })
      .limit(3)
      .populate("subjectId")
      .exec();
  }
}
