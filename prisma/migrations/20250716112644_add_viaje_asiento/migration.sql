-- CreateTable
CREATE TABLE "viaje_asiento" (
    "id" SERIAL NOT NULL,
    "idViaje" INTEGER NOT NULL,
    "idAsiento" INTEGER NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'disponible',

    CONSTRAINT "viaje_asiento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "viaje_asiento" ADD CONSTRAINT "viaje_asiento_idViaje_fkey" FOREIGN KEY ("idViaje") REFERENCES "viajes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viaje_asiento" ADD CONSTRAINT "viaje_asiento_idAsiento_fkey" FOREIGN KEY ("idAsiento") REFERENCES "asientos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
