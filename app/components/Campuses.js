import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CampusItem from './CampusItem';

class Campuses extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const { campuses, students } = this.props;
    return (
      <div className='navMargin'>
        <div className='flex'>
          <h1 className='listTitle'> All Campuses </h1>
          <Link to='/campuses/create'><button className='btn btn-light addButton'> Add Campus </button></Link>
        </div>
        <br />
        {
          campuses.length ?
            <div id='campusesList'>
              {
                campuses.map(campus => {
                  return (
                  <CampusItem key={campus.id} studentArr={students} campus={campus} />
                  )
                })
              }
            </div>
          :
          <div className='center'>
            <h2> There are no Campuses in the database </h2>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ campuses, students }) => {
  return {
    students,
    campuses
  };
};

export default connect(mapStateToProps)(Campuses);
