import { Get, Post, Put, Delete, Route, Body, Tags } from 'tsoa';

import { appDataSource } from '../core/dataSource';
import { SprocketFactoryProductionEntity as Entity } from '../entities/sprocketFactoryProduction';

interface ResponseBase {
  success: boolean;
}

interface SprocketFactoryProductionDTO {
  factory: any;
  sprocket: any;
  production_actual: number;
  production_goal: number;
}

const getDataByDto = (dto: SprocketFactoryProductionDTO, item?: Entity) => {
  return {
    factory: dto.factory ?? item?.factory,
    sprocket: dto.sprocket ?? item?.sprocket,
    production_actual: dto.production_actual ?? item?.production_actual,
    production_goal: dto.production_goal ?? item?.production_goal,
  };
};

@Route('/api/production/v1')
@Tags('Production')
export class SprocketFactoryProductionController {
  @Get('/')
  public async getAll(): Promise<Entity[]> {
    return await appDataSource
      .getRepository(Entity)
      .createQueryBuilder()
      .getMany();
  }

  @Get('/factory/{id}')
  public async getAllByFactory(id: string): Promise<Entity[]> {
    return await appDataSource
      .getRepository(Entity)
      .createQueryBuilder()
      .where("factoryId = :id", { id })
      .getMany();
  }

  @Get('/sprocket/{id}')
  public async getAllBySprocket(id: string): Promise<Entity[]> {
    return await appDataSource
      .getRepository(Entity)
      .createQueryBuilder()
      .where("sprocketId = :id", { id })
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
    @Body() dto: SprocketFactoryProductionDTO
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
    @Body() dto: SprocketFactoryProductionDTO
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
