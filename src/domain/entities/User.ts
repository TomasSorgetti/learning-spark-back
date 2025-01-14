import mongoose from "mongoose";

export class User {
  private name: string;
  private email: string;
  private password: string;
  private roles: mongoose.Types.ObjectId[];
  private validated: boolean;
  private deleted: boolean;

  constructor(
    name: string,
    email: string,
    password: string,
    roles: mongoose.Types.ObjectId[]
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.validated = false;
    this.deleted = false;
    this.validate();
  }

  private validate() {
    if (!this.name || !this.email || !this.password) {
      throw new Error("All fields are required");
    }
    // Validations
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }
  public getRoles(): mongoose.Types.ObjectId[] {
    return this.roles;
  }

  public toPrimitives() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      roles: this.roles,
      validated: this.validated,
      deleted: this.deleted,
    };
  }
}
