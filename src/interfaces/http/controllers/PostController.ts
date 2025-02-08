import { NextFunction, Request, Response } from "express";
import { PostService } from "../../../application/services/PostService";

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  public async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content, author, tags, url, image, subjectId } = req.body;

      const response = await this.postService.createPost({
        title,
        content,
        author,
        tags,
        url,
        image,
        subjectId,
      });
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content, author, tags, url, image, subjectId } = req.body;
      const { _id } = req.params;

      const response = await this.postService.updatePost({
        title,
        content,
        author,
        tags,
        url,
        image,
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

      const response = await this.postService.updatePost(_id);
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
    try {
      const response = await this.postService.getAllPosts();
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }
}
