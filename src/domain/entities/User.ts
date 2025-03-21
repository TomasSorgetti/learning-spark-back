import mongoose from "mongoose";

export class User {
  private name: string;
  private email: string;
  private password: string | null;
  private roles: mongoose.Types.ObjectId[];
  private validated: boolean;
  private deleted: boolean;
  private emailVerified?: boolean | undefined;
  private provider?: string | null | undefined;

  constructor(
    name: string,
    email: string,
    password: string | null,
    roles: mongoose.Types.ObjectId[],
    emailVerified?: boolean,
    provider?: string | null | undefined
  ) {
    this.name = name;
    this.email = email;
    this.password = password || null;
    this.roles = roles;
    this.validated = false;
    this.deleted = false;
    this.emailVerified = emailVerified || false;
    this.provider = provider || null;
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
    if (!this.password) {
      return "";
    }
    return this.password;
  }
  public getRoles(): mongoose.Types.ObjectId[] {
    return this.roles;
  }

  public getValidated(): boolean {
    return this.validated;
  }

  public getDeleted(): boolean {
    return this.deleted;
  }

  public toPrimitives() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      roles: this.roles,
      validated: this.validated,
      deleted: this.deleted,
      emailVerified: this.emailVerified,
      provider: this.provider,
    };
  }
}
