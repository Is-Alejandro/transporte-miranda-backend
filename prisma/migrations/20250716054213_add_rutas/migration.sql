-- CreateTable
CREATE TABLE "rutas" (
    "id" SERIAL NOT NULL,
    "origen" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "distanciaKm" DOUBLE PRECISION NOT NULL,
    "duracionEstimada" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "rutas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Viaje" (
    "id" SERIAL NOT NULL,
    "idRuta" INTEGER NOT NULL,

    CONSTRAINT "Viaje_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Viaje" ADD CONSTRAINT "Viaje_idRuta_fkey" FOREIGN KEY ("idRuta") REFERENCES "rutas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
