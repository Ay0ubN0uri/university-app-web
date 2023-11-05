import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AnimatedText from "@/components/ui/AnimatedText";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { createRole, deleteRole, fetchAllRoles, updateRole } from "@/lib/http";
import { Loader2 } from "lucide-react";
import { type Role } from "@/lib/models";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
  id: z.number(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      name: "",
    },
  });

  const updateForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const role: Role = values;
    const data = await createRole(role);
    console.log(data);
    setIsSubmitting(false);
    if (data != null) {
      roles.push(data);
      toast.success("Role created");
    } else {
      toast.error("Error creating role");
    }
  }

  const onDelete = async (role: Role) => {
    const data = await deleteRole(role);
    if (data) {
      toast.success("Role deleted");
      init();
    } else {
      toast.error("Error deleting role");
    }
  };

  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setOpen(false);
    const role: Role = values;
    const data = await updateRole(role);
    if (data != null) {
      toast.success("Role updated");
      init();
    } else {
      toast.error("Error deleting role");
    }
  };

  const init = async () => {
    setIsLoading(true);
    const data = await fetchAllRoles();
    console.log(data);
    setIsLoading(false);
    setRoles(data);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, transform: `translateY(50px)` }}
      whileInView={{ opacity: 1, transform: `translateY(0px)` }}
      exit={{ opacity: 0, transform: `translateY(50px)` }}
      className={`flex w-full flex-row items-center justify-around`}
    >
      <section className="flex flex-col w-full">
        <div className="flex mb-10 flex-col justify-center w-full">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-4 text-center text-3xl font-bold leading-9 tracking-tight ">
              <AnimatedText>Create Role</AnimatedText>
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex flex-col"
              >
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem hidden>
                      <FormLabel>Role id</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role name</FormLabel>
                      <FormControl>
                        <Input placeholder="Admin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="text-lg"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="w-[60%] m-auto mb-10">
          {isLoading ? (
            <div className="flex items-center justify-center h-[50vh]">
              <Loader2 className="h-20 w-20 animate-spin" />
            </div>
          ) : (
            <>
              <h1 className="text-5xl p-3 text-center">
                <AnimatedText>
                  {roles.length == 0 ? "List is Empty" : "List of Roles"}
                </AnimatedText>
              </h1>

              {roles.length != 0 && (
                <Table className="w-[50%] m-auto">
                  <TableCaption>A list of your recent roles.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Id</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">{role.id}</TableCell>
                        <TableCell>{role.name}</TableCell>
                        <TableCell className="flex flex-row space-x-2 items-center justify-center">
                          <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                              <Button
                                onClick={() => {
                                  updateForm.setValue("name", role.name);
                                  updateForm.setValue("id", role.id);
                                }}
                                className="bg-green-600 text-white hover:bg-green-500"
                              >
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Edit role</DialogTitle>
                                <DialogDescription>
                                  Change this role.
                                </DialogDescription>
                              </DialogHeader>
                              <Form {...updateForm}>
                                <form
                                  onSubmit={updateForm.handleSubmit(onUpdate)}
                                  className="space-y-8 flex flex-col"
                                >
                                  <FormField
                                    control={updateForm.control}
                                    name="id"
                                    render={({ field }) => (
                                      <FormItem hidden>
                                        <FormLabel>Role id</FormLabel>
                                        <FormControl>
                                          <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={updateForm.control}
                                    name="name"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Role name</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Admin"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <div className="flex justify-end">
                                    <Button className="" type="submit">
                                      Save changes
                                    </Button>
                                  </div>
                                </form>
                              </Form>
                            </DialogContent>
                          </Dialog>
                          <Button
                            onClick={() => {
                              onDelete(role);
                            }}
                            variant={"destructive"}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Roles;
