import { ColumnNumericTransformer } from "src/@common/transformers/numeric.transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Analysis extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  num: number;

  @Column()
  check: string;

  @Column()
  option: string;

  @Column({
    type: 'decimal',
    transformer: new ColumnNumericTransformer(),
  })
  min: number;

  @Column({
    type: 'decimal',
    transformer: new ColumnNumericTransformer(),
  })
  Q1: number;

  @Column({
    type: 'decimal',
    transformer: new ColumnNumericTransformer(),
  })
  median: number;

  @Column({
    type: 'decimal',
    transformer: new ColumnNumericTransformer(),
  })
  Q3: number;

  @Column({
    type: 'decimal',
    transformer: new ColumnNumericTransformer(),
  })
  max: number;
}