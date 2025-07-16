import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 🌐 Hace que PrismaModule sea global y esté disponible en toda la app sin necesidad de importarlo en cada módulo
@Module({
  providers: [
    PrismaService, // 🛠 PrismaService provee el cliente Prisma para acceder a la base de datos
  ],
  exports: [
    PrismaService, // 🚀 Exportamos PrismaService para que otros módulos (como BusesModule o RutasModule) puedan usarlo
  ],
})
export class PrismaModule {}
