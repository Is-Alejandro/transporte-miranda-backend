import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RutasService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.ruta.findMany();
  }

  async create(data: {
    origen: string;
    destino: string;
    distanciaKm: number;
    duracionEstimada: number;
  }) {
    return this.prisma.ruta.create({
      data: {
        ...data,
      },
    });
  }
}
