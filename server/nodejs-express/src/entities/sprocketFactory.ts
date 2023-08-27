import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../core/baseEntity';

@Entity()
export class SprocketFactoryEntity extends BaseEntity {
  @Column('varchar')
  declare name: string;

  @Column('text')
  declare description: string;

  @Column('boolean')
  declare is_active: boolean;
}
