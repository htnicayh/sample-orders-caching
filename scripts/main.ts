import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './logger/logger.service';

async function bootstrap() {
  const customLogger = new CustomLogger()
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'warn']
  });
  await app.listen(process.env.PORT || 3000);

  customLogger.log(`Application is running at PORT ${process.env.PORT}`, 'Application')
}
bootstrap();
