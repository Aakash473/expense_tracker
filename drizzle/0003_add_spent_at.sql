ALTER TABLE "expenses"
    ADD COLUMN "spent_at" timestamp with time zone
        NOT NULL DEFAULT now();

DROP INDEX "expenses_user_spent_at_idx";

CREATE INDEX "expenses_user_spent_at_idx"
    ON "expenses" USING btree ("user_id", "spent_at");