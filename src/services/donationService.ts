
import { Donation } from "@/types";
import { mockDonations } from "@/data/mockData";

export const getDonations = (): Promise<Donation[]> => {
  return Promise.resolve(mockDonations);
};

export const getDonationsByProject = (projectId: number): Promise<Donation[]> => {
  return Promise.resolve(mockDonations.filter(donation => donation.projectId === projectId));
};

export const createDonation = (donation: Omit<Donation, "id">): Promise<Donation> => {
  const newDonation = {
    ...donation,
    id: Math.max(...mockDonations.map(d => d.id), 0) + 1
  };
  mockDonations.push(newDonation);
  return Promise.resolve(newDonation);
};

export const updateDonation = (donation: Donation): Promise<Donation> => {
  const index = mockDonations.findIndex(d => d.id === donation.id);
  if (index !== -1) {
    mockDonations[index] = donation;
  }
  return Promise.resolve(donation);
};

export const deleteDonation = (id: number): Promise<boolean> => {
  const index = mockDonations.findIndex(d => d.id === id);
  if (index !== -1) {
    mockDonations.splice(index, 1);
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
};
