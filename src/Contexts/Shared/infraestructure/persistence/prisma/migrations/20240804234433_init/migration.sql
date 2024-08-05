-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "cin" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Distributor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" JSONB,

    CONSTRAINT "Distributor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "saleType" TEXT NOT NULL,
    "basePrice" INTEGER NOT NULL,
    "unitaryPrice" INTEGER NOT NULL,
    "wholesalePrice" INTEGER NOT NULL,
    "stock" DOUBLE PRECISION NOT NULL,
    "distributorId" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Customer" (
    "ruc" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subName" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("ruc")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" BIGSERIAL NOT NULL,
    "customerRuc" TEXT,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Distributor_id_key" ON "Distributor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_code_key" ON "Item"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_ruc_key" ON "Customer"("ruc");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_distributorId_fkey" FOREIGN KEY ("distributorId") REFERENCES "Distributor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_customerRuc_fkey" FOREIGN KEY ("customerRuc") REFERENCES "Customer"("ruc") ON DELETE SET NULL ON UPDATE CASCADE;
