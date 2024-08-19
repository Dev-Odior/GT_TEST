import { QueryOpts } from '@src/interfaces/queryOpts.interface';
import { Product } from '@src/models/product.model';
import { NotFoundError } from '@src/error';

class ProductService {
  public async findProduct(data: Partial<Product>, withError = false) {
    const { name, price } = data;

    const product = await Product.findOne({
      where: {
        name,
        price,
      },
    });

    if (!product && withError) {
      throw new NotFoundError('Product does not exist!');
    }

    return product;
  }

  public async get(id: number, withError = false) {
    const product = await Product.findByPk(id);

    if (!product && withError) {
      throw new NotFoundError('Product Not Found!');
    }

    return product;
  }

  public async getAll(opts: QueryOpts) {
    const { offset, limit } = opts;

    const { rows, count } = await Product.findAndCountAll({
      limit,
      offset,
    });

    return { products: rows, totalCount: count };
  }

  public async create(data: Partial<Product>) {
    const product = await Product.create(data);
    return product;
  }

  public async update(data: Partial<Product>) {
    const { id, name, price, description } = data;

    const product = await this.get(id, true);

    const updatedProduct = await product.update({
      name: name ? name : product.name,
      description: description ? description : product.description,
      price: price ? price : product.price,
    });

    await updatedProduct.save();

    return updatedProduct;
  }

  public async delete(data: Partial<Product>) {
    const product = await this.get(data.id, true);
    await product.destroy();
  }
}

export default new ProductService();
