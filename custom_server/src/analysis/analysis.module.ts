import { Module } from '@nestjs/common';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analysis } from './analysis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Analysis])],
  controllers: [AnalysisController],
  providers: [AnalysisService]
})
export class AnalysisModule {}
