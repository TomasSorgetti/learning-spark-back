import { SubjectRepositoryImpl } from "../../infrastructure/database/repositories/SubjectRepositoryImpl";
import { RedisCache } from "../../infrastructure/redis/RedisCache";

export class SubjectService {
  private subjectRepository: SubjectRepositoryImpl;
  constructor() {
    this.subjectRepository = new SubjectRepositoryImpl();
  }

  public async createSubject(name: string): Promise<any> {
    await RedisCache.delete("subjects");
    return await this.subjectRepository.create({ name });
  }
  public async updateSubject(subjectData: any): Promise<any> {
    await RedisCache.delete("subjects");
    await RedisCache.delete(`subject-${subjectData._id}`);
    return await this.subjectRepository.update(subjectData);
  }
  public async deleteSubject(subjectId: string): Promise<any> {
    await RedisCache.delete("subjects");
    await RedisCache.delete(`subject-${subjectId}`);
    return await this.subjectRepository.delete(subjectId);
  }

  public async getSubject(subjectId: string): Promise<any> {
    const cacheKey = `subject-${subjectId}`;
    const cachedSubject = await RedisCache.get(cacheKey);

    if (cachedSubject && typeof cachedSubject === "string") {
      return JSON.parse(cachedSubject);
    }

    const subject = await this.subjectRepository.getById(subjectId);

    await RedisCache.set(cacheKey, JSON.stringify(subject), 3600);

    return subject;
  }

  public async getAllSubjects(): Promise<any> {
    const cacheKey = `subjects`;
    const cachedSubject = await RedisCache.get(cacheKey);

    if (cachedSubject && typeof cachedSubject === "string") {
      return JSON.parse(cachedSubject);
    }

    const subjects = await this.subjectRepository.getAll();

    if (subjects.length > 0) {
      await RedisCache.set(cacheKey, JSON.stringify(subjects), 3600);
    }

    return subjects;
  }
}
