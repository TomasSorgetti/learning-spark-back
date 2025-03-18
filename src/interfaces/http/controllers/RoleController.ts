import { NextFunction, Request, Response } from "express";
import { RoleService } from "../../../application/services/RoleService";

export class RoleController {

  constructor(private readonly roleService: RoleService) {
  }

  public async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      const response = await this.roleService.createRole(name);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const { _id } = req.params;

      const response = await this.roleService.updateRole({ name, _id });
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async deleteRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.params;

      const response = await this.roleService.updateRole(_id);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  public async getRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.params;

      const response = await this.roleService.getRole(_id);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }
  
  public async getAllRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.roleService.getAllRoles();
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }
}
