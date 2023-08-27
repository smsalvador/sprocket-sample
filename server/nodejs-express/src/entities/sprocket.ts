import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../core/baseEntity';

@Entity()
export class SprocketEntity extends BaseEntity {
  @Column('int')
  declare teeth: number;

  @Column('float')
  declare pitch_diameter: number;

  @Column('float')
  declare outside_diameter: number;

  @Column('float')
  declare pitch: number;

  @Column('text')
  declare description: string;

  @Column('boolean')
  declare is_active: boolean;
}
