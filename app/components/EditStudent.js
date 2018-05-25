import React from 'react';
import { connect } from 'react-redux';
import { putStudent } from '../reducers';

class EditStudent extends React.Component {
  constructor(props) {
    super(props);
    const student = this.props.student;
    this.state = {
      firstName: student ? student.firstName : '',
      lastName: student ? student.lastName : '',
      email: student ? student.email : '',
      imageUrl: student ? student.imageUrl : undefined,
      campusId: student ? student.campusId : -1,
      touched: {
        firstName: false,
        lastName: false,
        email: false
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.goBack = this.goBack.bind(this);
    this.validate = this.validate.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.student) {
      if(this.state.firstName !== nextProps.student.firstName) {
        this.setState(nextProps.student);
      }
    }
  }

  goBack() {
    this.props.history.goBack();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleBlur(field) {
    const touched = Object.assign(this.state.touched, { [field]: true });
    this.setState({ touched });
  }

  validate(firstName, lastName, email) {
    return {
      firstName: firstName.length === 0,
      lastName: lastName.length === 0,
      email: email.length === 0 || email.indexOf('@') < 0
    };
  }

  render() {
    const { campuses, put, student } = this.props;
    const { firstName, lastName, email, touched } = this.state;
    const errors = this.validate(firstName, lastName, email);

    const showError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    const isEnabled = !Object.keys(errors).some(key => errors[key]);

    return (
      <div>
        <h1>Edit Student</h1>
        <form onSubmit={ event => put(event, student.id, this.state) }>
          <div className='form-group'>
            <label htmlFor='firstName'>First Name:</label>
            <input
              type='text'
              name='firstName'
              className={ showError('firstName') ? 'error form-control' : 'form-control'}
              value={ this.state.firstName }
              onChange={ this.handleChange }
              onBlur={ () => this.handleBlur('firstName')} />
            { errors.firstName && touched.firstName ? <p className='error'>Please provide a first name.</p> : null }
          </div>
          <div className='form-group'>
            <label htmlFor='lastName'>Last Name:</label>
            <input
              type='text'
              name='lastName'
              className={ showError('lastName') ? 'error form-control' : 'form-control'}
              value={ this.state.lastName }
              onBlur={ () => this.handleBlur('lastName')}
              onChange={ this.handleChange } />
            { errors.lastName && touched.lastName ? <p className='error'>Please provide a last name.</p> : null }
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='text'
              name='email'
              className={ showError('email') ? 'error form-control' : 'form-control'}
              value={ this.state.email }
              onBlur={ () => this.handleBlur('email')}
              onChange={ this.handleChange } />
            { errors.email && touched.email ? <p className='error'>Please provide a valid email.</p> : null }
          </div>
          <div className='form-group'>
            <label htmlFor='imageUrl'>Image URL:</label>
            <input
              type='text'
              name='imageUrl'
              className='form-control'
              value={ this.state.imageUrl }
              onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='campusId'>Campus:</label>
            <br />
            <select
              name='campusId'
              value={ this.state.campusId }
              onChange={ this.handleChange }>
              <option value='-1'>Select a campus...</option>
              { campuses && campuses.map(campus => (
                <option key={ campus.id } value={ campus.id }>{ campus.name }</option>
              ))}
            </select>
          </div>
          <button disabled={ !isEnabled } type='submit' className='btn btn-outline-primary'>Submit</button>
          <button type='button' className='button-margin btn btn-outline-success' onClick={ this.goBack }>Cancel</button>
        </form>
      </div>
    );
  }
}


const mapDispatch = (dispatch, { history }) => ({
  put(event, id, update) {
    event.preventDefault();
    dispatch(putStudent(id, update, history));
  }
});

export default connect(null, mapDispatch)(EditStudent);
