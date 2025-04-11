
import { useEffect, useState } from "react";
import { getDonations } from "@/services/donationService";
import { getProjects } from "@/services/projectService";
import { Donation, Project } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DonationsList = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donationsData, projectsData] = await Promise.all([
          getDonations(),
          getProjects(),
        ]);
        setDonations(donationsData);
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching donations data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProjectName = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : "Unknown Project";
  };

  const filteredDonations = donations.filter(donation => 
    donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getProjectName(donation.projectId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center p-4">Loading donations data...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search by donor or project..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => navigate("/donations/new")}>Add Donation</Button>
      </div>

      {filteredDonations.length === 0 ? (
        <div className="text-center py-4">No donations found</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Donor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell>{new Date(donation.date).toLocaleDateString()}</TableCell>
                <TableCell>{donation.donorName}</TableCell>
                <TableCell>${donation.amount.toLocaleString()}</TableCell>
                <TableCell>{donation.paymentMethod}</TableCell>
                <TableCell>{getProjectName(donation.projectId)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => navigate(`/donations/edit/${donation.id}`)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default DonationsList;
