import axios from 'axios';

//action types
const GOT_STUDENTS = 'GOT_STUDENTS';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const GOT_STUDENT = 'GOT_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DESTROY_STUDENT = 'DESTROY_STUDENT';


//action creators
const getStudentsFromStore = students => {
  return {
    type: GOT_STUDENTS,
    students
  }
}

const removeStudent = id => {
  return {
    type: REMOVE_STUDENT,
    id
  }
}

const addNewStudent = id => {
  return {
    type: GOT_STUDENT,
    id
  }
}

const changeStudent = id => {
  return {
    type: UPDATE_STUDENT,
    id
  }
}

const destroyStudent = id => {
  return {
    type: DESTROY_STUDENT,
    id
  }
}

//thunks

export const getStudents = () => {
  return async function thunk(dispatch) {
    const { data } = await axios.get('/api/students');
    dispatch(getStudentsFromStore(data))
  }
}

export const deleteStudent = (id, history) =>
  dispatch =>
    axios.delete(`/api/students/${id}`)
      .then(() => dispatch(destroyStudent(id)))
      .then(() => history.pushState('/students'))
      .catch(error => console.log(error))

export const postStudent = (student, history) =>
  dispatch =>
      axios.post('/api/students', student)
        .then(res => res.data)
        .then(student => {
          dispatch(addNewStudent(student));
          return student.id;
        })
        .then(id => history.push(`/students/${id}`))
        .catch(error => console.error(error));


export const putStudent = (id, update, history) =>
    dispatch =>
      axios.put(`api/students/${id}`, update)
        .then(res => res.data)
        .then(student => dispatch(changeStudent(student)))
        .then(() => history.push(`/students/${id}`))
        .catch(error => console.log(error))



//reducer

const reducer = (state = [], action) => {
  switch(action.type){
    case GOT_STUDENTS:
      return action.students
    case REMOVE_STUDENT:
      return action.student
    case GOT_STUDENT:
      return [...state, action.student]
    case UPDATE_STUDENT:
      return state.map(student => student.id === action.student.id ? action.student : student)
    case DESTROY_STUDENT:
      return state.filter(student => student.id !== action.id)
    default:
      return state;
  }
}

export default reducer

