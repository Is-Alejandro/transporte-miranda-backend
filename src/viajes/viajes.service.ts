import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // 👈 Importamos PrismaService para acceder a la base de datos

@Injectable()
// 🚀 Servicio para manejar la lógica de negocios de los viajes
export class ViajesService {
  constructor(private prisma: PrismaService) {} // 🛠 Inyectamos PrismaService para interactuar con la BD

  /**
   * 🔍 Método para buscar viajes según origen, destino y fecha
   * @param origen - Ciudad de origen
   * @param destino - Ciudad de destino
   * @param fecha - Fecha del viaje (string en formato ISO: YYYY-MM-DD)
   * @returns Lista de viajes que coincidan con los filtros
   */
  async buscarViajes(origen: string, destino: string, fecha: string) {
    const fechaDate = new Date(fecha); // 📅 Convertimos fecha string a Date

    return this.prisma.viaje.findMany({
      where: {
        fecha: fechaDate, // ✅ Prisma filtra por fecha exacta
        ruta: {
          origen: origen,   // 🌍 Filtramos por ciudad de origen
          destino: destino, // 🌍 Filtramos por ciudad de destino
        },
      },
      include: {
        ruta: true, // 👀 Incluimos datos de la ruta asociada
        bus: true,  // 👀 Incluimos datos del bus asignado
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
    fecha: string;        // 📅 Fecha en formato string (ISO)
    horaSalida: string;   // ⏰ Hora de salida
    horaLlegada: string;  // ⏰ Hora de llegada
  }) {
    const fechaDate = new Date(data.fecha); // 🛠 Convertimos string a Date para Prisma

    return this.prisma.viaje.create({
      data: {
        ...data,
        fecha: fechaDate, // ✅ Prisma recibe un objeto Date válido
      },
    });
  }
}
