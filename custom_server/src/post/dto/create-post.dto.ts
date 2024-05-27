import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { MarkerColor } from '../marker-color.enum';

export class CreatePostDto {
  @IsString()
  si: string;

  @IsString()
  gu: string;

  @IsString()
  dong: string;

  @IsString()
  address: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;

  @IsNumber()
  age: number;

  @IsNumber()
  area: number;

  @IsString()
  category: string;

  @IsString()
  payment: string;

  @IsNumber()
  price: number;

  @IsNumber()
  rent: number;

  @IsArray()
  imageUris: { uri: string }[];
}
