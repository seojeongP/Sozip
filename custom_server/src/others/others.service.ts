import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Others } from './others.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OthersService {
    constructor(
        @InjectRepository(Others)
        private othersRepository: Repository<Others>,
      ) {}

    async getAllOthers() {
        try {
          const others = await this.othersRepository
            .createQueryBuilder('others')
            .getMany();
    
          return others;
        } catch (error) {
          console.log(error);
          throw new InternalServerErrorException(
            '주변 시설 마커를 가져오는 도중 에러가 발생했습니다.',
          );
        }
    }
}
