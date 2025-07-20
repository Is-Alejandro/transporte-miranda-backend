import { Controller, Get, Post, Body, Param, Query, BadRequestException } from '@nestjs/common';
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

  /**
   * 🔒 POST /viajes/reservar
   * Permite reservar un asiento para un viaje
   */
  @Post('reservar')
  async reservarAsiento(@Body() body: { idViaje: number; idAsiento: number }) {
    return this.viajesService.reservarAsiento(body.idViaje, body.idAsiento);
  }

  /**
   * 🪑 GET /viajes/:id/asientos
   * Devuelve todos los asientos para un viaje específico
   */
  @Get(':id/asientos')
  async getAsientosPorViaje(@Param('id') id: string) {
    const idViaje = parseInt(id, 10);
    if (isNaN(idViaje)) {
      throw new BadRequestException('El ID del viaje debe ser un número válido.');
    }
    return this.viajesService.obtenerAsientosPorViaje(idViaje);
  }
}
