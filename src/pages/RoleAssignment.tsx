import AnimatedText from "@/components/ui/AnimatedText";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Role, Student } from "@/lib/models";
import {
  assignRolesToStudent,
  fetchAllRoles,
  fetchAllStudents,
} from "@/lib/http";
import { useTheme } from "@/components/theme-provider";
import ReactSelect, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const RoleAssignment = () => {
  const animatedComponents = makeAnimated();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(
    undefined
  );
  const [selectedRoles, setSelectedRoles] = useState<
    { value: string; label: string }[]
  >([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [roleOptions, setRoleOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const onStudentChange = (value: string) => {
    const student = students.find((student) => student.id === +value);
    let r: { value: string; label: string }[] = [];
    if (student) {
      setIsValid(true);
      r = student.roles.map((role) => {
        return {
          value: role.id.toString(),
          label: role.name.toUpperCase(),
        };
      });
    } else {
      r = [];
      setIsValid(false);
    }
    console.log(student, r);
    setSelectedStudent(student);
    setSelectedRoles(r);
  };

  const onRoleChange = (newValue: MultiValue<unknown>) => {
    console.log(newValue);
    setSelectedRoles(newValue as { value: string; label: string }[]);
  };

  const onAssign = async () => {
    setIsLoading(true);
    const newRoles: Role[] = selectedRoles.map((r) => {
      return {
        id: +r.value,
        name: r.label,
      };
    });
    console.log(selectedStudent, newRoles);
    const data = await assignRolesToStudent(selectedStudent!, newRoles);
    if (data != null) {
      toast.success("Roles assigned");
      init();
    } else {
      toast.error("Error assigning roles");
    }
    setIsLoading(false);
  };

  const init = async () => {
    const students = await fetchAllStudents();
    const fetchedRoles: Role[] = await fetchAllRoles();
    console.log(students, fetchedRoles, roles);
    setStudents(students);
    setRoles(fetchedRoles);
    setRoleOptions(
      fetchedRoles.map((role) => {
        return {
          value: role.id.toString(),
          label: role.name.toUpperCase(),
        };
      })
    );
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
      <section className="flex flex-col w-full h-screen justify-center">
        <div className="flex mb-10 flex-col justify-center w-full">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-4 text-center text-3xl font-bold leading-9 tracking-tight ">
              <AnimatedText>Assign roles to a student</AnimatedText>
            </h2>
          </div>
          <div className="mt-10 space-y-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-1">
              <Label className="text-md">Select a student</Label>
              <Select onValueChange={onStudentChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  {students &&
                    students.map((student) => (
                      <SelectItem
                        key={student.id}
                        value={student.id.toString()}
                      >
                        {`${student.firstName} ${student.lastName}`}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            {selectedStudent && (
              <div className="space-y-1">
                <Label className="text-md">Select roles</Label>
                <ReactSelect
                  isMulti
                  options={roleOptions}
                  onChange={onRoleChange}
                  value={selectedRoles}
                  components={animatedComponents}
                  styles={{
                    singleValue: (base) => ({ ...base, color: "green" }),
                    control: (base) => ({
                      ...base,
                      background: theme.theme == "dark" ? "#121212" : "white",
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
              </div>
            )}
            <div className="space-y-1 w-full">
              <Button
                onClick={onAssign}
                disabled={!isValid || isLoading}
                className="w-full"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Assign
              </Button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default RoleAssignment;
