import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCampus } from '../store';

import StudentItem from './StudentItem';

const Campus = (props) => {
  const { campus, students } = props;
  if (!campus) return null;
  const studentArr = students.filter(student => student.campusId === campus.id);
  return (
    <div className='navMargin'>
      <div id='campusDetail'>
        <img className='campusImage' src={campus.imageURL} />
        <div className='campusInfo'>
          <div>
            <h1> {campus.name} </h1>
            <p> {campus.description} </p>
            <h5> Located At: </h5>
            <h6> {campus.addressLine1} </h6>
            <h6> {campus.addressLine2} </h6>
          </div>
          <div className='campusButtons'>
            <Link to={`/campuses/${campus.id}/edit`} params={{campus: campus.id}}><button className='btn btn-dark'>Edit</button></Link>&nbsp;
            <button onClick={() => props.deleteCampus(campus)} className='btn btn-danger'>Delete</button>
          </div>
        </div>
      </div>
      <div id='campusStudents'>
        <h1 className='listTitle'>Students on Campus</h1>
        <Link to={`/students/create`}><button className='btn btn-light addButton'> Add Student </button></Link>
      </div>
      <div className='studentsPadding studentsList'>
        {
          studentArr.length ?
          studentArr.map(student => <StudentItem key={student.id} path={location.hash} student={student}/>)
          : <div className='center'> There are no students currently enrolled at {campus.name} </div>
        }
      </div>
    </div>
  )
};

const mapStateToProps = ({ campuses, students }, ownProps) => {
  const campus = campuses.find(campus => campus.id === ownProps.id*1 )
  return {
    campus,
    students
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteCampus: (campus) => dispatch(deleteCampus(campus, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
