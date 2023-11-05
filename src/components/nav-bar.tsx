/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`flex w-full items-center  dark:bg-dark border-b-[1px] shadow-md`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-70 max-w-full px-4">
            <a href="/#" className="block w-full py-5">
              <h1 className="text-3xl font-bold text-purple-600">A00N</h1>
            </a>
          </div>
          <div className="flex w-full items-center justify-around px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-white"></span>
              </button>
              <nav
                // :className="!navbarOpen && 'hidden' "
                id="navbarCollapse"
                className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg  px-6 py-5 shadow dark:bg-dark-2 border-white border-[1px] md:border-[0px] lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                  !open && "hidden"
                } `}
              >
                <ul className="block lg:flex">
                  <ListItem NavLink="/">Home</ListItem>
                  <ListItem NavLink="/students">Students</ListItem>
                  <ListItem NavLink="/roles">Roles</ListItem>
                  <ListItem NavLink="/filieres">Filieres</ListItem>
                  <ListItem NavLink="/students-by-filiere">
                    Students by filiere
                  </ListItem>
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const ListItem = ({ children, NavLink }: { children: any; NavLink: any }) => {
  return (
    <>
      <li>
        <a
          href={NavLink}
          className="flex py-2 text-xl font-medium text-body-color hover:text-dark dark:text-dark-6 dark:hover:text-white lg:ml-12 lg:inline-flex"
        >
          {children}
        </a>
      </li>
    </>
  );
};

// import * as React from "react";
// import { Menu, Search } from "lucide-react";

// export default function Navbar() {
//   const [state, setState] = React.useState(false);

//   const menus = [
//     { title: "Home", path: "/your-path" },
//     { title: "Blog", path: "/your-path" },
//     { title: "About Us", path: "/your-path" },
//     { title: "Contact Us", path: "/your-path" },
//   ];

//   return (
//     <nav className="w-full border-b md:border-0">
//       <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
//         <div className="flex items-center justify-between py-3 md:py-5 md:block">
//           <a href="/">
//             <h1 className="text-3xl font-bold text-purple-600">Logo</h1>
//           </a>
//           <div className="md:hidden">
//             <button
//               className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
//               onClick={() => setState(!state)}
//             >
//               <Menu />
//             </button>
//           </div>
//         </div>
//         <div
//           className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
//             state ? "block" : "hidden"
//           }`}
//         >
//           <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
//             {menus.map((item, idx) => (
//               <li key={idx} className="text-gray-600 hover:text-indigo-600">
//                 <a href={item.path}>{item.title}</a>
//               </li>
//             ))}
//             <form className="flex items-center  space-x-2 border rounded-md p-2">
//               <Search className="h-5 w-5 flex-none text-gray-300" />
//               <input
//                 className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto"
//                 type="text"
//                 placeholder="Search"
//               />
//             </form>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }
