import { ISubject } from "../../infrastructure/database/models/subjects/SubjectSchema";

export interface ISubjectRepository {
  create(subject: Partial<ISubject>): Promise<ISubject>;
  update(subject: Partial<ISubject>): Promise<ISubject | null>;
  delete(subjectId: string): Promise<ISubject | null>;
  getById(subjectId: string): Promise<ISubject | null>;
  getAll(): Promise<ISubject[]>;
}
