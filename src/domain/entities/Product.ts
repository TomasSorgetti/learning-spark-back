export class Product {
  private name: string;
  private description: string;
  private price: number;

  constructor({
    name,
    description,
    price,
  }: {
    name: string;
    description: string;
    price: number;
  }) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.validate();
  }

  private validate() {
    if (!this.name || !this.description || !this.price) {
      throw new Error("All fields are required");
    }
    // Validations
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getPrice(): number {
    return this.price;
  }

  public toPrimitives() {
    return {
      name: this.name,
      description: this.description,
      price: this.price,
    };
  }
}
