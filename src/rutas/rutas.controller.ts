import { Body, Controller, Get, Post } from '@nestjs/common';
import { RutasService } from './rutas.service';

@Controller('rutas')
export class RutasController {
  constructor(private readonly rutasService: RutasService) {}

  @Get()
  async getRutas() {
    return this.rutasService.findAll();
  }

  @Post()
  async createRuta(@Body() body: {
    origen: string;
    destino: string;
    distanciaKm: number;
    duracionEstimada: number;
  }) {
    return this.rutasService.create(body);
  }
}
