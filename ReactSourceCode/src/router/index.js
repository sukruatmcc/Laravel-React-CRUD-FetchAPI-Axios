import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Students from "../pages/Student";
import StudentCreate from "../pages/StudentCreate";
import StudentEdit from "../pages/StudentEdit";

const MyRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/students" element={<Students />} />
        <Route path="/student-create" element={<StudentCreate />} />
        <Route path="/student-edit/:id" element={<StudentEdit />} />
      </Routes>
    </>
  );
};

export default MyRouter;
