import { IPost } from "../../infrastructure/database/models/PostSchema";

export interface IPostRepository {
  create(subject: Partial<IPost>): Promise<IPost>;
  update(subject: Partial<IPost>): Promise<IPost | null>;
  delete(subjectId: string): Promise<IPost | null>;
  getById(subjectId: string): Promise<IPost | null>;
  getAll(): Promise<IPost[]>;
}
