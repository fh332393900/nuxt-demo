-- CreateTable
CREATE TABLE "UserEmoji" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserEmoji_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserEmoji" ADD CONSTRAINT "UserEmoji_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
