import React from 'react';
import { connect } from 'react-redux';
import { putCampus } from '../reducers';

class EditCampus extends React.Component {
  constructor(props) {
    super(props);
    const campus = this.props.campus;
    this.state = {
      name: campus ? campus.name : '',
      image: campus ? campus.image : undefined,
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
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.campus) {
      if(this.state.name !== nextProps.campus.name) {
        this.setState(nextProps.campus);
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

  validate(name) {
    return {
      name: name.length === 0
    };
  }

  render() {
    const { put, campus } = this.props;
    const { name, image, touched } = this.state;
    const errors = this.validate(name);

    const showError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    const isEnabled = !Object.keys(errors).some(key => errors[key]);

    return (
      <div>
        <h1>Edit Campus</h1>
        <form onSubmit={ event => put(event, campus.id, this.state) }>
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
              value={ image }
              onChange={ this.handleChange } />
          </div>

          <button disabled={ !isEnabled } type='submit' className='btn btn-outline-primary'>Submit</button>
          <button type='button' className='button-margin btn btn-outline-success' onClick={ this.goBack }> Cancel</button>
        </form>
      </div>
    );
  }
}

const mapState = (state, { match }) => ({
  campus: state.campuses.find(campus => campus.id === Number(match.params.id))
});

const mapDispatch = (dispatch, { history }) => ({
  put(event, id, update) {
    event.preventDefault();
    dispatch(putCampus(id, update, history));
  },
});

export default connect(mapState, mapDispatch)(EditCampus);
