import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ColumnNumericTransformer } from 'src/@common/transformers/numeric.transformer';
import { User } from 'src/auth/user.entity';
import { Image } from 'src/image/image.entity';
import { Favorite } from 'src/favorite/favorite.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  si: string;

  @Column()
  gu: string;

  @Column()
  dong: string;

  @Column()
  address: string;

  @Column()
  title: string;

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

  @Column()
  age: number;

  @Column()
  category: string;

  @Column({
    type: 'decimal',
    transformer: new ColumnNumericTransformer(),
  })
  area: number;

  @Column()
  payment: string;

  @Column()
  price: number;

  @Column()
  rent: number;

  @Column()
  bus: string;

  @Column({
    type: 'decimal',
    transformer: new ColumnNumericTransformer(),
  })
  dis_bus: number;

  @Column()
  metro: string;

  @Column({
    type: 'decimal',
    transformer: new ColumnNumericTransformer(),
  })
  dis_metro: number;

  @Column()
  elementary: string;

  @Column({
    type: 'decimal',
    transformer: new ColumnNumericTransformer(),
  })
  dis_elementary: number;

  @Column()
  middle: string;

  @Column({
    type: 'decimal',
    transformer: new ColumnNumericTransformer(),
  })
  dis_middle: number;

  @Column()
  high: string;

  @Column({
    type: 'decimal',
    transformer: new ColumnNumericTransformer(),
  })
  dis_high: number;

  @Column()
  pharmacy: number;

  @Column()
  hospital: number;

  @Column()
  fire: number;

  @Column()
  police: number;

  @Column()
  conv: number;

  @Column()
  mart: number;

  @Column()
  lib: number;




  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.post, { eager: false })
  user: User;

  @OneToMany(() => Image, (image) => image.post)
  images: Image[];

  @OneToMany(() => Favorite, (favorite) => favorite.post)
  favorites: Favorite[];
}
