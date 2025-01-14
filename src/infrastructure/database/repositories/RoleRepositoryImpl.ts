import { IRole, RoleModel } from "../models/RoleSchema";
import { IRoleRepository } from "../../../domain/repositories/IRoleRepository";
import { ConflictError } from "../../../shared/utils/app-errors";

export class RoleRepositoryImpl implements IRoleRepository {
  async create(role: Partial<IRole>): Promise<IRole> {
    const newRole = new RoleModel(role);
    try {
      return newRole.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictError(
          `Role with the given identifier already exists: ${JSON.stringify(
            error.keyValue
          )}`
        );
      }
      throw new ConflictError(`Failed to create role: ${error.message}`);
    }
  }

  async update(role: Partial<IRole>): Promise<IRole | null> {
    if (!role._id) {
      throw new ConflictError("Role ID is required for update");
    }
    return RoleModel.findByIdAndUpdate(role._id, role, { new: true }).exec();
  }

  async delete(roleId: string): Promise<IRole | null> {
    const role = await RoleModel.findByIdAndDelete(roleId).exec();
    if (!role) {
      throw new ConflictError(`Role with ID ${roleId} not found`);
    }
    return role;
  }

  async getById(roleId: string): Promise<IRole | null> {
    return RoleModel.findById(roleId).exec();
  }
  async getByName(roleName: string): Promise<IRole | null> {
    return RoleModel.findOne({ name: roleName }).exec();
  }

  async getAll(): Promise<IRole[]> {
    return RoleModel.find().exec();
  }
}
