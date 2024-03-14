import React, { useState } from "react";
import upload_area from "../../Assets/upload_area.svg";
import "./AddEmplyee.css";
const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobno, setMobno] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const handleOptionChange = (e) => {
    // setCourse(e.target.value);
    const { value, checked } = e.target;
    if (checked) {
      setCourse(value);
    } else {
      setCourse("");
    }
  };
  const [course, setCourse] = useState("");
  const [image, setImage] = useState(false);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const AddEmployee = async () => {
    const employeeDetails = {
      name,
      email,
      mobno,
      designation,
      gender,
      course,
      image,
    };
    let responseData;
    let employee = employeeDetails;

    let formData = new FormData();
    formData.append("employee", image);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });
    console.log(employee);

    if (responseData.success) {
      employee.image = responseData.image_url;

      await fetch("http://localhost:4000/addemployee", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Network response was not ok");
          }
          return resp.json();
        })
        .then((data) => {
          data.success ? alert("Employee Added") : alert("Failed");
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          alert("Failed to add employee");
        });
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
          value={mobno}
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
        <button
          onClick={() => {
            AddEmployee();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
