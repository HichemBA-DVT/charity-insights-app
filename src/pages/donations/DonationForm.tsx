
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createDonation, getDonations, updateDonation } from "@/services/donationService";
import { getProjects } from "@/services/projectService";
import { Donation, Project } from "@/types";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  donorName: z.string().min(2, "Donor name must be at least 2 characters"),
  paymentMethod: z.string().min(1, "Please select a payment method"),
  date: z.string(),
  projectId: z.coerce.number(),
});

type FormValues = z.infer<typeof formSchema>;

const PaymentMethods = [
  "Credit Card",
  "Bank Transfer",
  "Check",
  "Cash",
  "PayPal",
  "Other"
];

const DonationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      donorName: "",
      paymentMethod: "",
      date: new Date().toISOString().split("T")[0],
      projectId: 0,
    },
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast({
          title: "Error",
          description: "Failed to load projects",
          variant: "destructive",
        });
      }
    };

    fetchProjects();

    if (isEditing) {
      const fetchDonation = async () => {
        try {
          setLoading(true);
          const donations = await getDonations();
          const donation = donations.find(d => d.id === Number(id));
          
          if (donation) {
            form.reset({
              amount: donation.amount,
              donorName: donation.donorName,
              paymentMethod: donation.paymentMethod,
              date: donation.date,
              projectId: donation.projectId,
            });
          } else {
            toast({
              title: "Error",
              description: "Donation not found",
              variant: "destructive",
            });
            navigate("/");
          }
        } catch (error) {
          console.error("Error fetching donation:", error);
          toast({
            title: "Error",
            description: "Failed to load donation",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };

      fetchDonation();
    }
  }, [id, isEditing, form, navigate]);

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      if (isEditing) {
        await updateDonation({
          id: Number(id),
          ...values,
        } as Donation);
        toast({
          title: "Success",
          description: "Donation updated successfully",
        });
      } else {
        await createDonation(values);
        toast({
          title: "Success",
          description: "Donation added successfully",
        });
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving donation:", error);
      toast({
        title: "Error",
        description: "Failed to save donation",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Donation" : "Add New Donation"}</CardTitle>
          <CardDescription>
            {isEditing
              ? "Update the donation details below"
              : "Enter the donation details below"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="100.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="donorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Donor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PaymentMethods.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.id.toString()}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => navigate("/")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : isEditing ? "Update Donation" : "Add Donation"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationForm;
