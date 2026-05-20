ALTER TABLE "contentTable" ADD COLUMN "embedding" vector(768);--> statement-breakpoint
CREATE INDEX "embeddingIndex" ON "contentTable" USING hnsw ("embedding" vector_cosine_ops);