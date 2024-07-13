-- CreateTable
CREATE TABLE "Item" (
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "saleType" TEXT NOT NULL,
    "buy" INTEGER NOT NULL,
    "sale" INTEGER NOT NULL,
    "inventory" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("code")
);
