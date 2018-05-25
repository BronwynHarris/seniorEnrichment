import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCampus } from '../reducers';
import CampusItem from './CampusItem';

const Campuses = ({ campuses, students, del }) => {

  if (!campuses.length) {
    return (
      <div className='empty-message'>
        <h2>There are no campuses in the database.</h2>
        <Link to='/campusform'><button className='btn btn-outline-primary'>Add Campus</button></Link>
      </div>
    );
  }

  return (
    <div>
      <div className='header'>
        <h1>All Campuses</h1>
        <Link to='/addcampus'><button className='btn btn-outline-primary'>Add Campus</button></Link>
      </div>
      <div className='row justify-content-center'>
        <CampusItem campuses={ campuses } students={ students } del={ del } />
      </div>
    </div>
  );
};

const mapDispatch = dispatch => ({
  del(id) {
    dispatch(removeCampus(id));
  }
});

export default connect(null, mapDispatch)(Campuses);
