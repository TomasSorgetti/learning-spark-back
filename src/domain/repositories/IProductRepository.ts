import { IProduct } from "../../infrastructure/database/models/ProductSchema";

export interface IProductRepository {
  create(product: Partial<IProduct>): Promise<IProduct>;
  getById(productId: string): Promise<IProduct | null>;
  getAll(): Promise<IProduct[]>;
  update(product: Partial<IProduct>): Promise<IProduct | null>;
  delete(productId: string): Promise<IProduct | null>;
}
