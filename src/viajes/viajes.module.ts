import { Module } from '@nestjs/common';
import { ViajesService } from './viajes.service';
import { ViajesController } from './viajes.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // 👈 Importamos PrismaModule para usar PrismaService

@Module({
  imports: [
    PrismaModule, // 🛠 Importamos PrismaModule para tener acceso a PrismaService en este módulo
  ],
  controllers: [
    ViajesController, // 📡 Controlador que expone los endpoints HTTP
  ],
  providers: [
    ViajesService, // 🚀 Servicio con la lógica de negocio para los viajes
  ],
})
export class ViajesModule {}
