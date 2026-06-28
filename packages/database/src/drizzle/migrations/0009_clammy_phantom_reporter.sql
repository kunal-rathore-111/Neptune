CREATE TABLE "accountsTable" (
	"userId" uuid NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	CONSTRAINT "accountsTable_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "forgotPasswordOTPTable" (
	"email" text PRIMARY KEY NOT NULL,
	"otp" text NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "signUpOTPTable" (
	"email" text PRIMARY KEY NOT NULL,
	"otp" text NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tagsTable" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "tagsTable" CASCADE;--> statement-breakpoint
ALTER TABLE "contentTable" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "contentTable" ALTER COLUMN "category" SET DEFAULT 'Others';--> statement-breakpoint
ALTER TABLE "usersTable" ALTER COLUMN "password" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "usersTable" ALTER COLUMN "password" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "usersTable" ALTER COLUMN "createdAt" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "usersTable" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "usersTable" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "usersTable" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "usersTable" ADD COLUMN "isVerified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "usersTable" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "accountsTable" ADD CONSTRAINT "accountsTable_userId_usersTable_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."usersTable"("id") ON DELETE cascade ON UPDATE no action;