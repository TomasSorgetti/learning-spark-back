import { IPost } from "../../infrastructure/database/models/subjects/PostSchema";

export interface IPostRepository {
  create(subject: Partial<IPost>): Promise<IPost>;
  update(subject: Partial<IPost>): Promise<IPost | null>;
  delete(subjectId: string): Promise<IPost | null>;
  getByUrl(url: string): Promise<IPost | null>;
  getAll(options: any): Promise<IPost[]>;
  count(options: { where?: any }): Promise<number>;
  getTopViewedPosts(): Promise<IPost[]>;
}
