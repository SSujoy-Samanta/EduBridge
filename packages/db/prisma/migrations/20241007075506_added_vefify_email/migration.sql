-- CreateTable
CREATE TABLE "VerifyEmail" (
    "id" SERIAL NOT NULL,
    "OTP" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerifyEmail_pkey" PRIMARY KEY ("id")
);
