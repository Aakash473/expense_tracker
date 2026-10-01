
export type Expense = {
    id: string;
    category: string;
    description: string;
    amount: number;
    date: string;
};

export type ExpenseRow = {
    id: string;
    category: string;
    description: string | null;
    amount: string;
    createdAt: Date;
};
