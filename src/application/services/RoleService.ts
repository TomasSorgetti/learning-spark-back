import { RoleRepositoryImpl } from "../../infrastructure/database/repositories/RoleRepositoryImpl";
import { RedisCache } from "../../infrastructure/redis/RedisCache";

export class RoleService {
  private roleRepository: RoleRepositoryImpl;
  constructor() {
    this.roleRepository = new RoleRepositoryImpl();
  }

  public async createRole(name: string): Promise<any> {
    await RedisCache.delete("roles");
    return await this.roleRepository.create({ name });
  }

  public async updateRole(roleData: any): Promise<any> {
    await RedisCache.delete("roles");
    await RedisCache.delete(`role-${roleData._id}`);
    return await this.roleRepository.update(roleData);
  }

  public async deleteRole(_id: string): Promise<any> {
    await RedisCache.delete("roles");
    await RedisCache.delete(`role-${_id}`);
    return await this.roleRepository.delete(_id);
  }

  public async getRole(_id: string): Promise<any> {
    const cacheKey = `role-${_id}`;
    const cachedRole = await RedisCache.get(cacheKey);

    if (cachedRole && typeof cachedRole === "string") {
      return JSON.parse(cachedRole);
    }

    const role = await this.roleRepository.getById(_id);

    await RedisCache.set(cacheKey, JSON.stringify(role), 3600);

    return role;
  }
  public async getRoleByName(name: string): Promise<any> {
    return await this.roleRepository.getByName(name);
  }

  public async getAllRoles(): Promise<any> {
    const cacheKey = `roles`;
    const cachedRoles = await RedisCache.get(cacheKey);

    if (cachedRoles && typeof cachedRoles === "string") {
      return JSON.parse(cachedRoles);
    }

    const roles = await this.roleRepository.getAll();

    if (roles.length > 0) {
      await RedisCache.set(cacheKey, JSON.stringify(roles), 3600);
    }

    return roles;
  }
}
