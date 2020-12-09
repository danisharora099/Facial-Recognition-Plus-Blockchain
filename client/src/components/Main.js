import React, { Component, useRef } from "react";
const imageToBase64 = require("image-to-base64");

class Main extends Component {
  constructor(props) {
    super(props);
    this.studentImage = useRef();
  }
  render() {
    return (
      <div>
        <div className="">
          <h2>Add Student</h2>
          <div class="jumbotron">
            <form
              onSubmit={async event => {
                event.preventDefault();
                const name = this.studentName.value;
                const imageLocal = this.studentImage.current.files[0];
                const imageBase64 = await imageToBase64(imageLocal);
                console.log(imageBase64);
                const rollno = this.studentRollno.value;
                const _class = this.studentClass.value;
                // this.props.addStudent(name, image, _class, rollno);
              }}
            >
              <div className="form-group mr-sm-2">
                <label>Student Name</label>
                <input
                  id="studentName"
                  placeholder="Enter Student Full Name"
                  type="text"
                  ref={input => {
                    this.studentName = input;
                  }}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group mr-sm-2">
                <label>Student CLass & Sec</label>
                <input
                  id="studentClass"
                  placeholder="Enter Student Class & Sec"
                  type="text"
                  ref={input => {
                    this.studentClass = input;
                  }}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group mr-sm-2">
                <label>Student RollNo.</label>
                <input
                  id="studentRollno"
                  placeholder="Enter Student Rollno."
                  type="text"
                  ref={input => {
                    this.studentRollno = input;
                  }}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group mr-sm-2">
                <label>Student Image</label>
                <input
                  className="form-control"
                  placeholder="Enter student Image URL"
                  id="studentImage"
                  type="file"
                  ref={this.studentImage}
                  required
                />
              </div>
              <button type="submit" className="btn btn-block btn-success">
                Add Student
              </button>
            </form>
          </div>
        </div>
        <hr />
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
            <tbody id="studentList">
              {this.props.students.map((student, key) => {
                return (
                  <tr key={key}>
                    <th scope="row">{student.id.toString()}</th>
                    <td>
                      <img src={student.imageHash} className="img-thumbnail" />
                    </td>
                    <td>{student.nameHash}</td>
                    <td>{student.classHash}</td>
                    <td>{student.rollnoHash}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Main;
