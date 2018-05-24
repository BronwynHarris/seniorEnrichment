import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStudent } from '../store';

const StudentItem = (props) => {
  const { student, campus, updateStudent } = props;
  const path = location.hash;
  return (
    <div id='studentItem' className='navMargin'>
      <img className='studentImage' width="50%" src={student.imageURL} />
      <br />
      <div className='center'>
        <Link className='center' to={`/students/${student.id}`}>
          <h4> {student.fullName} </h4>
        </Link>
        {
          path.includes('campuses') ?
          <button onClick={()=> updateStudent({id: student.id, campusId: null})} className='center btn btn-sm btn-danger'> Remove </button>
          :
          <h6> {campus ? campus.name : 'This student is not enrolled'} </h6>
        }
      </div>
    </div>
  )
;}

const mapStateToProps = ({ campuses }, { student }) => {
  const campus = campuses.find(campus => campus.id === student.campusId);
  return {
    student,
    campus
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateStudent: (student) => dispatch(updateStudent(student))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentItem);
