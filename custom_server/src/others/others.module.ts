import { Module } from '@nestjs/common';
import { OthersController } from './others.controller';
import { OthersService } from './others.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Others } from './others.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Others])],
  controllers: [OthersController],
  providers: [OthersService]
})
export class OthersModule {}
