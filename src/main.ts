import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configservice = app.get(ConfigService);

  setupSwagger(app);

  const PORT = configservice.get<number>('PORT');

  await app.listen(PORT ?? 3000);
  console.log(`🚀 http://localhost:${PORT}`);
}
bootstrap();
