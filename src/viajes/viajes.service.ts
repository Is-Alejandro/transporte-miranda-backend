import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // ✅ Servicio para interactuar con la base de datos

@Injectable()
/**
 * 🚀 Servicio que contiene la lógica de negocio para los viajes
 */
export class ViajesService {
  constructor(private prisma: PrismaService) {} // 🛠 Inyectamos PrismaService para consultas

  /**
   * 🔍 Busca viajes según origen, destino y fecha
   * @param origen - Ciudad de origen
   * @param destino - Ciudad de destino
   * @param fecha - Fecha del viaje como objeto Date
   * @returns Lista de viajes que coincidan con los filtros
   */
  async buscarViajes(origen: string, destino: string, fecha: Date) {
    return this.prisma.viaje.findMany({
      where: {
        fecha, // 🎯 Filtramos por fecha exacta
        ruta: {
          origen,   // 🌍 Coincidencia exacta de ciudad de origen
          destino,  // 🌍 Coincidencia exacta de ciudad de destino
        },
      },
      include: {
        ruta: true, // 📦 Incluye detalles de la ruta asociada
        bus: true,  // 🚌 Incluye detalles del bus asignado
      },
    });
  }

  /**
   * ➕ Crea un nuevo viaje y genera los asientos dinámicos en viaje_asiento
   * @param data - Datos necesarios para registrar un viaje
   * @returns El viaje creado en la base de datos
   */
  async crearViaje(data: {
    idRuta: number;       // 🔗 ID de la ruta asociada
    idBus: number;        // 🔗 ID del bus asignado
    fecha: Date;          // 📅 Fecha del viaje
    horaSalida: string;   // ⏰ Hora de salida
    horaLlegada: string;  // ⏰ Hora de llegada
  }) {
    // ✅ Paso 1: Crear el viaje en la tabla 'viajes'
    const nuevoViaje = await this.prisma.viaje.create({
      data: { ...data },
    });

    // ✅ Paso 2: Obtener todos los asientos del bus asignado
    const asientos = await this.prisma.asiento.findMany({
      where: { idBus: data.idBus },
    });

    // ⚠️ Validación: asegurarse de que el bus tenga asientos
    if (asientos.length === 0) {
      throw new BadRequestException('El bus no tiene asientos registrados.');
    }

    // ✅ Paso 3: Crear registros para la tabla 'viaje_asiento' con estado inicial
    const viajeAsientos = asientos.map((asiento) => ({
      idViaje: nuevoViaje.id, // Relaciona con el viaje recién creado
      idAsiento: asiento.id,  // Relaciona con cada asiento físico
      estado: 'disponible',   // 🔓 Todos inician como disponibles
    }));

    // ✅ Paso 4: Insertar los registros en la tabla 'viaje_asiento'
    await this.prisma.viajeAsiento.createMany({
      data: viajeAsientos,
    });

    // 🔥 Retornar el viaje creado como respuesta
    return nuevoViaje;
  }

  /**
   * 🔒 Cambia el estado de un asiento a "reservado" en un viaje
   * @param idViaje - ID del viaje
   * @param idAsiento - ID del asiento físico
   * @returns Registro actualizado en viaje_asiento
   */
  async reservarAsiento(idViaje: number, idAsiento: number) {
    // 🔍 Busca el asiento en viaje_asiento
    const asiento = await this.prisma.viajeAsiento.findFirst({
      where: {
        idViaje,
        idAsiento,
        estado: "disponible", // Solo permitimos reservar si está disponible
      },
    });

    if (!asiento) {
      throw new NotFoundException("El asiento no está disponible o no existe.");
    }

    // 🔒 Actualiza el estado a "reservado"
    return this.prisma.viajeAsiento.update({
      where: { id: asiento.id },
      data: { estado: "reservado" },
    });
  }

  /**
   * 🪑 Obtiene todos los asientos de un viaje
   * @param idViaje - ID del viaje
   * @returns Lista de asientos con su estado
   */
  async obtenerAsientosPorViaje(idViaje: number) {
    return this.prisma.viajeAsiento.findMany({
      where: { idViaje },
      include: {
        asiento: true, // Incluye detalles del asiento físico
      },
    });
  }
}
