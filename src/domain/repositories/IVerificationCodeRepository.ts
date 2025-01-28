import { IVerificationCode } from "../../infrastructure/database/models/VerificationCodeSchema";

export interface IVerificationCodeRepository {
  create(code: Partial<IVerificationCode>): Promise<IVerificationCode>;
}
