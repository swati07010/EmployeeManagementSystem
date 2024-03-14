// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// const Navbar = () => {
//   return (
//     <div className="navbar">
//       <div className="navbar-link-left">
//         <Link className="navbar-link-left-addemployee" to="/addemployee">
//           AddEmployee
//         </Link>
//         <Link className="employeelist" to="/employeeList">
//           EmployeeList
//         </Link>
//       </div>
//       <div className="navbar-link-right">
//         <Link className="navbar-link-right-signup" to="/signup">
//           Signup
//         </Link>
//         <Link className="navbar-link-right-login" to="/login">
//           Login
//         </Link>
//         <Link to="updateEmployee/:id"></Link>
//       </div>
//     </div>
//   );
// };
// export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    setIsLoggedIn(false); // Update login status
  };

  return (
    <div className="navbar">
      <div className="navbar-link-left">
        {isLoggedIn && (
          <>
            <Link className="navbar-link-left-addemployee" to="/addemployee">
              AddEmployee
            </Link>
            <Link className="employeelist" to="/employeeList">
              EmployeeList
            </Link>
          </>
        )}
      </div>
      <div className="navbar-link-right">
        {isLoggedIn ? (
          // If logged in, show logout button
          <button onClick={handleLogout} className="navbar-link-right-logout">
            Logout
          </button>
        ) : (
          // If not logged in, show signup and login links
          <>
            <Link className="navbar-link-right-signup" to="/signup">
              Signup
            </Link>
            <Link className="navbar-link-right-login" to="/login">
              Login
            </Link>
          </>
        )}
        <Link to="updateEmployee/:id"></Link>
      </div>
    </div>
  );
};

export default Navbar;
