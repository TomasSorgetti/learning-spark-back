import { Product } from "../../domain/entities/Product";
import { ProductRepositoryImpl } from "../../infrastructure/database/repositories/ProductRepositoryImpl";
import { RedisCache } from "../../infrastructure/redis/RedisCache";

export class ProductService {
  private productRepository: ProductRepositoryImpl;

  constructor() {
    this.productRepository = new ProductRepositoryImpl();
  }

  public async create(productData: any): Promise<any> {
    const newProduct = new Product(productData);
    const product = newProduct.toPrimitives();

    return await this.productRepository.create(product);
  }

  public async getOne(productId: string): Promise<any> {
    const cacheKey = `product-${productId}`;
    const cachedProduct = await RedisCache.get(cacheKey);

    if (cachedProduct && typeof cachedProduct === "string") {
      return JSON.parse(cachedProduct);
    }
    const product = await this.productRepository.getById(productId);

    await RedisCache.set(cacheKey, JSON.stringify(product), 3600);

    return product;
  }

  public async getAll(): Promise<any> {
    const cacheKey = "products";
    const cachedProducts = await RedisCache.get(cacheKey);

    if (cachedProducts && typeof cachedProducts === "string") {
      return JSON.parse(cachedProducts);
    }

    const products = await this.productRepository.getAll();

    await RedisCache.set(cacheKey, JSON.stringify(products), 3600);

    return products;
  }
}
