import { User } from "../../domain/entities/User";
import { UserRepositoryImpl } from "../../infrastructure/database/repositories/UserRepositoryImpl";
import { BadRequestError } from "../../shared/utils/app-errors";
import { SecurityService } from "./SecurityService";

export class UserService {
  private userRepository: UserRepositoryImpl;
  private securityService: SecurityService;

  constructor() {
    this.userRepository = new UserRepositoryImpl();
    this.securityService = new SecurityService();
  }

  public async createUser(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<any> {
    // Validar que el email no exista
    const existingUser = await this.userRepository.findByEmail(userData.email);
    // Si existe, retornar error
    if (existingUser) {
      throw new BadRequestError("User already exists");
    }
    // Si no existe, Encriptar password
    const hashedPassword = await this.securityService.hashPassword(
      userData.password
    );
    // Guardar user
    const user = new User(userData.name, userData.email, hashedPassword);
    // Retornar user
    return await this.userRepository.create(user.toPrimitives());
  }

  public async getUserByEmail(email: string): Promise<any> {
    return await this.userRepository.findByEmail(email);
  }
}
