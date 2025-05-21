-- CreateTable
CREATE TABLE "Automovel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "placa" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "marca" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Motorista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AutomovelMotorista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "automovelId" INTEGER NOT NULL,
    "motoristaId" INTEGER NOT NULL,
    "dataInicio" DATETIME NOT NULL,
    "dataFim" DATETIME,
    "motivo" TEXT NOT NULL,
    CONSTRAINT "AutomovelMotorista_automovelId_fkey" FOREIGN KEY ("automovelId") REFERENCES "Automovel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AutomovelMotorista_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motorista" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Automovel_placa_key" ON "Automovel"("placa");
