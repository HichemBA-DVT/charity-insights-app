
import { Expense } from "@/types";
import { mockExpenses } from "@/data/mockData";

export const getExpenses = (): Promise<Expense[]> => {
  return Promise.resolve(mockExpenses);
};

export const getExpensesByProject = (projectId: number): Promise<Expense[]> => {
  return Promise.resolve(mockExpenses.filter(expense => expense.projectId === projectId));
};

export const createExpense = (expense: Omit<Expense, "id">): Promise<Expense> => {
  const newExpense = {
    ...expense,
    id: Math.max(...mockExpenses.map(e => e.id), 0) + 1
  };
  mockExpenses.push(newExpense);
  return Promise.resolve(newExpense);
};

export const updateExpense = (expense: Expense): Promise<Expense> => {
  const index = mockExpenses.findIndex(e => e.id === expense.id);
  if (index !== -1) {
    mockExpenses[index] = expense;
  }
  return Promise.resolve(expense);
};

export const deleteExpense = (id: number): Promise<boolean> => {
  const index = mockExpenses.findIndex(e => e.id === id);
  if (index !== -1) {
    mockExpenses.splice(index, 1);
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
};
