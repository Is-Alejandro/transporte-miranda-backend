/*
  Warnings:

  - You are about to drop the `Viaje` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Viaje" DROP CONSTRAINT "Viaje_idRuta_fkey";

-- DropTable
DROP TABLE "Viaje";

-- CreateTable
CREATE TABLE "buses" (
    "id" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "tipoBus" TEXT NOT NULL,
    "añoFabricacion" INTEGER NOT NULL,
    "capacidadTotal" INTEGER NOT NULL,
    "estadoOperativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "buses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "viajes" (
    "id" SERIAL NOT NULL,
    "idRuta" INTEGER NOT NULL,
    "idBus" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "horaSalida" TEXT NOT NULL,
    "horaLlegada" TEXT NOT NULL,

    CONSTRAINT "viajes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asientos" (
    "id" SERIAL NOT NULL,
    "idBus" INTEGER NOT NULL,
    "numero" INTEGER NOT NULL,

    CONSTRAINT "asientos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "buses_placa_key" ON "buses"("placa");

-- AddForeignKey
ALTER TABLE "viajes" ADD CONSTRAINT "viajes_idRuta_fkey" FOREIGN KEY ("idRuta") REFERENCES "rutas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viajes" ADD CONSTRAINT "viajes_idBus_fkey" FOREIGN KEY ("idBus") REFERENCES "buses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asientos" ADD CONSTRAINT "asientos_idBus_fkey" FOREIGN KEY ("idBus") REFERENCES "buses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
