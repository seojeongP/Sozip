import { ColumnNumericTransformer } from "src/@common/transformers/numeric.transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Others extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  which: string;

  @Column({
    type: 'decimal',
    transformer: new ColumnNumericTransformer(),
  })
  latitude: number;

  @Column({
    type: 'decimal',
    transformer: new ColumnNumericTransformer(),
  })
  longitude: number;
}