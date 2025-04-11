
import { Donation, Expense, Project } from "@/types";

export const mockProjects: Project[] = [
  {
    id: 1,
    name: "School Supplies for Children",
    description: "Providing school supplies for underprivileged children",
    targetAmount: 5000,
    targetDate: "2023-12-31"
  },
  {
    id: 2,
    name: "Food Bank Support",
    description: "Supporting local food banks with resources",
    targetAmount: 10000,
    targetDate: "2023-11-30"
  },
  {
    id: 3,
    name: "Medical Aid Program",
    description: "Providing medical aid to communities in need",
    targetAmount: 15000,
    targetDate: "2024-03-31"
  }
];

export const mockDonations: Donation[] = [
  {
    id: 1,
    amount: 100,
    donorName: "John Doe",
    paymentMethod: "Credit Card",
    date: "2023-09-15",
    projectId: 1
  },
  {
    id: 2,
    amount: 250,
    donorName: "Jane Smith",
    paymentMethod: "Bank Transfer",
    date: "2023-09-20",
    projectId: 2
  },
  {
    id: 3,
    amount: 500,
    donorName: "Michael Johnson",
    paymentMethod: "PayPal",
    date: "2023-09-25",
    projectId: 1
  },
  {
    id: 4,
    amount: 1000,
    donorName: "Sarah Williams",
    paymentMethod: "Check",
    date: "2023-09-28",
    projectId: 3
  }
];

export const mockExpenses: Expense[] = [
  {
    id: 1,
    amount: 300,
    description: "Purchase of school notebooks",
    date: "2023-09-18",
    projectId: 1
  },
  {
    id: 2,
    amount: 450,
    description: "Food purchase for food bank",
    date: "2023-09-22",
    projectId: 2
  },
  {
    id: 3,
    amount: 200,
    description: "Office supplies for volunteer coordination",
    date: "2023-09-26",
    projectId: 3
  }
];
