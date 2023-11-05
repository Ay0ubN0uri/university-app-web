// type Props = {}
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, transform: `translateY(50px)` }}
      whileInView={{ opacity: 1, transform: `translateY(0px)` }}
      exit={{ opacity: 0, transform: `translateY(50px)` }}
      className={`flex h-screen w-full flex-row  items-center justify-around border-b-[1px] border-gray-300  shadow-md`}
    >
      <section className="grid grid-cols-12 gap-5 container w-[80%] m-auto">
        <a
          href="/students"
          className=" border border-blue-500 overflow-hidden rounded-lg has-shadow py-4 flex flex-col gap-2 col-span-12 md:col-span-6 lg:col-span-3 hover:cursor-pointer transform transition-transform duration-300 has-shadow hover:scale-105"
        >
          <div className="flex justify-center flex-col w-full h-full items-center">
            <img
              width="80"
              height="80"
              src="/images/student.png"
              alt="student"
            />
            <h3 className="text-xl ms-2 font-semibold mt-2">Students</h3>
          </div>
        </a>
        <a
          href="/roles"
          className=" border border-blue-500 overflow-hidden rounded-lg has-shadow py-4 flex flex-col gap-2 col-span-12 md:col-span-6 lg:col-span-3 hover:cursor-pointer transform transition-transform duration-300 has-shadow hover:scale-105"
        >
          <div className="flex justify-center flex-col w-full h-full items-center">
            <img width="80" height="80" src="/images/role.png" alt="role" />
            <h3 className="text-xl ms-2 font-semibold">Roles</h3>
          </div>
        </a>
        <a
          href="/filieres"
          className=" border border-blue-500 overflow-hidden rounded-lg has-shadow py-4 flex flex-col gap-2 col-span-12 md:col-span-6 lg:col-span-3 hover:cursor-pointer transform transition-transform duration-300 has-shadow hover:scale-105"
        >
          <div className="flex justify-center flex-col w-full h-full items-center">
            <img
              width="80"
              height="80"
              src="/images/filiere.png"
              alt="filiere"
            />
            <h3 className="text-xl ms-2 font-semibold">Filieres</h3>
          </div>
        </a>
        <a
          href="/students-by-filiere"
          className=" border border-blue-500 overflow-hidden rounded-lg has-shadow py-4 flex flex-col gap-2 col-span-12 md:col-span-6 lg:col-span-3 hover:cursor-pointer transform transition-transform duration-300 has-shadow hover:scale-105"
        >
          <div className="flex justify-center flex-col w-full h-full items-center">
            <img
              width="80"
              height="80"
              src="/images/student-by-filiere.png"
              alt="student-by-filiere"
            />
            <h3 className="text-xl ms-2 font-semibold">Student by filiere</h3>
          </div>
        </a>
        <a
          href="/role-assignment"
          className=" border border-blue-500 overflow-hidden rounded-lg has-shadow py-4 flex flex-col gap-2 col-span-12 md:col-span-6 lg:col-span-3 hover:cursor-pointer transform transition-transform duration-300 has-shadow hover:scale-105"
        >
          <div className="flex justify-center flex-col w-full h-full items-center">
            <img
              width="80"
              height="80"
              src="/images/assignment.png"
              alt="assignment"
            />
            <h3 className="text-xl ms-2 font-semibold">Role Sssignment</h3>
          </div>
        </a>
      </section>
    </motion.div>
  );
};

export default Home;
