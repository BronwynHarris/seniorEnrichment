import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../store';

import StudentItem from './StudentItem';

const Campus = ({ campus, del, campusStudents }) => {
  console.log()
  if(!campus) return null;
  return (
    <div>
      <div className='row campus justify-content-center'>
        <div className='col-md-6 col-sm-12'>
          <div id='campus-image'>
            <img className='img-fluid' src={ campus.image} />
          </div>
        </div>
        <div className='col-md-6 col-sm-12'>
          <h1>{ campus.name }</h1>
          <Link to={`/editcampus/${campus.id}`}><button className='btn btn-outline-primary'>Edit</button></Link>
          <button className='button-margin btn btn-outline-danger' onClick={ () => del(campus.name) }>Delete</button>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6 col-sm-12' id='campus-header'>
          <h1>{ !campusStudents.length ? 'There are no students on this campus.' : 'Students on Campus' }</h1>
        </div>
        <div className='col-md-6 col-sm-12' id='add-student-to-campus'>
          <div className='col-12'>
            <Link to='/addstudent'>
              <button className='btn btn-outline-primary'>
                Add New Student
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <StudentItem students={ campusStudents } />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, { match }) => {
  const id = match.params.id;
  const campus = state.campuses.find(campus => campus.id === Number(match.params.id));
  const students = state.students
  const campusStudents = students.filter(student => student.campusId === Number(id));
  const studentsNotOnCampus = students.filter(student => student.campusId !== Number(id));
  return { campus, campusStudents, studentsNotOnCampus, id };
};

const mapDispatchToProps = (dispatch, { history, match }) => ({
  del(name) {
    if(window.confirm(`Are you sure you want to delete the ${name}?`)){
      dispatch(deleteCampus(match.params.id, history));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Campus);

