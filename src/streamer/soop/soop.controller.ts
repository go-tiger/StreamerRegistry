import { Controller } from '@nestjs/common';
import { SoopService } from './soop.service';

@Controller()
export class SoopController {
  constructor(private readonly soopService: SoopService) {}
}
