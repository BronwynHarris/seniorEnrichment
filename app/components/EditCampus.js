import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCampus, updateStudent, clearErrors } from '../store';
import StudentItem from './StudentItem';

class EditCampus extends Component{
  constructor(props){
    super(props);
    this.state = Object.assign({}, this.props.campus, { student: {} });
    this.update = this.update.bind(this);
    this.transferStudent = this.transferStudent.bind(this);
  }

  update(evt){
    evt.preventDefault();
    this.props.updateCampus(this.state);
  }

  transferStudent(evt){
    evt.preventDefault();
    setState(student.campusId) = this.props.campus.id;
    this.props.updateStudent(this.state.student);
  }

  componentWillReceiveProps(nextProps){
    this.setState(nextProps.campus);
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }

  render(){
    if (!this.props.campus) return null
    const { campus, students, errors, unenrolledStudents } = this.props;
    const { name, imageURL, description, addressLine1, addressLine2 } = this.state;
    const { student } = this.state;
    const studentArr = students.filter(student => student.campusId === campus.id);
    return (
      <div className='navMargin edit'>
      <h1> Edit {campus ? campus.name : null}? </h1>
      <form onSubmit={this.update} className='form-control from-group'>
        <label> Campus Name: </label>
        <div>
          <input
            value={name}
            onChange={ev => this.setState({ name: ev.target.value })}
            className={`form-control ${errors.find(error => error.path === 'name') ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">
            Please enter a campus name.
          </div>
        </div>
        <br />
        <label> Image URL: </label>
        <div>
          <input
            value={imageURL}
            onChange={ev => this.setState({ imageURL: ev.target.value || undefined})}
            className='form-control'/>
        </div>
        <br />
        <label> Address Line 1: </label>
        <div>
          <input
            value={addressLine1}
            onChange={ev => this.setState({ addressLine1: ev.target.value })}
            className={`form-control ${errors.find(error => error.path === 'addressLine1') ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">
            Please enter a street address.
          </div>
        </div>
        <br />
        <label> Address Line 2: </label>
        <div>
          <input
            value={addressLine2}
            onChange={ev => this.setState({ addressLine2: ev.target.value })}
            className={`form-control ${errors.find(error => error.path === 'addressLine2') ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">
            Please enter a city, state and zipcode.
          </div>
        </div>
        <br />
        <label> Description: </label>
        <div>
          <textarea
            value={description}
            onChange={ev => this.setState({ description: ev.target.value })}
            className={`form-control textArea ${errors.find(error => error.path === 'description') ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">
            Please enter a valid description.
          </div>
        </div>
        <br />
        <button className='btn btn-light'>Save Changes</button>
      </form>
      <div>
        <h2> Transfer a student to this campus: </h2>
        <form onSubmit={this.transferStudent} className='form-inline'>
          <select className='form-control dropdown' onChange={(ev) => this.setState({ student: this.props.students.find(student => student.id === ev.target.value*1)})}>
            <option value='-1'> --- Select a Student --- </option>
            {
              unenrolledStudents.map(student => <option key={student.id} value={student.id}> {student.fullName} </option> )
            }
          </select>
          <button className='btn btn-light buttonSpacing'> Transfer </button>
        </form>
      </div>
      <h2 className='flex'> Students on Campus: </h2>
      <div className='studentsPadding studentsList'>
        {
          studentArr.length ?
          studentArr.map(student => <StudentItem key={student.id} path={location.hash} student={student}/>)
          : <div className='studentsPadding'> There are no students currently enrolled at {campus.name} </div>
        }
      </div>
    </div>
    )
  }
}

const mapStateToProps = ({ campuses, students, errors }, { id }) => {
  const campus = campuses.find(campus => campus.id === id*1 );
  const unenrolledStudents = students.filter(student => student.campusId !== id*1);
  return {
    campus,
    students,
    errors,
    unenrolledStudents
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  const path = 'campuses';
  return {
    updateCampus: (campus) => dispatch(updateCampus(campus, history)),
    updateStudent: (student) => dispatch(updateStudent(student, history, path)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCampus);
