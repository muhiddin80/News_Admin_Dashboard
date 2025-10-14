import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NotAcceptableException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );
  app.enableCors({
    origin: (reqOrigin, callback) => {
      const allowedOrigins = process.env.CORS_ORIGINS
        ? process.env.CORS_ORIGINS.split(',')
        : [];

      if (
        !reqOrigin ||
        allowedOrigins.includes(reqOrigin) ||
        allowedOrigins.includes('*')
      ) {
        callback(null, true);
      } else {
        callback(
          new NotAcceptableException(
            `CORS: Request from origin ${reqOrigin} is not allowed`,
          ),
          false,
        );
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['authorization', 'content-type'],
    optionsSuccessStatus: 200,
  });

  const config = new DocumentBuilder()
    .setTitle('Test mater')
    .setDescription('The test maker api description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const Port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000;
  await app.listen(Port, () => {
    console.log(`http://localhost:${Port}/api`);
  });
}
bootstrap();
