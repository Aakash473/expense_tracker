CREATE TYPE "public"."shared_group_member_status" AS ENUM('pending', 'accepted', 'left');--> statement-breakpoint
CREATE TYPE "public"."shared_group_role" AS ENUM('owner', 'member');--> statement-breakpoint
CREATE TABLE "shared_expense_splits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"expense_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"share_amount" numeric(12, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "shared_expense_splits_expense_user_unique" UNIQUE("expense_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "shared_expenses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" uuid NOT NULL,
	"description" text NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"paid_by" uuid NOT NULL,
	"created_by" uuid NOT NULL,
	"spent_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shared_group_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "shared_group_role" DEFAULT 'member' NOT NULL,
	"status" "shared_group_member_status" DEFAULT 'pending' NOT NULL,
	"joined_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "shared_group_members_group_user_unique" UNIQUE("group_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "shared_groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shared_settlements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" uuid NOT NULL,
	"paid_by" uuid NOT NULL,
	"paid_to" uuid NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "shared_expense_splits" ADD CONSTRAINT "shared_expense_splits_expense_id_shared_expenses_id_fk" FOREIGN KEY ("expense_id") REFERENCES "public"."shared_expenses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_expense_splits" ADD CONSTRAINT "shared_expense_splits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_expenses" ADD CONSTRAINT "shared_expenses_group_id_shared_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."shared_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_expenses" ADD CONSTRAINT "shared_expenses_paid_by_users_id_fk" FOREIGN KEY ("paid_by") REFERENCES "auth"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_expenses" ADD CONSTRAINT "shared_expenses_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_group_members" ADD CONSTRAINT "shared_group_members_group_id_shared_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."shared_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_group_members" ADD CONSTRAINT "shared_group_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_groups" ADD CONSTRAINT "shared_groups_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_settlements" ADD CONSTRAINT "shared_settlements_group_id_shared_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."shared_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_settlements" ADD CONSTRAINT "shared_settlements_paid_by_users_id_fk" FOREIGN KEY ("paid_by") REFERENCES "auth"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shared_settlements" ADD CONSTRAINT "shared_settlements_paid_to_users_id_fk" FOREIGN KEY ("paid_to") REFERENCES "auth"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "shared_expense_splits_user_idx" ON "shared_expense_splits" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "shared_expenses_group_spent_at_idx" ON "shared_expenses" USING btree ("group_id","spent_at");--> statement-breakpoint
CREATE INDEX "shared_expenses_paid_by_idx" ON "shared_expenses" USING btree ("paid_by");--> statement-breakpoint
CREATE INDEX "shared_group_members_user_status_idx" ON "shared_group_members" USING btree ("user_id","status");--> statement-breakpoint
CREATE INDEX "shared_groups_created_by_idx" ON "shared_groups" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "shared_settlements_group_created_at_idx" ON "shared_settlements" USING btree ("group_id","created_at");--> statement-breakpoint
CREATE INDEX "shared_settlements_paid_by_idx" ON "shared_settlements" USING btree ("paid_by");--> statement-breakpoint
CREATE INDEX "shared_settlements_paid_to_idx" ON "shared_settlements" USING btree ("paid_to");