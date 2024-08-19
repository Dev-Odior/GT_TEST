import { QueryOpts } from '@src/interfaces/queryOpts.interface';
import { WareHouse } from '@src/models/warehouse.model';
import { NotFoundError } from '@src/error';

class WareHouseService {
  public async findWarehouse(data: Partial<WareHouse>, withError = false) {
    const { name, location } = data;

    const warehouse = await WareHouse.findOne({
      where: {
        name,
        location,
      },
    });

    if (!warehouse && withError) {
      throw new NotFoundError('WareHouse does not exist!');
    }

    return warehouse;
  }

  public async get(id: number, withError = false) {
    const warehouse = await WareHouse.findByPk(id);

    if (!warehouse && withError) {
      throw new NotFoundError('WareHouse Not Found!');
    }

    return warehouse;
  }

  public async getAll(opts: QueryOpts) {
    const { offset, limit } = opts;

    const { rows, count } = await WareHouse.findAndCountAll({
      limit,
      offset,
    });

    return { warehouse: rows, totalCount: count };
  }

  public async create(data: Partial<WareHouse>) {
    const warehouse = await WareHouse.create(data);
    return warehouse;
  }

  public async update(data: Partial<WareHouse>) {
    const { id, name, location, capacity } = data;

    const warehouse = await this.get(id, true);

    const updatedWareHouse = await warehouse.update({
      name: name ? name : warehouse.name,
      location: location ? location : warehouse.location,
      capacity: capacity ? capacity : warehouse.capacity,
    });

    await updatedWareHouse.save();

    return updatedWareHouse;
  }

  public async delete(data: Partial<WareHouse>) {
    const warehouse = await this.get(data.id, true);
    await warehouse.destroy();
  }
}

export default new WareHouseService();
