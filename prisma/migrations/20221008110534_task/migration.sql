-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL,
    "toSend" BOOLEAN NOT NULL DEFAULT true,
    "taskId" INTEGER NOT NULL,
    "task" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
