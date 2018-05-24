import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCampus } from '../store';

class CampusItem extends Component {

  constructor (props) {
    super(props);
  };

  render () {
    const { campus, studentArr, deleteCampus } = this.props;
    const students = studentArr.filter(student => student.campusId === campus.id );
    return (
      <div className='navMargin campusItem'>
          <div className='campusImage'>
            <img width='100%' src={campus.imageURL} />
          </div>
          <div className='campusInfo'>
            <Link to={`/campuses/${campus.id}`}>
              <h3 className='center'> {campus.name} </h3>
            </Link>
            { students ?
              <h6 className='center'>{students.length} Enrolled Students</h6>
              : null
            }
            <div className='campusButtons'>
              <Link to={`/campuses/${campus.id}/edit`}><button className='btn btn-dark'>Edit</button></Link>&nbsp;
              <button onClick={() => deleteCampus(campus)} className='btn btn-danger'>Delete</button>
            </div>
          </div>
      </div>
    )
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteCampus: (campus) => dispatch(deleteCampus(campus, history))
  };
};

export default connect(null, mapDispatchToProps)(CampusItem);
