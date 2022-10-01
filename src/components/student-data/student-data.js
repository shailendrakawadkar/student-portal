import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import "./student-data.css";
import { Container } from "@mui/material";
import Header from "../header/header";
import axios from "axios";
import { API_URL } from "../../constants";
import { useParams } from "react-router";

const StudentData = () => {
  const mt20 = {
    marginTop: 20,
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roll, setRoll] = useState(0);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [rollError, setRollError] = useState(false);

  let params = useParams();
  let [studentId, setStudentId] = useState(params.studentId);
  console.log(studentId);
  useEffect(() => {
    if(studentId)
    {
       axios
      .get(API_URL + `student/${studentId}`)
      .then((response) => {
        let student = response.data.student;
        setName(student.name);
        setEmail(student.email);
        setRoll(student.roll);
      })
      .catch((error) => console.log(error));
    }
  }, [studentId]);

  let createStudent = (e) => {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "" || roll.trim() === "") {
      if (name.trim() === "") setNameError(true);
      if (email.trim() === "") setNameError(true);
      if (roll.trim() === "") setRollError(true);
    } else {
      axios
        .post(API_URL + "student", { name, email, roll })
        .then((response) => {
          console.log(response);
          alert("Student Created successfuly");
        })
        .catch((error) => console.log(error));
    }
  };

  let editStudent = (e) => {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "" || roll.trim() === "") {
      if (name.trim() === "") setNameError(true);
      if (email.trim() === "") setNameError(true);
      if (roll.trim() === "") setRollError(true);
    } else {
      axios
        .put(API_URL + `student/${studentId}`, { name, email, roll })
        .then((response) => {
          console.log(response);
          alert("Data updated successfuly");
        })
        .catch((error) => console.log(error));
    }
  }
  return (
    <Container>
      <Header />
      <form noValidate autoComplete="off" onSubmit={!studentId ? createStudent : editStudent}>
        <TextField
          style={mt20}
          label="Name"
          value={name}
          onChange={(e) => {
            e.target.value.trim() === ""
              ? setNameError(true)
              : setNameError(false);
            setName(e.target.value);
          }}
          required
          variant="outlined"
          error={nameError}
          fullWidth
        />
        {nameError && <span>Please enter valid data.</span>}
        <TextField
          style={mt20}
          onChange={(e) => {
            e.target.value.trim() === ""
              ? setEmailError(true)
              : setEmailError(false);
            setEmail(e.target.value);
          }}
          label="Email Address"
          required
          value={email}
          variant="outlined"
          error={emailError}
          fullWidth
        />
        {emailError && <span>Please enter valid data.</span>}
        <TextField
          style={mt20}
          value={roll}
          onChange={(e) => {
            e.target.value.trim() === ""
              ? setRollError(true)
              : setRollError(false);
            setRoll(e.target.value);
          }}
          label="Roll Number"
          required
          variant="outlined"
          error={rollError}
          fullWidth
        />
        {rollError && <span>Please enter valid data.</span>}
        <Button
          type="submit"
          variant="contained"
          style={{
            marginTop: 20,
            float: "right",
          }}
        >
          {!studentId ? 'Create' : 'Update'}
        </Button>
      </form>
    </Container>
  );
};

export default StudentData;
