/*
  Warnings:

  - You are about to drop the `asientos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `buses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rutas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `viaje_asiento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `viajes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "asientos" DROP CONSTRAINT "asientos_idBus_fkey";

-- DropForeignKey
ALTER TABLE "viaje_asiento" DROP CONSTRAINT "viaje_asiento_idAsiento_fkey";

-- DropForeignKey
ALTER TABLE "viaje_asiento" DROP CONSTRAINT "viaje_asiento_idViaje_fkey";

-- DropForeignKey
ALTER TABLE "viajes" DROP CONSTRAINT "viajes_idBus_fkey";

-- DropForeignKey
ALTER TABLE "viajes" DROP CONSTRAINT "viajes_idRuta_fkey";

-- DropTable
DROP TABLE "asientos";

-- DropTable
DROP TABLE "buses";

-- DropTable
DROP TABLE "rutas";

-- DropTable
DROP TABLE "viaje_asiento";

-- DropTable
DROP TABLE "viajes";

-- CreateTable
CREATE TABLE "Ruta" (
    "id" SERIAL NOT NULL,
    "origen" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "distanciaKm" DOUBLE PRECISION NOT NULL,
    "duracionEstimada" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Ruta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bus" (
    "id" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "tipoBus" TEXT NOT NULL,
    "añoFabricacion" INTEGER NOT NULL,
    "capacidadTotal" INTEGER NOT NULL,
    "estadoOperativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Viaje" (
    "id" SERIAL NOT NULL,
    "idRuta" INTEGER NOT NULL,
    "idBus" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "horaSalida" TEXT NOT NULL,
    "horaLlegada" TEXT NOT NULL,

    CONSTRAINT "Viaje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asiento" (
    "id" SERIAL NOT NULL,
    "idBus" INTEGER NOT NULL,
    "numero" INTEGER NOT NULL,

    CONSTRAINT "Asiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViajeAsiento" (
    "id" SERIAL NOT NULL,
    "idViaje" INTEGER NOT NULL,
    "idAsiento" INTEGER NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'disponible',

    CONSTRAINT "ViajeAsiento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bus_placa_key" ON "Bus"("placa");

-- AddForeignKey
ALTER TABLE "Viaje" ADD CONSTRAINT "Viaje_idRuta_fkey" FOREIGN KEY ("idRuta") REFERENCES "Ruta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viaje" ADD CONSTRAINT "Viaje_idBus_fkey" FOREIGN KEY ("idBus") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asiento" ADD CONSTRAINT "Asiento_idBus_fkey" FOREIGN KEY ("idBus") REFERENCES "Bus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViajeAsiento" ADD CONSTRAINT "ViajeAsiento_idViaje_fkey" FOREIGN KEY ("idViaje") REFERENCES "Viaje"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViajeAsiento" ADD CONSTRAINT "ViajeAsiento_idAsiento_fkey" FOREIGN KEY ("idAsiento") REFERENCES "Asiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
