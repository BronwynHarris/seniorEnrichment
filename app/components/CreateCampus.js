import React from 'react';
import { connect } from 'react-redux';
import { postCampus } from '../reducers/campuses';

class CreateCampus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: 'enter link',
      touched: {
        name: false,
        city: false,
        planet: false,
        description: false
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.goBack = this.goBack.bind(this);
    this.validate = this.validate.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  validate(name) {
    return {
      name: name.length === 0
    };
  }

  onSubmit(ev){
    ev.preventDefault();
    this.props.postCampus(this.state);
  }

  render() {
    const { post } = this.props;
    const { name, image, touched } = this.state;
    const errors = this.validate(name);

    const showError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    const isEnabled = !Object.keys(errors).some(key => errors[key]);
    console.log(this.props)
    return (
      <div>
        <h1>Add Campus</h1>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              name='name'
              className={ showError('name') ? 'error form-control' : 'form-control'}
              value={ name }
              onBlur={ () => this.handleBlur('name')}
              onChange={ this.handleChange } />
            { errors.name && touched.name ? <p className='error'>Please provide a name.</p> : null }
          </div>
          <div className='form-group'>
            <label htmlFor='image'>Image URL:</label>
            <input
              type='text'
              name='image'
              className='form-control'
              value = {image}
              onChange={ this.handleChange } />
          </div>

          <button disabled={ !isEnabled }type='submit' className='btn btn-outline-primary'>Submit</button>
          <button type='button' className='button-margin btn btn-outline-success' onClick={ this.goBack }> Cancel</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, { match }) => ({
  error: state.error,
  campus: state.campuses.find(campus => campus.id === Number(match.params.id))
});

const mapDispatchToProps = (dispatch, { history }) => ({
  postCampus(event, campus) {
    dispatch(newCampus(campus, history));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCampus);
