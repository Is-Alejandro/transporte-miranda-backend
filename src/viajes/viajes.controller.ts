import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ViajesService } from './viajes.service';
import { CrearViajeDto } from './dto/crear-viaje/crear-viaje.dto'; // ✅ Importamos el DTO correctamente

@Controller('viajes') // 📡 Ruta base: http://localhost:3000/viajes
export class ViajesController {
  constructor(private readonly viajesService: ViajesService) {}

  /**
   * 🔍 GET /viajes
   * Permite buscar viajes filtrando por origen, destino y fecha
   * @param origen - Ciudad de origen (query param)
   * @param destino - Ciudad de destino (query param)
   * @param fecha - Fecha en formato string (query param)
   */
  @Get()
  async buscarViajes(
    @Query('origen') origen: string,
    @Query('destino') destino: string,
    @Query('fecha') fecha: string, // 📅 Recibimos fecha como string
  ) {
    // ✅ Delegamos la conversión a Date en el servicio
    return this.viajesService.buscarViajes(origen, destino, fecha);
  }

  /**
   * ➕ POST /viajes
   * Crea un nuevo viaje con los datos enviados en el body
   * @param data - Datos del nuevo viaje validados por el DTO
   */
  @Post()
  async crearViaje(@Body() data: CrearViajeDto) {
    // ✅ Pasamos los datos tal como vienen al servicio
    return this.viajesService.crearViaje(data);
  }
}
