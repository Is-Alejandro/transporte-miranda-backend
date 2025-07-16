import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Habilitamos CORS para permitir que el frontend en el puerto 5173 acceda al backend
  app.enableCors({
    origin: 'http://localhost:5173', // 🔥 URL del frontend en desarrollo
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    credentials: true, // ✅ Permite el uso de cookies o headers de autenticación
  });

  // ✅ Activamos validación automática en toda la app
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000); // 🌐 El backend escucha en el puerto 3000
}
bootstrap();
