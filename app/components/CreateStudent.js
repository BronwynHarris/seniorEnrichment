import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent, clearErrors } from '../store';

class CreateStudent extends Component {
  constructor(){
    super();
    this.state = {
      fullName: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(ev){
    ev.preventDefault();
    this.props.createStudent(this.state);
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }

  render(){
    const { campuses, errors } = this.props;
    return (
      <div className='navMargin edit'>
        <h1> Create New Student </h1>
        <form onSubmit={this.onSubmit} className='form-control from-group'>
          <label>Full Name: </label>
          <div>
            <input
              className={`form-control ${errors.find(error => error.path === 'lastName') ? 'is-invalid' : ''}`}
              onChange={ev => {
                const names = ev.target.value.split(' ')
                this.setState({ fullName: ev.target.value, firstName: names[0], lastName: names.slice(1).join(' ') })
              }}
               />
            <div className="invalid-feedback">
              Please enter your full name (first and last).
            </div>
          </div>
          <br />
          <label>Avatar URL: </label>
          <input
            onChange={ev => this.setState({ imageURL: ev.target.value })}
            className='form-control' />
          <br />
          <label>Email: </label>
          <input
            onChange={ev => this.setState({ email: ev.target.value })}
            className={`form-control ${errors.find(error => error.path === 'email') ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">
              Please enter a valid email.
            </div>
          <br />
          <label>GPA: </label>
          <div>
            <input
              onChange={ev => this.setState({ gpa: ev.target.value })}
              className={`form-control ${errors.find(error => error.path === 'gpa') ? 'is-invalid' : ''}`}
              type='number'
              step='0.1' />
            <div className="invalid-feedback">
              Please enter a number between 0-4.
            </div>
          </div>
          <br />
          <select className='dropdown' onChange={ev => this.setState({ campusId: ev.target.value*1 })}>
            <option value={undefined}> --- Select a Campus --- </option>
            {
              campuses.map(campus => {
                return <option key={campus.id} value={campus.id}> {campus.name} </option>
              })
            }
          </select>
          <br />
          <br />
          <button className='btn btn-light'>Save Changes</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ campuses, errors }) => {
  return {
    campuses,
    errors
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createStudent: (student) => dispatch(createStudent(student,history)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent);
