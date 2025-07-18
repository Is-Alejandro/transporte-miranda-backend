import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RutasModule } from './rutas/rutas.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BusesModule } from './buses/buses.module';
import { ViajesModule } from './viajes/viajes.module';

@Module({
  imports: [PrismaModule, RutasModule, BusesModule, ViajesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
