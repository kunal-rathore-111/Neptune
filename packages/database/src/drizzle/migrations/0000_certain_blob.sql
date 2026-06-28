CREATE TYPE "public"."contentType" AS ENUM('Twitter', 'Youtube', 'Instagram', 'Other');--> statement-breakpoint
CREATE TABLE "contentTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" varchar(1000),
	"link" varchar(1000) NOT NULL,
	"type" "contentType" DEFAULT 'Other' NOT NULL,
	"tags" varchar(50)[],
	"userId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "linkTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"linkhash" varchar(60) NOT NULL,
	"userId" uuid NOT NULL,
	CONSTRAINT "linkTable_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "usersTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(250) NOT NULL,
	"email" varchar(400) NOT NULL,
	"password" varchar(60) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "usersTable_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "tagsTable" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tags" varchar(60) NOT NULL,
	CONSTRAINT "tagsTable_tags_unique" UNIQUE("tags")
);
--> statement-breakpoint
ALTER TABLE "contentTable" ADD CONSTRAINT "contentTable_userId_usersTable_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."usersTable"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linkTable" ADD CONSTRAINT "linkTable_userId_usersTable_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."usersTable"("id") ON DELETE cascade ON UPDATE no action;