import { SubSubjectRepositoryImpl } from "../../infrastructure/database/repositories/SubSubjectRepositoryImpl";
import { RedisCache } from "../../infrastructure/redis/RedisCache";

export class SubSubjectService {
  constructor(
    private readonly subSubjectRepository: SubSubjectRepositoryImpl
  ) {}

  public async createSubSubject(
    name: string,
    description: string,
    subjectId: string
  ): Promise<any> {
    await RedisCache.delete("sub-subjects");
    return await this.subSubjectRepository.create(name, description, subjectId);
  }

  public async updateSubSubject(subSubjectData: any): Promise<any> {
    await RedisCache.delete("sub-subjects");
    await RedisCache.delete(`subject-${subSubjectData._id}`);
    return await this.subSubjectRepository.update(subSubjectData);
  }

  public async deleteSubSubject(_id: string): Promise<any> {
    await RedisCache.delete("sub-subjects");
    await RedisCache.delete(`sub-subject-${_id}`);
    return await this.subSubjectRepository.delete(_id);
  }

  public async getSubSubject(_id: string): Promise<any> {
    const cacheKey = `sub-subject-${_id}`;
    const cachedSubSubject = await RedisCache.get(cacheKey);

    if (cachedSubSubject && typeof cachedSubSubject === "string") {
      return JSON.parse(cachedSubSubject);
    }

    const subSubject = await this.subSubjectRepository.getById(_id);

    await RedisCache.set(cacheKey, JSON.stringify(subSubject), 3600);

    return subSubject;
  }

  public async getAllSubSubjects(): Promise<any> {
    const cacheKey = `sub-subjects`;
    const cachedSubSubject = await RedisCache.get(cacheKey);

    if (cachedSubSubject && typeof cachedSubSubject === "string") {
      return JSON.parse(cachedSubSubject);
    }

    const subSubjects = await this.subSubjectRepository.getAll();

    if (subSubjects.length > 0) {
      await RedisCache.set(cacheKey, JSON.stringify(subSubjects), 3600);
    }

    return subSubjects;
  }
}
