import React, { Fragment, Component } from 'react'
import CollegeInstance from "./college";

 class Table extends Component {

   state = {
     students: [],
     studentCount: 0
   }
   
   componentDidMount() {
      this.loadData()
    }

   loadData = async () => {
    const studentCount = await CollegeInstance.methods.studentCount().call();
    this.setState({ studentCount });
    // Load students
    for (var i = 1; i <= studentCount; i++) {
      const student = await CollegeInstance.methods.students(i).call();
      this.setState({
        students: [...this.state.students, student]
      });
      console.log(this.state.students);
    }
  }

   render() {
    return (
      <Fragment>
      <h2 className="text-center">Student Details</h2>
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
          { this.state.students.map((s, key) => {
            return(
              <tr key={key}>
                <th scope="row">{s.id.toString()}</th>
                <td>
                  <img
                    src={s.imageHash}
                    className="img-thumbnail"
                  />  
                </td>
                <td>{s.nameHash}</td>
                <td>{s.classHash}</td>
                <td>{s.rollnoHash}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
     </div>
      </Fragment>
  )
    }
}

export default Table;
