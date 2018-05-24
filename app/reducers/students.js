import axios from 'axios';
import { GET_STUDENTS, CREATE_STUDENT, UPDATE_STUDENT, DELETE_STUDENT } from './constants';
import { errorHandler } from './errors';

export const fetchStudents = () => {
  return (dispatch) => {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => dispatch({ type: GET_STUDENTS, students}))
      .catch(err => dispatch(errorHandler(err.response.data.errors)))
  };
};

export const createStudent = (student, history) => {
  return (dispatch) => {
    return axios.post('/api/students', student)
      .then(res => res.data)
      .then(student => {
        dispatch({ type: CREATE_STUDENT, student })
        history.push(`/students/${student.id}`)
      })
      .catch(err => dispatch(errorHandler(err.response.data.errors)))
  };
};

export const updateStudent = (student, history, path) => {
  return (dispatch) => {
    return axios.put(`/api/students/${student.id}`, student)
      .then(res => res.data)
      .then(student => {
        dispatch({ type: UPDATE_STUDENT, student })
        if(path === 'students') {
          history.push(`/students/${student.id}`)
        }
      })
      .catch(err => dispatch(errorHandler(err.response.data.errors)))
  };
};

export const deleteStudent = (student, history) => {
  return (dispatch) => {
    return axios.delete(`/api/students/${student.id}`)
      .then(() => {
        dispatch({ type: DELETE_STUDENT, student })
        history.push('/students')
      })
      .catch(err => dispatch(errorHandler(err.response.data.errors)))
  };
};

const studentReducer = (state = [], action) => {
  switch(action.type){
    case GET_STUDENTS:
      return action.students;
    case CREATE_STUDENT:
      return [...state, action.student];
    case UPDATE_STUDENT:
      return state.map(student => student.id === action.student.id ? action.student : student);
    case DELETE_STUDENT:
      return state.filter(student => student.id !== action.student.id*1);
    default:
      return state;
  }
};

export default studentReducer;
