
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import DonationsList from "@/components/donations/DonationsList";
import ProjectsList from "@/components/projects/ProjectsList";
import ExpensesList from "@/components/expenses/ExpensesList";
import Dashboard from "@/components/dashboard/Dashboard";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Association Donation Management</h1>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/donations/new")}>New Donation</Button>
          <Button onClick={() => navigate("/expenses/new")} variant="outline">New Expense</Button>
          <Button onClick={() => navigate("/projects/new")} variant="outline">New Project</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                Overview of donations, expenses, and projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dashboard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations">
          <Card>
            <CardHeader>
              <CardTitle>Donations</CardTitle>
              <CardDescription>
                Manage all donations received
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DonationsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Expenses</CardTitle>
              <CardDescription>
                Track all expenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExpensesList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                Manage charitable projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectsList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
