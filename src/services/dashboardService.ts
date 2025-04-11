
import { DashboardStats } from "@/types";
import { mockDonations, mockExpenses, mockProjects } from "@/data/mockData";

export const getDashboardStats = (): Promise<DashboardStats> => {
  const totalDonations = mockDonations.reduce((sum, donation) => sum + donation.amount, 0);
  const totalExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const completedProjects = mockProjects.filter(project => {
    const projectDonations = mockDonations
      .filter(donation => donation.projectId === project.id)
      .reduce((sum, donation) => sum + donation.amount, 0);
    return projectDonations >= project.targetAmount;
  }).length;

  const donationsByProject = mockProjects.map(project => {
    const amount = mockDonations
      .filter(donation => donation.projectId === project.id)
      .reduce((sum, donation) => sum + donation.amount, 0);
    return { projectName: project.name, amount };
  });

  const expensesByProject = mockProjects.map(project => {
    const amount = mockExpenses
      .filter(expense => expense.projectId === project.id)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return { projectName: project.name, amount };
  });

  return Promise.resolve({
    totalDonations,
    totalExpenses,
    activeProjects: mockProjects.length - completedProjects,
    completedProjects,
    donationsByProject,
    expensesByProject
  });
};
