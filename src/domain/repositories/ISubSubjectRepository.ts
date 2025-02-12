import { ISubSubject } from "../../infrastructure/database/models/subjects/SubSubjectSchema";

export interface ISubSubjectRepository {
  create(
    name: string,
    description: string,
    subjectId: string
  ): Promise<ISubSubject>;
  update(subject: Partial<ISubSubject>): Promise<ISubSubject | null>;
  delete(subjectId: string): Promise<ISubSubject | null>;
  getById(subjectId: string): Promise<ISubSubject | null>;
  getAll(): Promise<ISubSubject[]>;
}
