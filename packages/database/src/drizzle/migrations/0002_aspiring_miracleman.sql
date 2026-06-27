CREATE TYPE "public"."contentCategory" AS ENUM('Development', 'Finance', 'Study', 'Social', 'GitHub', 'Exams', 'AI', 'Research', 'Design', 'Others');--> statement-breakpoint
CREATE TABLE "ContentShareLinkTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contentShareHash" text NOT NULL,
	"contentId" uuid NOT NULL,
	CONSTRAINT "ContentShareLinkTable_contentId_unique" UNIQUE("contentId")
);
--> statement-breakpoint
CREATE TABLE "UserShareLinkTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"linkhash" text NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "linkTable" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "linkTable" CASCADE;--> statement-breakpoint
ALTER TABLE "contentTable" ALTER COLUMN "title" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "contentTable" ALTER COLUMN "link" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "contentTable" ALTER COLUMN "link" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "contentTable" ADD COLUMN "category" "contentCategory" DEFAULT 'Others' NOT NULL;--> statement-breakpoint
ALTER TABLE "ContentShareLinkTable" ADD CONSTRAINT "ContentShareLinkTable_contentId_contentTable_id_fk" FOREIGN KEY ("contentId") REFERENCES "public"."contentTable"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "UserShareLinkTable" ADD CONSTRAINT "UserShareLinkTable_userId_usersTable_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."usersTable"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contentTable" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "contentTable" ADD CONSTRAINT "contentTable_link_unique" UNIQUE("link");--> statement-breakpoint
ALTER TABLE "contentTable" ADD CONSTRAINT "contentTable_userId_unique" UNIQUE("userId");--> statement-breakpoint
DROP TYPE "public"."contentType";