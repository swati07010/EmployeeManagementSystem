import React, { useEffect, useState } from "react";
import "./EmployeeList.css";
import { Link } from "react-router-dom";
const EmployeeList = () => {
  const [allemployee, setAllemployee] = useState([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const fetchinfo = async (res, resp) => {
    await fetch("http://localhost:4000/allEmployee")
      .then((resp) => resp.json())
      .then((data) => {
        setAllemployee(data);
      });
  };
  const remove_employee = async (id) => {
    await fetch("http://localhost:4000/removeemployee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const updatedEmployeeList = allemployee.filter((emp) => emp.id !== id);
    setAllemployee(updatedEmployeeList);
    await fetchinfo();
  };

  useEffect(() => {
    fetchinfo();
  }, []);

  const searchEmployees = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:4000/searchEmployee?query=${query}`
      );
      const data = await response.json();
      if (data.success) {
        setAllemployee(data.employees);
      } else {
        console.error("Error searching employees:", data.message);
      }
    } catch (error) {
      console.error("Error searching employees:", error);
    }
  };

  return (
    <div className="employeelist">
      <h1>All Employee List here</h1>
      <div className="employeelist-search">
        <input
          type="text"
          onChange={(e) => searchEmployees(e.target.value)}
          placeholder="Search employees..."
        />
      </div>
      <div className="employeelist-tittle row">
        <p className="col-1">Id</p>
        <p className="col-1">image</p>
        <p className="col-1">Name</p>
        <p className="col-2">Email</p>
        <p className="col-1">Mobile No</p>
        <p className="col-1">Designation</p>
        <p className="col-1">Gender</p>
        <p className="col-1">Course</p>
        <p className="col-1">Date</p>
        <p className="col-1">Dlete</p>
        <p className="col-1">Update</p>
      </div>
      <hr />
      <div className="employeelist-body">
        <div className="">
          {allemployee.map((employee, i) => {
            const dateObject = new Date(employee.date);
            const day = dateObject.getDate();
            const monthIndex = dateObject.getMonth();
            const month = months[monthIndex];
            const year = dateObject.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;
            return (
              <div key={i} className="text-decoration row ">
                <p className="col-1">{employee.id}</p>
                <p className="col-1">
                  <img src={employee.image} alt="" />
                </p>
                <p className="col-1">{employee.name}</p>
                <p className="col-2">{employee.email}</p>
                <p className="col-1">{employee.mobno}</p>
                <p className="col-1">{employee.designation}</p>
                <p className="col-1">{employee.gender}</p>
                <p className="col-1">{employee.course}</p>
                <p className="col-1">{formattedDate}</p>
                <button
                  onClick={() => {
                    remove_employee(employee.id);
                  }}
                  className="col-1"
                >
                  Delete
                </button>
                <button className="col-1">
                  <Link to={`/updateEmployee/${employee.id}`}>Update</Link>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
