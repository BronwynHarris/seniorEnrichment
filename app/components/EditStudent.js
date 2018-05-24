import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStudent, clearErrors } from '../store';

class EditStudent extends Component {
  constructor(props){
    super(props);
    this.state = this.props.student ? this.props.student : {};
    this.update = this.update.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState(nextProps.student);
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }

  update(ev){
    ev.preventDefault();
    this.props.updateStudent(this.state);
  }

  render(){
    const { student, errors } = this.props;
    const { fullName, imageURL, gpa, email, firstName, lastName } = this.state;
    if (!student) return null
    return (
      <div className='navMargin edit'>
        <h1> Edit {student.fullName}? </h1>
        <form onSubmit={this.update} className='form-control from-group'>
          <label>Full Name: </label>
          <div>
            <input
              value={fullName}
              onChange={ev => {
                const names = ev.target.value.split(' ')
                this.setState({ fullName: ev.target.value, firstName: names[0], lastName: names.slice(1).join(' ') })
              }}
              className={`form-control ${errors.find(error => error.path === 'lastName') ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">
              Please enter your full name.
            </div>
          </div>
          <br />
          <label>Avatar URL: </label>
          <input
            onChange={ev => this.setState({ imageURL: ev.target.value || undefined })}
            className='form-control'
            value={imageURL} />
          <br />
          <label>Email: </label>
          <div>
            <input
              value={email}
              onChange={ev => this.setState({ email: ev.target.value }) }
              className={`form-control ${errors.find(error => error.path === 'email') ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">
              Please enter a valid email.
            </div>
          </div>
          <br />
          <label>GPA: </label>
          <div>
            <input
              onChange={ev => this.setState({ gpa: ev.target.value })}
              type='number'
              min='0'
              max='4'
              step='0.1'
              value={gpa}
              className={`form-control ${errors.find(error => error.path === 'gpa') ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">
              Please enter a GPA between 0.0 and 4.0.
            </div>
          </div>
          <br />
          <button className='btn'>Save Changes</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ students, errors }, { id }) => {
  const student = students.find(student => student.id === id*1 )
  return {
    student,
    errors
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  const path = 'students';
  return {
    updateStudent: (student) => dispatch(updateStudent(student, history, path)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(EditStudent);
