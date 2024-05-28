import { Controller, Get } from '@nestjs/common';
import { OthersService } from './others.service';

@Controller()
export class OthersController {
    constructor(private otherService: OthersService) {}

    @Get('/others/bus')
    getAllBuses() {
    return this.otherService.getAllBuses();
  }
}
