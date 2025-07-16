import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // 👈 Importamos Prisma para acceder a la BD

@Injectable()
// 🚀 Servicio para manejar la lógica de Buses
export class BusesService {
  constructor(private prisma: PrismaService) {} // 🛠 Inyectamos PrismaService

  // ✅ Método para obtener todos los buses
  async findAll() {
    return this.prisma.bus.findMany({
      where: { estadoOperativo: true }, // 🔥 Solo buses activos
    });
  }

  // ✅ Método para crear un bus nuevo
  async create(data: {
    placa: string;
    marca: string;
    modelo: string;
    tipoBus: string;
    añoFabricacion: number;
    capacidadTotal: number;
  }) {
    return this.prisma.bus.create({
      data: {
        ...data, // 🛠 Guardamos los datos tal como vienen
      },
    });
  }
}
