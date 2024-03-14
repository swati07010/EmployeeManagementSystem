import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import AddEmployee from "./Components/Pages/AddEmployee/AddEmployee";
import Signup from "./Components/Pages/Signup/Signup";
import Login from "./Components/Pages/Login/Login";
import EmployeeList from "./Components/Pages/EmployeeList/EmployeeList";
import Home from "./Components/Pages/Home/Home";
import EmployeeUpdate from "./Components/Pages/EmployeeUpdate/EmployeeUpdate";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/employeeList" element={<EmployeeList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/updateEmployee/:id" element={<EmployeeUpdate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
