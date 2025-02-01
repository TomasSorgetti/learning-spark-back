import { VerificationCodeRepositoryImpl } from "../../infrastructure/database/repositories/VerificationCodeImpl";
import crypto from "crypto";

export class VerificationCodeService {
  private verificationCodeRepository: VerificationCodeRepositoryImpl;
  constructor() {
    this.verificationCodeRepository = new VerificationCodeRepositoryImpl();
  }

  public async createVerificationCode(userId: string, length: number = 6) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = Array.from(crypto.randomBytes(length))
      .map((byte) => characters[byte % characters.length])
      .join("");

    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 10); //10 minutes

    return await this.verificationCodeRepository.create({
      userId,
      code,
      expiresAt: expirationTime,
    });
  }

  public async verifyVerificationCode(userId: string, code: string) {
    const verificationCode =
      await this.verificationCodeRepository.findByUserIdAndCode(
        userId,
        code.toUpperCase()
      );

    if (!verificationCode) {
      throw new Error("Código incorrecto o expirado");
    }

    const now = new Date();
    if (verificationCode.expiresAt < now) {
      await this.verificationCodeRepository.delete(userId, code);
      throw new Error("El código ha expirado");
    }

    await this.verificationCodeRepository.delete(userId, code);

    return true;
  }
}
