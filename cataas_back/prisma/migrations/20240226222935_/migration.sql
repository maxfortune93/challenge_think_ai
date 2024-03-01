-- CreateTable
CREATE TABLE `Cat` (
    `id` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NULL,
    `text` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
