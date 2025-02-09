import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../shared/utils/app-errors";
import { UserService } from "../../application/services/UserService";

interface CustomRequest extends Request {
  userId?: string;
  sessionId?: string;
}
const userService = new UserService();

const isAdminGuard = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      throw new UnauthorizedError("No user id provided");
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    if (user && user.deleted) {
      throw new UnauthorizedError("User deleted");
    }

    if (user && !user.validated) {
      throw new UnauthorizedError("User not validated");
    }

    const isAdmin = user.roles.some((role: any) => role.name === "admin");

    if (!isAdmin) {
      throw new UnauthorizedError("User is not admin");
    }

    next();
  } catch (error: any) {
    next(error);
  }
};

export default isAdminGuard;
