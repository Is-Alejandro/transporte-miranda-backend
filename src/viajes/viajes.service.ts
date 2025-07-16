import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // ✅ Servicio Prisma para interactuar con la base de datos

@Injectable()
// 🚀 Servicio que contiene la lógica de negocio para los viajes
export class ViajesService {
  constructor(private prisma: PrismaService) {} // 🛠 Inyectamos PrismaService para consultas a la BD

  /**
   * 🔍 Método para buscar viajes según origen, destino y fecha
   * @param origen - Ciudad de origen
   * @param destino - Ciudad de destino
   * @param fecha - Fecha del viaje como objeto Date
   * @returns Lista de viajes que coincidan con los filtros
   */
  async buscarViajes(origen: string, destino: string, fecha: Date) {
    return this.prisma.viaje.findMany({
      where: {
        fecha: fecha, // ✅ Filtramos por fecha exacta usando objeto Date
        ruta: {
          origen: origen,   // 🌍 Ciudad de origen
          destino: destino, // 🌍 Ciudad de destino
        },
      },
      include: {
        ruta: true, // 📦 Incluimos detalles de la ruta asociada
        bus: true,  // 🚌 Incluimos detalles del bus asignado
      },
    });
  }

  /**
   * ➕ Método para crear un nuevo viaje
   * @param data - Datos necesarios para registrar un viaje
   * @returns El viaje creado en la base de datos
   */
  async crearViaje(data: {
    idRuta: number;       // 🔗 ID de la ruta asociada
    idBus: number;        // 🔗 ID del bus asignado
    fecha: Date;          // 📅 Fecha ya como objeto Date
    horaSalida: string;   // ⏰ Hora de salida
    horaLlegada: string;  // ⏰ Hora de llegada
  }) {
    return this.prisma.viaje.create({
      data: {
        ...data, // 📦 Spread de los datos recibidos
      },
    });
  }
}
