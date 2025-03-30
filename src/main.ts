import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProductModule } from './product/product.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors();
  
  const productConfig = new DocumentBuilder()
  .setTitle('product API')
  .setDescription('API for managing products')
  .setVersion('1.0')
  .addTag('products')
  .build();

  const productDocument = SwaggerModule.createDocument(app, productConfig, {
  include: [ProductModule],
  });

  SwaggerModule.setup('apidocs/products', app, productDocument);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
