import { RoleModel } from "../../infrastructure/database/models/RoleSchema";

export class RoleInitializer {
  static async initializeRoles() {
    const defaultRoles = [{ name: "admin" }, { name: "user" }];

    for (const role of defaultRoles) {
      const existingRole = await RoleModel.findOne({ name: role.name });
      if (!existingRole) {
        await RoleModel.create(role);
        console.log(`Role "${role.name}" created`);
      }
    }
  }
}
