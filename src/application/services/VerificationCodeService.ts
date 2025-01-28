import { VerificationCodeRepositoryImpl } from "../../infrastructure/database/repositories/VerificationCodeImpl";

export class VerificationCodeService {
  private verificationCodeRepository: VerificationCodeRepositoryImpl;
  constructor() {
    this.verificationCodeRepository = new VerificationCodeRepositoryImpl();
  }

  public async createVerificationCode(userId: string, length: number = 6) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return await this.verificationCodeRepository.create({
      userId,
      code,
    });
  }
}
