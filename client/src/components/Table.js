import React, { useState, useEffect } from "react";
import CollegeInstance from "../components/college";

export const Table = () => {
  const [students, setStudents] = useState([]);
  const [studentsCount, setStudentsCount] = useState(0);

  useEffect(async () => {
    const studentCount = await CollegeInstance.methods.studentCount().call();
    setStudentsCount(studentCount);
    // Load students
    for (var i = 1; i <= studentsCount; i++) {
      const student = await CollegeInstance.methods.students(i).call();
      setStudents(student);
      console.log(students);
    }
  }, []);

  return (
    <div>
      <h2>Student Details</h2>
      <br />
      <div class="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sno.</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Class</th>
              <th scope="col">RollNo</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{s.id.toString()}</th>
                  <td>
                    <img src={s.imageHash} className="img-thumbnail" />
                  </td>
                  <td>{s.nameHash}</td>
                  <td>{s.classHash}</td>
                  <td>{s.rollnoHash}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
