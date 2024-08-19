import { QueryOpts } from '@src/interfaces/queryOpts.interface';
import { Stock } from '@src/models/stock.model';
import { NotFoundError } from '@src/error';
import { Product } from '@src/models/product.model';
import { WareHouse } from '@src/models/warehouse.model';
import { Includeable } from 'sequelize';
import BaseService from './base.service';

class StockService extends BaseService {
  private includeables: Includeable[] = [
    this.generateIncludables(Product, 'product', [
      'id',
      'name',
      'description',
      'price',
    ]),
    this.generateIncludables(WareHouse, 'warehouse', [
      'id',
      'name',
      'location',
      'capacity',
    ]),
  ];

  public async findStock(data: Partial<Stock>, withError = false) {
    const { productId, warehouseId } = data;

    const stock = await Stock.findOne({
      where: {
        productId,
        warehouseId,
      },
    });

    if (!stock && withError) {
      throw new NotFoundError('Stock does not exist!');
    }

    return stock;
  }

  public async get(id: number, withError = false) {
    const stock = await Stock.findByPk(id);

    if (!stock && withError) {
      throw new NotFoundError('Stock Not Found!');
    }

    return stock;
  }

  public async getAll(opts: QueryOpts) {
    const { offset, limit } = opts;

    const { rows, count } = await Stock.findAndCountAll({
      limit,
      offset,
      include: this.includeables,
    });

    return { stocks: rows, totalCount: count };
  }

  public async create(data: Partial<Stock>) {
    const stock = await Stock.create(data);

    return await stock.reload({ include: this.includeables });
  }

  public async update(data: Partial<Stock>) {
    const { id, quantity, productId, warehouseId } = data;

    const stock = await this.get(id, true);

    const updatedStock = await stock.update({
      quantity: quantity ? quantity : stock.quantity,
      productId: productId ? productId : stock.productId,
      warehouseId: warehouseId ? warehouseId : stock.warehouseId,
    });

    await updatedStock.save();
    await updatedStock.reload({ include: this.includeables });

    return updatedStock;
  }

  public async delete(data: Partial<Stock>) {
    const Stock = await this.get(data.id, true);
    await Stock.destroy();
  }
}

export default new StockService();
