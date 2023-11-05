import { Route, Routes } from "react-router-dom";
// import Navbar from "./components/nav-bar";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home";
import Navbar from "./components/nav-bar";
import Students from "./pages/Students";
import Roles from "./pages/Roles";
import { Toaster } from "react-hot-toast";
import Filieres from "./pages/Filieres";
import StudentsByFiliere from "./pages/StudentsByFiliere";
import RoleAssignment from "./pages/RoleAssignment";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/filieres" element={<Filieres />} />
        <Route path="/students-by-filiere" element={<StudentsByFiliere />} />
        <Route path="/role-assignment" element={<RoleAssignment />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
