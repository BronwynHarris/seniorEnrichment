import axios from 'axios';
import { destroyCampus, addUpdatedStudentToStore } from '../store'
//action types
const GOT_CAMPUSES = 'GOT_CAMPUSES';
const GOT_NEW_CAMPUS = 'GOT_NEW_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

//action creators
const getCampusesFromStore = campuses => {
  return {
    type: GOT_CAMPUSES,
    campuses
  }
}

const addNewCampus = campus => {
  return {
    type: GOT_NEW_CAMPUS,
    campus
  }
}

const removeCampus = id => {
  return {
    type: REMOVE_CAMPUS,
    id
  }
}

const updateCampus = campus => {
  return {
    type: UPDATE_CAMPUS,
    campus
  }
}

//thunks
export const getCampuses = () => {
  return async function thunk(dispatch) {
    const { data } = await axios.get('/api/campuses');
    dispatch(getCampusesFromStore(data))
  }
}

// export const postCampus = (campus, history) => {
//   return async function thunk(dispatch) {
//     const { data } = await axios.post('api/campuses', campus);
//     dispatch(getCampusesFromStore(data))
//   }
// } //promise below works, can't figure out how to add history to async function?

export const postCampus = (campus, history) =>
  dispatch =>
    axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then(campus => {
        dispatch(addNewCampus(campus));
        return campus.id;
      })
      .then(id => history.push(`/campuses/${id}`))
      .catch(error => console.error(error));

export const deleteCampus = (id, history) =>
  dispatch =>
    axios.delete(`/api/campuses/${id}`)
      .then(() => dispatch(removeCampus(id)))
      .then(() => dispatch(destroyCampus(id)))
      .then(() => history.push('/campuses'))
      .catch(error => console.error(error));


export const putCampus = (id, update, history) =>
  dispatch =>
    axios.put(`/api/campuses/${id}`, update)
      .then(res => res.data)
      .then(campus => dispatch(updateCampus(campus)))
      .then(() => history.push(`/campuses/${id}`))
      .catch(error => console.error(error));

//reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case GOT_CAMPUSES:
      return action.campuses;
    case GOT_NEW_CAMPUS:
      return [ ...state, action.campus];
    case REMOVE_CAMPUS:
      return state.filter(campus => campus.id !== Number(action.id))
    case UPDATE_CAMPUS:
      return state.map(campus => campus.id === action.campus.id ? action.campus : campus);
    default:
    return state;
  }
};

export default reducer
