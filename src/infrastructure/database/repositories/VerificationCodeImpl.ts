import {
  IVerificationCode,
  VerificationCodeModel,
} from "../models/VerificationCodeSchema";
import { IVerificationCodeRepository } from "../../../domain/repositories/IVerificationCodeRepository";
import mongoose from "mongoose";

export class VerificationCodeRepositoryImpl
  implements IVerificationCodeRepository
{
  async create(data: Partial<IVerificationCode>): Promise<IVerificationCode> {
    const newCode = new VerificationCodeModel({
      userId: data.userId,
      code: data.code,
      expiresAt: data.expiresAt,
    });

    return await newCode.save();
  }

  async findByUserIdAndCode(
    userId: string,
    code: string
  ): Promise<IVerificationCode | null> {
    return await VerificationCodeModel.findOne({
      userId,
      code,
    });
  }

  async delete(userId: string, code: string): Promise<void> {
    await VerificationCodeModel.deleteOne({ userId, code });
  }
}
