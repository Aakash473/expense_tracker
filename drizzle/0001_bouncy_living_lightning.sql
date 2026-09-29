DROP INDEX "expenses_user_spent_at_idx";--> statement-breakpoint
CREATE INDEX "expenses_user_spent_at_idx" ON "expenses" USING btree ("user_id");--> statement-breakpoint
ALTER TABLE "expenses" DROP COLUMN "spent_at";