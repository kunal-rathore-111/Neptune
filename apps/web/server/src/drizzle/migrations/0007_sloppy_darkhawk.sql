ALTER TABLE "contentTable" DROP CONSTRAINT "contentTable_link_unique";--> statement-breakpoint
ALTER TABLE "contentTable" ADD CONSTRAINT "contentTable_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "contentTable" ADD CONSTRAINT "contentTable_title_unique" UNIQUE("title");