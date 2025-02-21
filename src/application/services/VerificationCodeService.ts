import mongoose from "mongoose";
import { VerificationCodeRepositoryImpl } from "../../infrastructure/database/repositories/VerificationCodeImpl";
import crypto from "crypto";
import { IVerificationCode } from "../../infrastructure/database/models/users/VerificationCodeSchema";
import { BadRequestError } from "../../shared/utils/app-errors";

export class VerificationCodeService {
  constructor(
    private readonly verificationCodeRepository: VerificationCodeRepositoryImpl
  ) {}

  public async createVerificationCode(
    userId: string,
    length: number = 6
  ): Promise<IVerificationCode> {
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

  public async updateVerificationCode(
    userId: string,
    length: number = 6
  ): Promise<IVerificationCode> {
    if (!userId) throw new BadRequestError("Fields are required.");

    const verificationCode = await this.verificationCodeRepository.findByUserId(
      userId
    );

    if (!verificationCode)
      throw new BadRequestError("User does not have a verification code.");

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newCode = Array.from(crypto.randomBytes(length))
      .map((byte) => characters[byte % characters.length])
      .join("");

    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 10); //10 minutes

    const updatedVerificationCode =
      await this.verificationCodeRepository.update({
        userId,
        code: newCode,
        expiresAt: expirationTime,
      });

    if (!updatedVerificationCode) {
      throw new BadRequestError("Failed to update verification code.");
    }
    return updatedVerificationCode;
  }

  public async getVerificationCode(userId: string) {
    return await this.verificationCodeRepository.findByUserId(userId);
  }

  public async verifyVerificationCode(userId: string, code: string) {
    const verificationCode =
      await this.verificationCodeRepository.findByUserIdAndCode(
        userId,
        code.toUpperCase()
      );

    if (!verificationCode) {
      return { isValid: false, reason: "invalid" };
    }

    const now = new Date();
    if (verificationCode.expiresAt < now) {
      await this.verificationCodeRepository.delete(userId, code);
      return { isValid: false, reason: "expired" };
    }

    await this.verificationCodeRepository.delete(userId, code);
    return { isValid: true };
  }

  public async restorePreviousCode(userId: string, code: string) {
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 10); //10 minutes

    return await this.verificationCodeRepository.update({
      userId,
      code,
      expiresAt: expirationTime,
    });
  }
}
