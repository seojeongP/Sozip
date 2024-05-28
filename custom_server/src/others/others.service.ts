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

    async getAllBuses() {
        try {
          const buses = await this.othersRepository
            .createQueryBuilder('others')
            .where('others.which = :bus', { bus: 'bus' })
            .getMany();
    
          return buses;
        } catch (error) {
          console.log(error);
          throw new InternalServerErrorException(
            '버스 마커를 가져오는 도중 에러가 발생했습니다.',
          );
        }
    }

    
}
