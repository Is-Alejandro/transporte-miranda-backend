import { IsDateString, IsInt, IsString } from 'class-validator';

// 📄 DTO para validar y transformar los datos al crear un viaje
export class CrearViajeDto {
  @IsInt()
  idRuta: number; // 🔗 ID de la ruta (entero)

  @IsInt()
  idBus: number; // 🔗 ID del bus (entero)

  @IsDateString()
  fecha: string; // 📅 Fecha en formato ISO (YYYY-MM-DD)

  @IsString()
  horaSalida: string; // ⏰ Hora de salida (string)

  @IsString()
  horaLlegada: string; // ⏰ Hora de llegada (string)
}
