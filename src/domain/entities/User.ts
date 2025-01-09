export class User {
  private name: string;
  private email: string;
  private password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
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

  public toPrimitives() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }
}
