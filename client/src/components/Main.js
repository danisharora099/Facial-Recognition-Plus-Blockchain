import React, { useRef } from 'react';
import S3 from "../s3/s3";

const Main = (props) => {

  const studentImage = useRef();
  const studentClass = useRef()
  const studentName = useRef()
  const studentRollno = useRef();

  return (
  <div>
    <div className>  
      <h2>Add Student</h2>
      <div class="jumbotron">
         <form onSubmit={async (event) => {     
          event.preventDefault()
          const s3 = new S3(); 
          const name = studentName.current.value
          const image = studentImage.current.files[0];
          const imageName = studentImage.current.files[0].name
          const s3Response = await s3.uploadFile(image, imageName);
          const imgUrl = s3Response.location.toString();

          const rollno = studentRollno.current.value
          const _class = studentClass.current.value
          console.log({name, imgUrl, _class, rollno})
          props.addStudent(name, imgUrl, _class, rollno)
        }}>
          <div className="form-group mr-sm-2">
            <label>Student Name</label>
            <input
              placeholder="Enter Student Full Name"
              type="text"
              ref={studentName}
              className="form-control"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <label>Student CLass & Sec</label>
            <input
              placeholder="Enter Student Class & Sec"
              type="text"
              ref={studentClass}
              className="form-control"
              required />
              </div>
              <div className="form-group mr-sm-2">
            <label>Student RollNo.</label>
            <input
              placeholder="Enter Student Rollno."
              type="text"
              ref={studentRollno}
              className="form-control"
              required />
              </div>
              <div className="form-group mr-sm-2">
             <label>Student Image</label>
              <input
              className="form-control"
              placeholder="Enter student Image URL"
              type="file"
              ref={studentImage}
              required />
          </div>
          <button type="submit" className="btn btn-block btn-success">Add Student</button>
        </form>
      </div>
      </div>
        <hr/>
        <h2>Student Details</h2>
        <br/>
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
            { props.students.map((student, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{student.id.toString()}</th>
                  <td>
                    <img
                      src={student.imageHash}
                      className="img-thumbnail"
                    />  
                  </td>
                  <td>{student.nameHash}</td>
                  <td>{student.classHash}</td>
                  <td>{student.rollnoHash}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
       </div>
      </div>
    );
  }

export default Main;
