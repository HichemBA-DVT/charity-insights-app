
export interface Donation {
  id: number;
  amount: number;
  donorName: string;
  paymentMethod: string;
  date: string;
  projectId: number;
}

export interface Expense {
  id: number;
  amount: number;
  description: string;
  date: string;
  projectId: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  targetAmount: number;
  targetDate: string;
  donations?: Donation[];
  expenses?: Expense[];
}

export interface DashboardStats {
  totalDonations: number;
  totalExpenses: number;
  activeProjects: number;
  completedProjects: number;
  donationsByProject: { projectName: string; amount: number }[];
  expensesByProject: { projectName: string; amount: number }[];
}
