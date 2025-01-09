import { IProduct, ProductModel } from "../models/ProductSchema";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";

export class ProductRepositoryImpl implements IProductRepository {
  async create(product: Partial<IProduct>): Promise<IProduct> {
    const newProduct = new ProductModel(product);
    return newProduct.save();
  }
  async getById(productId: string): Promise<IProduct | null> {
    return ProductModel.findById(productId).exec();
  }
  async getAll(): Promise<IProduct[]> {
    return ProductModel.find().exec();
  }
  async update(product: Partial<IProduct>): Promise<IProduct | null> {
    return ProductModel.findByIdAndUpdate(product).exec();
  }
  async delete(productId: string): Promise<IProduct | null> {
    return ProductModel.findByIdAndDelete(productId).exec();
  }
}
