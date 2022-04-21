import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../db/sequelize/model/product.model';
import ProductRepository from './product.repository';
import Product from "../../domain/product/entity/product";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: {force: true },
    })
    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product("1", "Product 1", 100)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({where: {id: "1"}})
    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    })
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product("1", "Product 1", 100)
    await productRepository.create(product)
    product.changeName("Product update")
    product.changePrice(150)

    await productRepository.update(product)

    const productModel = await ProductModel.findOne({where: {id: "1"}})
    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product update",
      price: 150,
    })
  });

  it('should find a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product("1", "Product 1", 100)
    await productRepository.create(product)

    const productFound = await productRepository.find(product.id)
    const productModel = await ProductModel.findOne({where: {id: "1"}})
    expect(productModel.toJSON()).toStrictEqual({
      id: productFound.id,
      name: productFound.name,
      price: productFound.price,
    })
  });

  it('should find all products', async () => {
    const productRepository = new ProductRepository()
    const product = new Product("1", "Product 1", 100)
    const product2 = new Product("2", "Product 2", 200)
    await productRepository.create(product)
    await productRepository.create(product2)

    const foundProducts = await productRepository.findAll()

    const products = [product, product2]
    expect(foundProducts).toEqual(products)
  });
})
