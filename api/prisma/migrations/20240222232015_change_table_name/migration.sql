/*
  Warnings:

  - You are about to drop the `orders_snacks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders_snacks" DROP CONSTRAINT "orders_snacks_order_id_fkey";

-- DropForeignKey
ALTER TABLE "orders_snacks" DROP CONSTRAINT "orders_snacks_snack_id_fkey";

-- DropTable
DROP TABLE "orders_snacks";

-- CreateTable
CREATE TABLE "snack_orders" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "snack_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "snack_orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "snack_orders" ADD CONSTRAINT "snack_orders_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "snack_orders" ADD CONSTRAINT "snack_orders_snack_id_fkey" FOREIGN KEY ("snack_id") REFERENCES "snacks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
