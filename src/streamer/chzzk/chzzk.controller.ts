import { Controller } from '@nestjs/common';
import { ChzzkService } from './chzzk.service';

@Controller()
export class ChzzkController {
  constructor(private readonly chzzkService: ChzzkService) {}
}
