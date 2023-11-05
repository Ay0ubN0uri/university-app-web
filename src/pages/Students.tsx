import * as z from "zod";
import validator from "validator";
import { Filiere, Role, Student } from "@/lib/models";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createStudent,
  deleteStudent,
  fetchAllFilieres,
  fetchAllRoles,
  fetchAllStudents,
  updateStudent,
} from "@/lib/http";
import { motion } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import { useTheme } from "@/components/theme-provider";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  id: z.number(),
  login: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  password: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  firstName: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  lastName: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  phoneNumber: z.string().refine(validator.isMobilePhone),
  filiere: z.string(),
  roles: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
});

const Students = () => {
  const animatedComponents = makeAnimated();
  const theme = useTheme();
  const [students, setStudents] = useState<Student[]>([]);
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [roleOptions, setRoleOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      firstName: "",
      lastName: "",
      password: "",
      login: "",
      phoneNumber: "",
    },
  });

  const updateForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      firstName: "",
      lastName: "",
      password: "",
      login: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmitting(true);
    const student: Student = {
      id: values.id,
      firstName: values.firstName,
      lastName: values.lastName,
      login: values.login,
      password: values.password,
      phoneNumber: values.phoneNumber,
      filiere: {
        id: +values.filiere,
      },
      roles: values.roles.map((role) => {
        return {
          id: +role.value,
          name: role.label.toLowerCase(),
        };
      }),
    };
    console.log("student : ", student);
    const data = await createStudent(student);
    console.log(data);
    setIsSubmitting(false);
    if (data != null) {
      // students.push(data);
      toast.success("Student created");
      init();
    } else {
      toast.error("Error creating student");
    }
  }

  const onDelete = async (student: Student) => {
    const data = await deleteStudent(student);
    if (data) {
      toast.success("Student deleted");
      init();
    } else {
      toast.error("Error deleting student");
    }
  };

  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const student: Student = {
      id: values.id,
      firstName: values.firstName,
      lastName: values.lastName,
      login: values.login,
      password: values.password,
      phoneNumber: values.phoneNumber,
      filiere: {
        id: +values.filiere,
      },
      roles: values.roles.map((role) => {
        return {
          id: +role.value,
          name: role.label.toLowerCase(),
        };
      }),
    };
    console.log("student : ", student);
    setOpen(false);
    const data = await updateStudent(student);
    if (data != null) {
      toast.success("Student updated");
      init();
    } else {
      toast.error("Error deleting student");
    }
  };

  const init = async () => {
    setIsLoading(true);
    const students = await fetchAllStudents();
    const filieres = await fetchAllFilieres();
    const fetchedRoles: Role[] = await fetchAllRoles();
    console.log(students, filieres, fetchedRoles);
    setIsLoading(false);
    setStudents(students);
    setFilieres(filieres);
    setRoles(fetchedRoles);
    console.log(roles);
    setRoleOptions(
      fetchedRoles.map((role) => {
        return {
          value: role.id.toString(),
          label: role.name.toUpperCase(),
        };
      })
    );
    console.log(roleOptions);
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
              <AnimatedText>Create Student</AnimatedText>
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
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
                      <FormLabel>Student id</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row space-x-2 items-center justify-around ">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Ayoub" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Nouri" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row space-x-2 justify-around">
                  <FormField
                    control={form.control}
                    name="login"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Login</FormLabel>
                        <FormControl>
                          <Input placeholder="ay0ub" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="10101010110" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="filiere"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Filiere</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a filiere" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filieres &&
                            filieres.map((filiere) => (
                              <SelectItem
                                key={filiere.id}
                                value={filiere.id.toString()}
                              >
                                {filiere.code?.toUpperCase()}
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
                  name="roles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roles</FormLabel>
                      <ReactSelect
                        isMulti
                        onChange={field.onChange}
                        options={roleOptions}
                        components={animatedComponents}
                        styles={{
                          singleValue: (base) => ({ ...base, color: "green" }),
                          control: (base) => ({
                            ...base,
                            background:
                              theme.theme == "dark" ? "#121212" : "white",
                          }),
                          multiValue: (styles) => {
                            return {
                              ...styles,

                              backgroundColor:
                                theme.theme == "dark" ? "#ccc" : "#ccc",
                            };
                          },
                          option: (styles) => {
                            return {
                              ...styles,
                              color: "black",

                              ":active": {
                                ...styles[":active"],
                                backgroundColor: "white",
                              },
                            };
                          },
                          multiValueLabel: (styles) => ({
                            ...styles,
                            color: "black",
                          }),
                          multiValueRemove: (styles) => ({
                            ...styles,
                            color: "#12121",
                            ":hover": {
                              backgroundColor: "white", // on hover x bg color
                              color: "black", // on hover x icon color
                            },
                          }),
                        }}
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            neutral30: "hotpink", //control/borderColor(focused)
                            neutral50: "#ccc",
                            neutral80: "white",
                            primary25: "#ccc",
                            primary: "black",
                            primary50: "white",
                          },
                        })}
                      />
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
        <div className="w-full m-auto mb-10">
          {isLoading ? (
            <div className="flex items-center justify-center h-[50vh]">
              <Loader2 className="h-20 w-20 animate-spin" />
            </div>
          ) : (
            <>
              <h1 className="text-5xl p-3 text-center">
                <AnimatedText>
                  {students.length == 0 ? "List is Empty" : "List of Students"}
                </AnimatedText>
              </h1>
              {students.length != 0 && (
                <Table className="w-full m-auto">
                  <TableCaption>A list of your recent students.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Id</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Login</TableHead>
                      <TableHead>Filiere</TableHead>
                      <TableHead>Roles</TableHead>
                      <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          {student.id}
                        </TableCell>
                        <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                        <TableCell>{student.phoneNumber}</TableCell>
                        <TableCell>{student.login}</TableCell>
                        <TableCell>
                          {student.filiere.code?.toUpperCase()}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-row space-x-1">
                            {student.roles.map((role) => (
                              <Badge>{role.name.toUpperCase()}</Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="flex flex-row space-x-2 items-center justify-center">
                          <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                              <Button
                                onClick={() => {
                                  updateForm.setValue("id", student.id);
                                  updateForm.setValue(
                                    "firstName",
                                    student.firstName
                                  );
                                  updateForm.setValue(
                                    "lastName",
                                    student.lastName
                                  );
                                  updateForm.setValue(
                                    "phoneNumber",
                                    student.phoneNumber
                                  );
                                  updateForm.setValue("login", student.login);
                                  updateForm.setValue(
                                    "password",
                                    student.password
                                  );
                                  updateForm.setValue(
                                    "filiere",
                                    student.filiere.id.toString()
                                  );
                                  updateForm.setValue(
                                    "roles",
                                    student.roles.map((role) => {
                                      return {
                                        value: role.id.toString(),
                                        label: role.name.toUpperCase(),
                                      };
                                    })
                                  );
                                }}
                                className="bg-green-600 text-white hover:bg-green-500"
                              >
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[60%]">
                              <DialogHeader>
                                <DialogTitle>Edit student</DialogTitle>
                                <DialogDescription>
                                  Change this student.
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
                                        <FormLabel>Student id</FormLabel>
                                        <FormControl>
                                          <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <div className="flex flex-row space-x-2 items-center justify-between ">
                                    <FormField
                                      control={updateForm.control}
                                      name="firstName"
                                      render={({ field }) => (
                                        <FormItem className="w-full">
                                          <FormLabel>First Name</FormLabel>
                                          <FormControl>
                                            <Input
                                              placeholder="Ayoub"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={updateForm.control}
                                      name="lastName"
                                      render={({ field }) => (
                                        <FormItem className="w-full">
                                          <FormLabel>Last Name</FormLabel>
                                          <FormControl>
                                            <Input
                                              placeholder="Nouri"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                  <div className="flex flex-row space-x-2 justify-between">
                                    <FormField
                                      control={updateForm.control}
                                      name="login"
                                      render={({ field }) => (
                                        <FormItem className="w-full">
                                          <FormLabel>Login</FormLabel>
                                          <FormControl>
                                            <Input
                                              placeholder="ay0ub"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={updateForm.control}
                                      name="password"
                                      render={({ field }) => (
                                        <FormItem className="w-full">
                                          <FormLabel>Password</FormLabel>
                                          <FormControl>
                                            <Input
                                              type="password"
                                              placeholder="********"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                  <FormField
                                    control={updateForm.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="10101010110"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={updateForm.control}
                                    name="filiere"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Filiere</FormLabel>
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select a filiere" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {filieres &&
                                              filieres.map((filiere) => (
                                                <SelectItem
                                                  key={filiere.id}
                                                  value={filiere.id.toString()}
                                                >
                                                  {filiere.code?.toUpperCase()}
                                                </SelectItem>
                                              ))}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={updateForm.control}
                                    name="roles"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Roles</FormLabel>
                                        <ReactSelect
                                          isMulti
                                          defaultValue={field.value}
                                          onChange={field.onChange}
                                          options={roleOptions}
                                          components={animatedComponents}
                                          styles={{
                                            singleValue: (base) => ({
                                              ...base,
                                              color: "green",
                                            }),
                                            control: (base) => ({
                                              ...base,
                                              background:
                                                theme.theme == "dark"
                                                  ? "#121212"
                                                  : "white",
                                            }),
                                            multiValue: (styles) => {
                                              return {
                                                ...styles,

                                                backgroundColor:
                                                  theme.theme == "dark"
                                                    ? "#ccc"
                                                    : "#ccc",
                                              };
                                            },
                                            option: (styles) => {
                                              return {
                                                ...styles,
                                                color: "black",

                                                ":active": {
                                                  ...styles[":active"],
                                                  backgroundColor: "white",
                                                },
                                              };
                                            },
                                            multiValueLabel: (styles) => ({
                                              ...styles,
                                              color: "black",
                                            }),
                                            multiValueRemove: (styles) => ({
                                              ...styles,
                                              color: "#12121",
                                              ":hover": {
                                                backgroundColor: "white", // on hover x bg color
                                                color: "black", // on hover x icon color
                                              },
                                            }),
                                          }}
                                          theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                              ...theme.colors,
                                              neutral30: "hotpink", //control/borderColor(focused)
                                              neutral50: "#ccc",
                                              neutral80: "white",
                                              primary25: "#ccc",
                                              primary: "black",
                                              primary50: "white",
                                            },
                                          })}
                                        />
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  {/* ====================================== */}
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
                              onDelete(student);
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

export default Students;
