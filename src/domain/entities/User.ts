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
    if (!this.name || this.name.trim().length === 0) {
      throw new Error("Name is required");
    }

    //todo => use regex
    if (!this.email || !this.email.includes("@")) {
      throw new Error("A valid email is required");
    }

    if (!this.password || this.password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    if (!this.roles || this.roles.length === 0) {
      throw new Error("At least one role is required");
    }
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
