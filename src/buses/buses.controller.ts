import { Controller, Get, Post, Body } from '@nestjs/common';
import { BusesService } from './buses.service';

@Controller('buses') // 📡 Ruta base: http://localhost:3000/buses
export class BusesController {
  constructor(private readonly busesService: BusesService) {} // 🛠 Inyectamos el servicio

  // ✅ Endpoint: GET /buses
  // 📄 Devuelve todos los buses activos
  @Get()
  async findAll() {
    return this.busesService.findAll();
  }

  // ✅ Endpoint: POST /buses
  // 📄 Crea un nuevo bus con los datos enviados
  @Post()
  async create(
    @Body()
    data: {
      placa: string;
      marca: string;
      modelo: string;
      tipoBus: string;
      añoFabricacion: number;
      capacidadTotal: number;
    },
  ) {
    return this.busesService.create(data);
  }
}
