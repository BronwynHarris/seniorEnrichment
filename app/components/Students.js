import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { getStudents } from '../reducers/students';
import store from '../store'

// import StudentItem from './StudentItem';

const Students = (props) => {
  console.log(props)
  if(!props.students.length) {
    return (
      <div className='empty-message'>
        <h2>There are no students in the database.</h2>
        <Link to='/studentform'><button className='btn btn-outline-primary'>Add Student</button></Link>
      </div>
    );
  }

  return (
    <div>
      <div className='header row'>
        <h1>All Students</h1>
        <Link to='/addstudent'><button className='btn btn-outline-primary'>Add Student</button></Link>
      </div>
        <div className='row justify-content-center'>
          { props.students.map(student => {
            return (
              <div key={ student.id } className='student-item col-lg-2 col-md-3 col-sm-4'>
                <img className='img-fluid' src={ student.image } className='student-img'/>
                <h5><Link to={`/students/${student.id}`} student={ student }>{ student.fullName }</Link></h5>
                <a href={`mailto:${student.email}`}>{ student.email }</a>
              </div>
            );
          })}
        </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    students: state.students
  }
}


export default connect(mapStateToProps)(Students);
