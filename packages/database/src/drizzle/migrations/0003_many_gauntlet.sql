ALTER TABLE "contentTable" DROP CONSTRAINT "contentTable_userId_unique";--> statement-breakpoint
CREATE INDEX "userIndex" ON "contentTable" USING btree ("userId");