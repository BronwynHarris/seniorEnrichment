import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const StudentItem = (props) => (
  <div className='row justify-content-center'>
    { props.students.map(student => {
      return (
        <div key={ student.id } className='student-item col-lg-2 col-md-3 col-sm-4'>
          <img className='img-fluid' src={ student.image } />
          <h5><Link to={`/students/${student.id}`} student={ student }>{ student.fullName }</Link></h5>
          <a href={`mailto:${student.email}`}>{ student.email }</a>
        </div>
      );
    })}
  </div>
);

function mapStateToProps(state) {
  return {
    students: state.students
  }
}


export default connect(mapStateToProps)(StudentItem);
