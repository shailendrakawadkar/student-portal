import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import StudentList from './components/student-list/student-list';
import StudentData from './components/student-data/student-data';

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Navigate replace to="/students" />} />
        <Route path='/students' element={<StudentList/>}/>
        <Route path='/student/edit/:studentId' element={<StudentData/>}/>
        <Route path='/student/add' element={<StudentData/>}/>
      </Routes>
    </Router>
  </>
  );
}

export default App;
