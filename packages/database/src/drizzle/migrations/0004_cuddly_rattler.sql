ALTER TABLE "contentTable" ADD COLUMN "createdDate" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "contentTable" ADD COLUMN "updatedDate" timestamp DEFAULT now() NOT NULL;