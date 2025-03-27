import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../shared/utils/app-errors";
import { container } from "../di/container";

interface CustomRequest extends Request {
  userId?: string;
  sessionId?: string;
}

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

    const user = await container.userService.getUserById(userId);
    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    if (user && user.deleted) {
      throw new UnauthorizedError("User deleted");
    }

    if (user && !user.emailVerified) {
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
