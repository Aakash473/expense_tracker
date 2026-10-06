# Architecture Guide

## Overview

This project follows a **vertical slice architecture**. Each use case owns the code required to implement its functionality, including validation, server actions, database queries, and UI components.

The `app/` directory is responsible for routing and composing features. Shared infrastructure belongs in `shared/`.

## Project Structure

```text
app/
  dashboard/
    page.tsx
    loading.tsx
    error.tsx
  login/
    page.tsx

features/
  expenses/
    create-expense/
      action.ts
      schema.ts
      query.ts
      CreateExpenseForm.tsx
    delete-expense/
      action.ts
      schema.ts
      query.ts
      DeleteExpenseButton.tsx
    list-expenses/
      query.ts
      ExpenseList.tsx
    spending-summary/
      SpendingSummary.tsx
      CategorySpending.tsx
  categories/
    list-categories/
      query.ts
  auth/
    login/
    logout/

shared/
  db/
    schema/
  supabase/
  auth/
  ui/
  result.ts
```

## Architecture Rules

### 1. Keep App Routes Thin

Files inside `app/` should primarily compose feature components and define routing behavior. Business logic, validation, and database operations belong outside route files.

### 2. Organize by Use Case

Each feature slice owns the code specific to its use case. For example, `create-expense/` owns expense creation validation, its server action, its database query, and its form.

### 3. Avoid Imports Between Feature Internals

One feature slice should not import implementation files from another slice. If functionality becomes genuinely cross-cutting, move it into `shared/`. Some duplication is acceptable when it avoids premature abstraction.

### 4. Keep Shared Code Infrastructure-Focused

The `shared/` directory contains infrastructure such as database clients, Drizzle table definitions, Supabase clients, authentication helpers, shared result types, and reusable UI components.

Business rules and use-case-specific validation remain within their respective feature slices.

### 5. Keep Database Schema Centralized

Drizzle table definitions stay together in `shared/db/tables/`, with migrations and database configuration maintained centrally.
- `*.table.ts` files define Drizzle database tables.
- `schema.ts` files are used for input validation.
### 6. Prefer Server Components

Use Server Components for data fetching and rendering where practical. Client Components should be introduced when browser interaction or client-side state requires them.

Expense creation and deletion should revalidate `/dashboard` after successful mutations rather than relying on a shared client component to maintain expense state.

### 7. Use Consistent Server Action Results

Server actions should validate their inputs, verify the current user, and return a consistent `ActionResult<T>` result. Validation schemas belong in each use-case slice, not in `"use server"` action files.

### 8. Enforce Boundaries with Tooling

ESLint should prevent imports between feature slices. Lefthook should run the required lint, typecheck, and build checks before pushing changes.

## Making Changes

When adding a new use case:

1. Create a dedicated folder under the relevant feature.
2. Add its schema, action, query, and UI components as needed.
3. Reuse shared infrastructure where appropriate.
4. Keep route files focused on composition.
5. Run lint, typecheck, and build checks before pushing.