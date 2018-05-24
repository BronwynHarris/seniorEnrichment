import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CampusItem from './CampusItem';
import { deleteStudent, updateStudent } from '../store';

class Student extends Component {
  constructor(props){
    super(props);
    this.state = this.props.student;
    this.update = this.update.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState(nextProps.student);
  }

  update(ev){
    ev.preventDefault();
    this.props.updateStudent(this.state);
  }

  render(){
    const { student, students, campuses, campus, deleteStudent, id } = this.props;
    if (student) {
    return (
      <div id='student' className='studentsPadding'>
        <div id='studentDetail' >
          <div className='flex'>
            <div className='imageFlex'>
              <img className='studentImage' src={student.imageURL} />
            </div>
            <div className='studentInfo'>
              <div>
                <h3> {student.fullName} </h3>
                <h3 className='email'> {student.email} </h3>
                <h3> <span className={`badge ${student.gpa > 2.8 ? 'badge-secondary' : student.gpa > 2.0 ? 'badge-warning' : 'badge-danger'}`}> GPA: {student.gpa} </span> </h3>
              </div>
              <div className='studentButtons'>
                <Link to={`/students/${student.id}/edit`}><button className='btn btn-dark'>Edit</button></Link>&nbsp;
                <button onClick={() => deleteStudent(student)} className='btn btn-danger'>Delete</button>
              </div>
            </div>
          <br />
          <br />
          </div>
        </div>
        <div>
          {
            student && campus ?
            <div>
              <h4 className='center'> This student is registered to: </h4>
              <div>
                <CampusItem campus={campus} studentArr={students}/>
              </div>
            </div>
            :
            <div>
              <h3 className='center'> This student is not registered to a campus! </h3>
              <h4 className='center'> Please add them to a Campus: </h4>
            </div>
          }
          <form className='center' onSubmit={this.update}>
            <select className='dropdown' defaultValue={this.state.campusId} onChange={ev => this.setState({ campusId: ev.target.value*1 })}>
              <option value='null'> --- Unenrolled --- </option>
              {
                campuses.map(campus => {
                  return <option key={campus.id} value={campus.id}> {campus.name} </option>
                })
              }
            </select>
            <button className='btn btn-light btn-sm buttonSpacing'> {campus ? 'Change Campus' : 'Add to Campus'} </button>
          </form>
        </div>
      </div>
      )
    }
    return null
  }
}


const mapStateToProps = ({students, campuses}, {id}) => {
  const student = students.find(student => student.id === id*1);
  const campus = student ? campuses.find(campus => campus.id === student.campusId) : null;
  return {
    students,
    student,
    campuses,
    campus
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteStudent: (student) => dispatch(deleteStudent(student,history)),
    updateStudent: (student) => dispatch(updateStudent(student,history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
