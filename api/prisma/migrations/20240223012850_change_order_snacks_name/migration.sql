/*
  Warnings:

  - You are about to drop the `snack_orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "snack_orders" DROP CONSTRAINT "snack_orders_order_id_fkey";

-- DropForeignKey
ALTER TABLE "snack_orders" DROP CONSTRAINT "snack_orders_snack_id_fkey";

-- DropTable
DROP TABLE "snack_orders";

-- CreateTable
CREATE TABLE "order_snacks" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "snack_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "order_snacks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_snacks" ADD CONSTRAINT "order_snacks_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_snacks" ADD CONSTRAINT "order_snacks_snack_id_fkey" FOREIGN KEY ("snack_id") REFERENCES "snacks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
