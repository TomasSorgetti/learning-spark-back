export class User {
  private name: string;
  private email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
    this.validate();
  }

  private validate() {
    if (!this.name || !this.email) {
      throw new Error("Name and email are required");
    }
    // Validations
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }
}
