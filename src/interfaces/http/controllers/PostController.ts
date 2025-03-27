import { NextFunction, Request, Response } from "express";
import { PostService } from "../../../application/services/PostService";

export class PostController {
  constructor(private readonly postService: PostService) {}

  public async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        title,
        content,
        author,
        tags,
        url,
        image,
        imagePublicId,
        subjectId,
      } = req.body;

      const response = await this.postService.createPost({
        title,
        content,
        author,
        tags,
        url,
        image,
        imagePublicId,
        subjectId,
      });
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        title,
        content,
        author,
        tags,
        url,
        image,
        imagePublicId,
        subjectId,
      } = req.body;
      const { _id } = req.params;

      const response = await this.postService.updatePost({
        title,
        content,
        author,
        tags,
        url,
        image,
        imagePublicId,
        _id,
        subjectId,
      });
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.params;

      const response = await this.postService.deletePost(_id);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { url } = req.params;

      const response = await this.postService.getPost(url);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async getAllPosts(req: Request, res: Response, next: NextFunction) {
    const { page = 1, limit = 10, sort = "desc", search, subject } = req.query;

    const validSort = sort === "asc" || sort === "desc" ? sort : "desc";
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;

    try {
      const response = await this.postService.getAllPosts({
        page: pageNum,
        limit: limitNum,
        sort: validSort,
        search: typeof search === "string" ? search : undefined,
        subject: typeof subject === "string" ? subject : undefined,
      });
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async getTopViewedPosts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await this.postService.getTopViewedPosts();
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }
}
