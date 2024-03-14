import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import upload_area from "../../Assets/upload_area.svg";

const EmployeeUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobno, setMobno] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState(null);

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCourse(value);
    } else {
      setCourse("");
    }
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const getUpdateDetails = async () => {
    let result = await fetch(`http://localhost:4000/updateEmployee/${id}`);
    result = await result.json();
    setName(result.name);
    setCourse(result.course);
    setDesignation(result.designation);
    setEmail(result.email);
    setGender(result.gender);
    setImage(result.image);
    setMobno(result.mobno);
  };
  const UpdateDetails = async () => {
    const isConfirmed = window.confirm("Do you want to Update these details?");
    if (isConfirmed) {
      let result = await fetch(`http://localhost:4000/updateEmployee/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          email,
          course,
          mobno,
          image,
          gender,
          designation,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      navigate("/employeeList");
      console.warn(result);
    } else {
      console.log("User canceled the operation");
    }
  };

  return (
    <div className="addemployee">
      <div className="addemployee-container">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type here FullName"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type here email"
        />
        <input
          type="number"
          value={id.mobno}
          onChange={(e) => setMobno(e.target.value)}
          placeholder="Type here Number"
        />
        <select
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        >
          <option value="">Designation</option>
          <option value="HR">HR</option>
          <option value="Manager">MANAGER</option>
          <option value="Sales">SALES</option>
        </select>

        <div className="addemployee-radio">
          <label>
            <input
              type="radio"
              value="M"
              checked={gender === "M"} // Check if gender is male
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="F"
              checked={gender === "F"} // Check if gender is female
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
        </div>
        <div className="addemployee-checkbox">
          MCA
          <input
            type="checkbox"
            checked={course === "MCA"}
            value={"MCA"}
            onChange={handleOptionChange}
          ></input>
          BCA
          <input
            type="checkbox"
            checked={course === "BCA"}
            value={"BCA"}
            onChange={handleOptionChange}
          />
          BSC
          <input
            type="checkbox"
            value={"BSC"}
            checked={course === "BSC"}
            onChange={handleOptionChange}
          />
        </div>
        <div>
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt=""
            />
          </label>
          <input
            onChange={imageHandler}
            type="file"
            name="image"
            id="file-input"
            hidden
          />
        </div>
        <button onClick={UpdateDetails}>Submit</button>
      </div>
    </div>
  );
};

export default EmployeeUpdate;
