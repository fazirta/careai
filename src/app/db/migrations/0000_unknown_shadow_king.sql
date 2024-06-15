CREATE TABLE IF NOT EXISTS "user_prompts" (
	"user_id" text PRIMARY KEY NOT NULL,
	"create_ts" timestamp DEFAULT now() NOT NULL,
	"prompt" text NOT NULL
);
