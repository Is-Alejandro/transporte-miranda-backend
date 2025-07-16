import { Module } from '@nestjs/common';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // 👈 Importamos PrismaModule para usar PrismaService

@Module({
  imports: [PrismaModule], // 📦 Hacemos disponible PrismaService en este módulo
  controllers: [BusesController], // 📡 Controlador para manejar las rutas HTTP
  providers: [BusesService],      // 🛠 Servicio para la lógica de negocio
})
export class BusesModule {}
