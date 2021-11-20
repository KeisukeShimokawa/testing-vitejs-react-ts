import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';

export const setup = (app: INestApplication): INestApplication => {
  const prismaService = app.get<PrismaService>(PrismaService);
  prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .setTitle('認証システム')
    .setDescription('タスク管理を例題に認証システムを構築する')
    .setVersion('0.1')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  return app;
};
