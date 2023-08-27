import { Get, Post, Put, Delete, Route, Body, Tags } from 'tsoa';

import { appDataSource } from '../core/dataSource';
import { SprocketFactoryEntity as Entity } from '../entities/sprocketFactory';

interface ResponseBase {
  success: boolean;
}

interface SprocketFactoryDTO {
  name: string;
  description?: string;
  isActive?: boolean;
}

const getDataByDto = (dto: SprocketFactoryDTO, item?: Entity) => {
  return {
    name: dto.name ?? item?.name,
    description: dto.description ?? item?.description,
    is_active: dto.isActive ?? item?.is_active,
  };
};

@Route('/api/factories/v1')
@Tags('Factories')
export class SprocketFactoryController {
  @Get('/')
  public async getAll(): Promise<Entity[]> {
    return await appDataSource
      .getRepository(Entity)
      .createQueryBuilder()
      .getMany();
  }

  @Get('/{id}')
  public async getOne(id: string): Promise<Entity | null> {
    return await appDataSource
      .getRepository(Entity)
      .createQueryBuilder()
      .where("id = :id", { id })
      .getOne();
  }

  @Post('/')
  public async create(
    @Body() dto: SprocketFactoryDTO
  ): Promise<Entity | null> {
    const res = await appDataSource
      .createQueryBuilder()
      .insert()
      .into(Entity)
      .values([getDataByDto(dto)])
      .execute();

    const lastId = res.identifiers[0].id;

    return await appDataSource
      .getRepository(Entity)
      .createQueryBuilder()
      .where("id = :id", { id: lastId })
      .getOne();
  }

  @Put('/{id}')
  public async update(
    id: string,
    @Body() dto: SprocketFactoryDTO
  ): Promise<Entity | null> {
    const item = await appDataSource
      .getRepository(Entity)
      .createQueryBuilder()
      .where("id = :id", { id })
      .getOne();

    if (!item) return null;

    const res = await appDataSource
      .createQueryBuilder()
      .update(Entity)
      .set(getDataByDto(dto, item))
      .where("id = :id", { id })
      .execute();

    return await appDataSource
      .getRepository(Entity)
      .createQueryBuilder()
      .where("id = :id", { id })
      .getOne();
  }

  @Delete('/{id}')
  public async delete(id: string): Promise<ResponseBase> {
    const item = await appDataSource
      .getRepository(Entity)
      .createQueryBuilder()
      .where("id = :id", { id })
      .getOne();

    if (!item) {
      return {
        success: false,
      };
    };

    await appDataSource
      .createQueryBuilder()
      .delete()
      .from(Entity)
      .where("id = :id", { id })
      .execute();

    return {
      success: true,
    };
  }
}
