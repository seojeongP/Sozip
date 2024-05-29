import { Controller, Get } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
    constructor(private otherService: AnalysisService) {}

    @Get('/analysis')
    getAllAnalysis() {
    return this.otherService.getAllAnalysis();
    }
}
