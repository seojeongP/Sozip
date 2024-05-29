import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Analysis } from './analysis.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnalysisService {constructor(
        @InjectRepository(Analysis)
        private analysisRepository: Repository<Analysis>,
      ) {}

    async getAllAnalysis() {
        try {
          const analysis = await this.analysisRepository
            .createQueryBuilder('analysis')
            .select([
              'analysis.id',
              'analysis.num',
              'analysis.check',
              'analysis.option',
              'analysis.min',
              'analysis.Q1',
              'analysis.median',
              'analysis.Q3',
              'analysis.max',
            ])
            .getMany();
    
          return analysis;
        } catch (error) {
          console.log(error);
          throw new InternalServerErrorException(
            '분석정보를 가져오는 도중 에러가 발생했습니다.',
          );
        }
    }
}
