import Product from "../../../../domain/product/entity/product";
import ProductInterfaceRepository from "../../../../domain/product/repository/product-interface-repository";
import ProductModel from "./product.model";


export default class ProductRepository implements ProductInterfaceRepository {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    })
  }

  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({where: {id: id}})
    return  new Product(
      productModel.id,
      productModel.name,
      productModel.price
    )
  }

  async findAll(): Promise<Product[]> {
    const productsModel = await ProductModel.findAll()
    return productsModel.map(productModel => {
      return  new Product(
        productModel.id,
        productModel.name,
        productModel.price
      )
    })
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id
        }
      }
    )
  }
}
