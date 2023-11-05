import axios from "axios";
import { Filiere, Student, type Role } from "./models";

// ############################ ROLES CALLS #####################################
export const fetchAllRoles = async () => {
  try {
    const resp = await axios({
      method: "get",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/roles`, //`${import.meta.env.VITE_SOME_KEY}/api/v1/roles`,
    });
    return resp.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createRole = async (role: Role) => {
  try {
    const resp = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/roles`,
      headers: {
        "Content-Type": "application/json",
      },
      data: role,
    });
    return resp.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const deleteRole = async (role: Role) => {
  try {
    await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/roles/${role.id}`,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateRole = async (role: Role) => {
  try {
    const resp = await axios({
      method: "PUT",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/roles/${role.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: role,
    });
    return resp.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// ############################ FILIERES CALLS #####################################

export const fetchAllFilieres = async () => {
  try {
    const resp = await axios({
      method: "get",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/filieres`,
    });
    return resp.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createFiliere = async (filiere: Filiere) => {
  try {
    const resp = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/filieres`,
      headers: {
        "Content-Type": "application/json",
      },
      data: filiere,
    });
    return resp.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const deleteFiliere = async (filiere: Filiere) => {
  try {
    await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/filieres/${filiere.id}`,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateFiliere = async (filiere: Filiere) => {
  try {
    const resp = await axios({
      method: "PUT",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/filieres/${filiere.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: filiere,
    });
    return resp.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// ############################ STUDENTS CALLS #####################################

export const fetchAllStudents = async () => {
  try {
    const resp = await axios({
      method: "get",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/students`,
    });
    return resp.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createStudent = async (student: Student) => {
  try {
    const resp = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/students`,
      headers: {
        "Content-Type": "application/json",
      },
      data: student,
    });
    return resp.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const deleteStudent = async (student: Student) => {
  try {
    await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/students/${student.id}`,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateStudent = async (student: Student) => {
  try {
    const resp = await axios({
      method: "PUT",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/students/${student.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: student,
    });
    return resp.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const assignRolesToStudent = async (student: Student, roles: Role[]) => {
  try {
    const resp = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/students/${
        student.id
      }/assign`,
      headers: {
        "Content-Type": "application/json",
      },
      data: roles,
    });
    return resp.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
