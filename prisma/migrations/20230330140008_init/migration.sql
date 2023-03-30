-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('BASIC', 'CDD', 'CDI');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Employee" (
    "employee_pk" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "salary" DECIMAL(65,30) NOT NULL,
    "contract" BOOLEAN NOT NULL,
    "typeContract" "ContractType" DEFAULT 'BASIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "Status" DEFAULT 'ACTIVE',

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employee_pk")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "employee_fk" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "ariaCode" TEXT NOT NULL,
    "employee_fk" INTEGER NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role"[] DEFAULT ARRAY['BASIC']::"Role"[],

    CONSTRAINT "AppUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_employee_fk_fkey" FOREIGN KEY ("employee_fk") REFERENCES "Employee"("employee_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_employee_fk_fkey" FOREIGN KEY ("employee_fk") REFERENCES "Employee"("employee_pk") ON DELETE RESTRICT ON UPDATE CASCADE;
