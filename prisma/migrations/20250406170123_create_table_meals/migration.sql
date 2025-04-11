-- CreateTable
CREATE TABLE "meals" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_on_diet" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);
