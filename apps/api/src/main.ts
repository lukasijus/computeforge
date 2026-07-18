import 'reflect-metadata';

import { Controller, Get, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Controller()
class HealthController {
  @Get('/health')
  getHealth(): { status: 'ok'; service: string } {
    return { status: 'ok', service: 'computeforge-api' };
  }
}

@Module({ controllers: [HealthController] })
class AppModule {}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = Number.parseInt(process.env.PORT ?? '3000', 10);

  await app.listen(port);
}

bootstrap().catch((error: unknown) => {
  console.error('Failed to start ComputeForge API', error);
  process.exitCode = 1;
});
