import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error'],
  });
  const config = new DocumentBuilder()
    .setTitle('Bookstore')
    .setDescription('The Bookstore API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is listening on: ${await app.getUrl()}`);
}
bootstrap();
