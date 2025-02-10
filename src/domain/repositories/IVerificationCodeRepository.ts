import mongoose from "mongoose";
import { IVerificationCode } from "../../infrastructure/database/models/VerificationCodeSchema";

export interface IVerificationCodeRepository {
  create(
    code: Partial<IVerificationCode>,
    session: mongoose.ClientSession
  ): Promise<IVerificationCode>;
  findByUserId(userId: string): Promise<IVerificationCode | null>;
  findByUserIdAndCode(
    userId: string,
    code: string
  ): Promise<IVerificationCode | null>;
  update(data: Partial<IVerificationCode>): Promise<IVerificationCode | null>;
  delete(userId: string, code: string): Promise<any>;
}
