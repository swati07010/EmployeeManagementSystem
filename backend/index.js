const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const regex = new RegExp("pattern", "i");

app.use(express.json());
app.use(cors());

app.use(cors({ origin: "http://localhost:3000" }));

//Database connection with mongodb
mongoose.connect(
  "mongodb+srv://employee:SwatiSingh@cluster0.nog2apv.mongodb.net/employee-ms"
);

app.get("/", async (req, resp) => {
  resp.send("Suver is runing good");
});

//Image Storage Engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Creating upload Endpoint  for images

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("employee"), (req, resp) => {
  resp.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//Schema for Creating Signup
const EmployeeSignup = mongoose.model("EmployeeSignup", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
//Create Login User
app.post("/login", async (req, resp) => {
  const { email, password } = req.body;
  const user = await EmployeeSignup.findOne({ email });
  if (!user) {
    return resp.status(401).json({ success: false, message: "Invalid email" });
  }
  const passwordMatch = await EmployeeSignup.findOne({ password });
  if (!passwordMatch) {
    return resp
      .status(401)
      .json({ success: false, message: "Invalid password" });
  }

  resp.json({ success: true, name: req.body.name });
});
app.post("/signup", async (req, resp) => {
  const existingUser = await EmployeeSignup.findOne({ email: req.body.email });
  if (existingUser) {
    return resp.send({ success: false, message: "Email already in use" });
  }
  const employeeSignup = new EmployeeSignup({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  await employeeSignup.save();
  delete employeeSignup.password;
  resp.json({
    success: true,
    name: req.body.name,
  });
  resp.send(resp.body);
});

//Schema for Creating Employee
const Employee = mongoose.model("Employee", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobno: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
app.post("/addemployee", async (req, resp) => {
  let employees = await Employee.find({});
  let id;
  if (employees.length > 0) {
    let last_id_array = employees.slice(-1);
    let last_employee = last_id_array[0];
    id = last_employee.id + 1;
  } else {
    id = 1;
  }
  const employee = new Employee({
    id: id,
    name: req.body.name,
    email: req.body.email,
    image: req.body.image,
    mobno: req.body.mobno,
    designation: req.body.designation,
    gender: req.body.gender,
    course: req.body.course,
  });
  console.log(employee);
  await employee.save();
  console.log("saved");
  resp.json({
    success: true,
    name: req.body.name,
  });
  resp.send(resp.body);
});

//Create Api for deleting Employee data
app.post("/removeemployee", async (req, resp) => {
  await Employee.findOneAndDelete({ id: req.body.id });
  console.log("remove");
  resp.json({
    success: true,
    name: req.body.name,
  });
});

//Creating Api for  geting all Employee Details

app.get("/allEmployee", async (req, resp) => {
  let employees = await Employee.find({});
  console.log("All product fetched");
  resp.send(employees);
});
//Create Api for Update  the employee field
app.put("/updateEmployee/:id", async (req, resp) => {
  const employeeId = req.params.id;

  try {
    const employee = await Employee.findOne({ id: employeeId });

    if (!employee) {
      return resp
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    employee.name = req.body.name || employee.name;
    employee.email = req.body.email || employee.email;
    employee.image = req.body.image || employee.image;
    employee.mobno = req.body.mobno || employee.mobno;
    employee.designation = req.body.designation || employee.designation;
    employee.gender = req.body.gender || employee.gender;
    employee.course = req.body.course || employee.course;
    await employee.save();
    return resp.json({
      success: true,
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    return resp
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

//Create Api for Search value

app.get("/searchEmployee", async (req, resp) => {
  const { query: searchString } = req.query;
  try {
    let query = {};

    // Add search criteria based on provided query string
    if (searchString) {
      const regex = new RegExp(searchString, "i"); // Case-insensitive regex pattern
      query.$or = [
        { name: { $regex: regex } }, // Search for partial matches in name
        { email: { $regex: regex } }, // Search for partial matches in email
        { designation: { $regex: regex } },
        { course: { $regex: regex } }, // Search for partial matches in designation
      ];
    }

    // Fetch employees that match the search criteria
    const employees = await Employee.find(query);

    return resp.json({ success: true, employees });
  } catch (error) {
    console.error("Error searching employees:", error);
    return resp
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

//ApI creation
app.listen(port, (error) => {
  if (!error) {
    console.log("Surver Runing on :" + port);
  } else {
    console.log("Error :" + error);
  }
});
