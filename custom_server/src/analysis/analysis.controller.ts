import { Controller, Get } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@Controller()
export class AnalysisController {
    constructor(private analysisService: AnalysisService) {}

    @Get('/analysis')
    getAllAnalysis() {
        return this.analysisService.getAllAnalysis();
    }
}
