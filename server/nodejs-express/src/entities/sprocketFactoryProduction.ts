import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../core/baseEntity';
import { SprocketEntity } from './sprocket'
import { SprocketFactoryEntity } from './sprocketFactory'

@Entity()
export class SprocketFactoryProductionEntity extends BaseEntity {
  @ManyToOne(type => SprocketFactoryEntity, factory => factory.id)
  declare factory: SprocketFactoryEntity;

  @ManyToOne(type => SprocketEntity, sprocket => sprocket.id)
  declare sprocket: SprocketEntity;

  @Column('int')
  declare production_actual: number;

  @Column('int')
  declare production_goal: number;
}
