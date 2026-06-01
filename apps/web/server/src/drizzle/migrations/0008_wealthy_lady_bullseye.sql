ALTER TABLE "contentTable" ALTER COLUMN "category" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "contentTable" ALTER COLUMN "category" SET DEFAULT 'Others';--> statement-breakpoint
DROP TYPE "public"."contentCategory";