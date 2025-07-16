import { Controller, Get, Post, Body, Query, BadRequestException } from '@nestjs/common';
import { ViajesService } from './viajes.service';
import { CrearViajeDto } from './dto/crear-viaje/crear-viaje.dto'; // ✅ Importamos DTO

@Controller('viajes') // 📡 Ruta base: http://localhost:3000/viajes
export class ViajesController {
  constructor(private readonly viajesService: ViajesService) {}

  /**
   * 🔍 GET /viajes
   * Permite buscar viajes filtrando por origen, destino y fecha
   */
  @Get()
  async buscarViajes(
    @Query('origen') origen: string,
    @Query('destino') destino: string,
    @Query('fecha') fecha: string, // 📅 Recibimos fecha como string
  ) {
    if (!origen || !destino || !fecha) {
      throw new BadRequestException(
        'Los parámetros origen, destino y fecha son obligatorios.',
      );
    }

    const fechaDate = new Date(fecha); // 📅 Convertimos string a Date
    return this.viajesService.buscarViajes(origen, destino, fechaDate);
  }

  /**
   * ➕ POST /viajes
   * Crea un nuevo viaje con los datos enviados en el body
   */
  @Post()
  async crearViaje(@Body() data: CrearViajeDto) {
    // 🛠 Convertimos la fecha de string a Date antes de enviar al servicio
    const viajeConFechaDate = {
      ...data,
      fecha: new Date(data.fecha), // ✅ Conversión aquí
    };

    return this.viajesService.crearViaje(viajeConFechaDate);
  }
}
