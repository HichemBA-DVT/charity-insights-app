
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createProject, getProjectById, updateProject } from "@/services/projectService";
import { Project } from "@/types";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  targetAmount: z.coerce.number().positive("Target amount must be greater than 0"),
  targetDate: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      targetAmount: 0,
      targetDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    if (isEditing) {
      const fetchProject = async () => {
        try {
          setLoading(true);
          const project = await getProjectById(Number(id));
          
          if (project) {
            form.reset({
              name: project.name,
              description: project.description,
              targetAmount: project.targetAmount,
              targetDate: project.targetDate,
            });
          } else {
            toast({
              title: "Error",
              description: "Project not found",
              variant: "destructive",
            });
            navigate("/");
          }
        } catch (error) {
          console.error("Error fetching project:", error);
          toast({
            title: "Error",
            description: "Failed to load project",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };

      fetchProject();
    }
  }, [id, isEditing, form, navigate]);

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      if (isEditing) {
        await updateProject({
          id: Number(id),
          ...values,
        } as Project);
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        await createProject(values);
        toast({
          title: "Success",
          description: "Project created successfully",
        });
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Error",
        description: "Failed to save project",
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
          <CardTitle>{isEditing ? "Edit Project" : "Create New Project"}</CardTitle>
          <CardDescription>
            {isEditing
              ? "Update the project details below"
              : "Enter the project details below"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="School Supplies for Children" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the project goal and impact..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Amount ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="5000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Completion Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => navigate("/")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectForm;
