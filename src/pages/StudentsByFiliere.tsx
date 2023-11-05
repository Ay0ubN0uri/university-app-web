import AnimatedText from "@/components/ui/AnimatedText";
import { Filiere, Student } from "@/lib/models";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAllFilieres, fetchAllStudents } from "@/lib/http";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const StudentsByFiliere = () => {
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [filtredStudents, setFiltredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const onFiliereChange = (value: string) => {
    if (value == "0") {
      setFiltredStudents(students);
    } else {
      setFiltredStudents(
        students.filter((student) => student.filiere.id === +value)
      );
    }
  };

  const init = async () => {
    setIsLoading(true);
    const students = await fetchAllStudents();
    const filieres = await fetchAllFilieres();
    console.log(students, filieres);
    setIsLoading(false);
    setStudents(students);
    setFiltredStudents(students);
    let allFilieres: Filiere[] = [];
    allFilieres.push({
      id: 0,
      code: "all Filieres",
      name: "All Filieres",
    });
    allFilieres = allFilieres.concat(filieres as Filiere[]);
    console.log("a00n", allFilieres);
    setFilieres(allFilieres);
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
              <AnimatedText>Select a filiere</AnimatedText>
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Select onValueChange={onFiliereChange} defaultValue="0">
              <SelectTrigger>
                <SelectValue placeholder="Select a filiere" />
              </SelectTrigger>
              <SelectContent>
                {filieres &&
                  filieres.map((filiere) => (
                    <SelectItem key={filiere.id} value={filiere.id.toString()}>
                      {filiere.code?.toUpperCase()}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
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
                  {filtredStudents.length == 0
                    ? "List is Empty"
                    : "List of Students"}
                </AnimatedText>
              </h1>

              {filtredStudents.length != 0 && (
                <Table className="w-[90%] m-auto mt-10">
                  <TableCaption>A list of your recent students.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Id</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Login</TableHead>
                      <TableHead>Filiere</TableHead>
                      <TableHead>Roles</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtredStudents.map((student) => (
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

export default StudentsByFiliere;
