import { RoleModel } from "../../infrastructure/database/models/RoleSchema";

export class RoleInitializer {
  static async initializeRoles() {
    const defaultRoles = ["admin", "user"];

    for (const role of defaultRoles) {
      const existingRole = await RoleModel.findOne({ name: role });
      if (!existingRole) {
        await RoleModel.create({ name: role });
        console.log(`Role "${role}" created`);
      }
    }
  }
}
