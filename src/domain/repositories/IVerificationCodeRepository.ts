import mongoose from "mongoose";
import { IVerificationCode } from "../../infrastructure/database/models/VerificationCodeSchema";

export interface IVerificationCodeRepository {
  create(
    code: Partial<IVerificationCode>,
    session: mongoose.ClientSession
  ): Promise<IVerificationCode>;
}
