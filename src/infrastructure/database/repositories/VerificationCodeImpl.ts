import {
  IVerificationCode,
  VerificationCodeModel,
} from "../models/VerificationCodeSchema";
import { IVerificationCodeRepository } from "../../../domain/repositories/IVerificationCodeRepository";

export class VerificationCodeRepositoryImpl
  implements IVerificationCodeRepository
{
  async create(data: Partial<IVerificationCode>): Promise<IVerificationCode> {
    const expiresAt = new Date(Date.now() + 60 * 15 * 1000); // 15 minutes

    const newCode = new VerificationCodeModel({
      userId: data.userId,
      code: data.code,
      expiresAt,
    });
    return await newCode.save();
  }
}
