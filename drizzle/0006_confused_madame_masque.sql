ALTER TABLE "shared_expense_splits" DROP CONSTRAINT "shared_expense_splits_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "shared_expenses" DROP CONSTRAINT "shared_expenses_paid_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "shared_expenses" DROP CONSTRAINT "shared_expenses_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "shared_group_members" DROP CONSTRAINT "shared_group_members_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "shared_groups" DROP CONSTRAINT "shared_groups_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "shared_settlements" DROP CONSTRAINT "shared_settlements_paid_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "shared_settlements" DROP CONSTRAINT "shared_settlements_paid_to_users_id_fk";
--> statement-breakpoint
ALTER TABLE "shared_expense_splits" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "shared_expenses" ALTER COLUMN "paid_by" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "shared_expenses" ALTER COLUMN "created_by" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "shared_group_members" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "shared_groups" ALTER COLUMN "created_by" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "shared_settlements" ALTER COLUMN "paid_by" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "shared_settlements" ALTER COLUMN "paid_to" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "shared_expense_splits" ADD CONSTRAINT "shared_expense_splits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_expenses" ADD CONSTRAINT "shared_expenses_paid_by_users_id_fk" FOREIGN KEY ("paid_by") REFERENCES "auth"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_expenses" ADD CONSTRAINT "shared_expenses_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_group_members" ADD CONSTRAINT "shared_group_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_groups" ADD CONSTRAINT "shared_groups_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_settlements" ADD CONSTRAINT "shared_settlements_paid_by_users_id_fk" FOREIGN KEY ("paid_by") REFERENCES "auth"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_settlements" ADD CONSTRAINT "shared_settlements_paid_to_users_id_fk" FOREIGN KEY ("paid_to") REFERENCES "auth"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_expense_splits" ADD CONSTRAINT "shared_expense_splits_share_amount_non_negative" CHECK ("shared_expense_splits"."share_amount" >= 0);--> statement-breakpoint
ALTER TABLE "shared_expenses" ADD CONSTRAINT "shared_expenses_amount_positive" CHECK ("shared_expenses"."amount" > 0);--> statement-breakpoint
ALTER TABLE "shared_settlements" ADD CONSTRAINT "shared_settlements_amount_positive" CHECK ("shared_settlements"."amount" > 0);--> statement-breakpoint
ALTER TABLE "shared_settlements" ADD CONSTRAINT "shared_settlements_no_self_payment" CHECK ("shared_settlements"."paid_by" IS NULL OR "shared_settlements"."paid_to" IS NULL OR "shared_settlements"."paid_by" <> "shared_settlements"."paid_to");