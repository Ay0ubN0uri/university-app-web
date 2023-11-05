import {
  createFiliere,
  deleteFiliere,
  fetchAllFilieres,
  updateFiliere,
} from "@/lib/http";
import { type Filiere } from "@/lib/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
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
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formSchema = z.object({
  id: z.number(),
  code: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  name: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
});

const Filieres = () => {
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      code: "",
      name: "",
    },
  });

  const updateForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      code: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmitting(true);
    const filiere: Filiere = values;
    const data = await createFiliere(filiere);
    console.log(data);
    setIsSubmitting(false);
    if (data != null) {
      filieres.push(data);
      toast.success("Filiere created");
    } else {
      toast.error("Error creating filiere");
    }
  }

  const onDelete = async (filiere: Filiere) => {
    const data = await deleteFiliere(filiere);
    if (data) {
      toast.success("Filiere deleted");
      init();
    } else {
      toast.error("Error deleting filiere");
    }
  };

  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setOpen(false);
    const filiere: Filiere = values;
    const data = await updateFiliere(filiere);
    if (data != null) {
      toast.success("Filiere updated");
      init();
    } else {
      toast.error("Error deleting filiere");
    }
  };

  const init = async () => {
    setIsLoading(true);
    const data = await fetchAllFilieres();
    console.log(data);
    setIsLoading(false);
    setFilieres(data);
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
              <AnimatedText>Create Filiere</AnimatedText>
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
                      <FormLabel>Filiere id</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Filiere code</FormLabel>
                      <FormControl>
                        <Input placeholder="2ITE2" {...field} />
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
                      <FormLabel>Filiere name</FormLabel>
                      <FormControl>
                        <Input placeholder="2ITE2" {...field} />
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
                  {filieres.length == 0 ? "List is Empty" : "List of Filieres"}
                </AnimatedText>
              </h1>
              {filieres.length != 0 && (
                <Table className="w-[70%] m-auto">
                  <TableCaption>A list of your recent filieres.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Id</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filieres.map((filiere) => (
                      <TableRow key={filiere.id}>
                        <TableCell className="font-medium">
                          {filiere.id}
                        </TableCell>
                        <TableCell>{filiere.code}</TableCell>
                        <TableCell>{filiere.name}</TableCell>
                        <TableCell className="flex flex-row space-x-2 items-center justify-center">
                          <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                              <Button
                                onClick={() => {
                                  updateForm.setValue("id", filiere.id);
                                  updateForm.setValue(
                                    "code",
                                    filiere.code ?? ""
                                  );
                                  updateForm.setValue(
                                    "name",
                                    filiere.name ?? ""
                                  );
                                }}
                                className="bg-green-600 text-white hover:bg-green-500"
                              >
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Edit filiere</DialogTitle>
                                <DialogDescription>
                                  Change this filiere.
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
                                        <FormLabel>Filiere id</FormLabel>
                                        <FormControl>
                                          <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={updateForm.control}
                                    name="code"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Filiere code</FormLabel>
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
                                        <FormLabel>Filiere name</FormLabel>
                                        <FormControl>
                                          <Input {...field} />
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
                              onDelete(filiere);
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

export default Filieres;
