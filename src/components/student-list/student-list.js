import {
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import Header from "../header/header";
import { useNavigate } from "react-router-dom";
import { AddTask, Delete, Mode } from "@mui/icons-material";
const StudentList = () => {
  let columns = ["Name", "Email", "Roll Number", "Marksheets", "Action"];
  let [totalRowsCount, setTotalRowsCount] = useState(0);
  let [rowsCount, setRowsCount] = useState(10);
  let [currentPage, setCurrentPage] = useState(0);
  let studentMarksheets = {};

  let [rows, setRows] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_URL + `student?limit=${rowsCount}&currentPage=${currentPage}`)
      .then((response) => {
        setRows(response.data.students);
        setTotalRowsCount(response.data.totalRecords);
      })
      .catch((error) => console.log(error));
  }, [currentPage, rowsCount]);

  let onRowPerPageChange = (event) => {
    setRowsCount(parseInt(event.target.value));
  };

  let onPageChnge = (event, page) => {
    setCurrentPage(page);
  };

  const editStudent = (studentId) => {
    navigate(`/student/edit/${studentId}`);
  };

  const deleteStudent = (studentId) => {
    axios
      .delete(API_URL + `student/${studentId}`)
      .then((response) => {
        let index = rows.findIndex((x) => x._id === studentId);
        if (index !== -1) {
          rows.splice(index, 1);
        }
        setRows(rows);
        setTotalRowsCount(--totalRowsCount);
        alert("Student deleted successfuly");
      })
      .catch((error) => console.log(error));
  };

  const uploadMarksheets = (studentId) => {
    if (studentMarksheets[studentId] && studentMarksheets[studentId].length) {
      axios
        .put(API_URL + `student/${studentId}`, {
          marksheet: studentMarksheets[studentId],
        })
        .then((response) => {
          console.log(response);
          alert("Marksheets uploaded successfuly");
        })
        .catch((error) => console.log(error));
    }
  };

  const chooseMarksheets = (studentId) => {
    let input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = (_) => {
      let files = Array.from(input.files);

      files.forEach((file) => {
        var reader = new FileReader();
        reader.onloadend = function () {
            if(studentMarksheets[studentId]){
                studentMarksheets[studentId].push(reader.result);
            }
            else
            {
                studentMarksheets[studentId] = [reader.result];
            }
        };
        reader.readAsDataURL(file);
      });
    };
    input.click();
  };

  return (
    <Container>
      <Header />
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow hover>
              {columns.map((column) => (
                <TableCell variant="head" align="center" key={column}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="center" title={row.name}>{row.name}</TableCell>
                <TableCell align="center" title={row.email}>{row.email}</TableCell>
                <TableCell align="center" title={row.roll}>{row.roll}</TableCell>
                <TableCell align="center">
                  <IconButton
                    variant="contained"
                    title="Select marksheet"
                    onClick={() => {
                      chooseMarksheets(row._id);
                    }}
                  >
                    <AddTask/>
                  </IconButton>
                  <Button
                  title="Upload"
                    variant="contained"
                    onClick={() => {
                      uploadMarksheets(row._id);
                    }}
                  >
                    Upload
                  </Button>
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    title="Delete"
                    aria-label="delete"
                    onClick={() => {
                      deleteStudent(row._id);
                    }}
                  >
                    <Delete/>
                  </IconButton>
                  <IconButton
                    variant="contained"
                    title="Edit"
                    onClick={() => {
                      editStudent(row._id);
                    }}
                  >
                    <Mode/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={totalRowsCount}
                onPageChange={onPageChnge}
                page={currentPage}
                rowsPerPage={rowsCount}
                rowsPerPageOptions={[100, 50, 20, 10]}
                onRowsPerPageChange={onRowPerPageChange}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StudentList;
