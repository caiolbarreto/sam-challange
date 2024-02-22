-- CreateTable
CREATE TABLE "ingredients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "snacks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "snacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "snack_ingredients" (
    "id" TEXT NOT NULL,
    "snack_id" TEXT NOT NULL,
    "ingredients_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "snack_ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders_snacks" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "snack_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "orders_snacks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "snack_ingredients" ADD CONSTRAINT "snack_ingredients_snack_id_fkey" FOREIGN KEY ("snack_id") REFERENCES "snacks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "snack_ingredients" ADD CONSTRAINT "snack_ingredients_ingredients_id_fkey" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_snacks" ADD CONSTRAINT "orders_snacks_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_snacks" ADD CONSTRAINT "orders_snacks_snack_id_fkey" FOREIGN KEY ("snack_id") REFERENCES "snacks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
