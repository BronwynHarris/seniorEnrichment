import axios from 'axios';
import { destroyCampus, addUpdatedStudentToStore } from './index'

const GOT_CAMPUSES = 'GOT_CAMPUSES';
const GOT_NEW_CAMPUS = 'GOT_NEW_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

const getCampuses = campuses => {
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

const deleteCampus = campus => {
  return {
    type: REMOVE_CAMPUS,
    campus
  }
}

const updateCampus = campus => {
  return {
    type: UPDATE_CAMPUS,
    campus
  }
}

export const getCampuses = () =>
  dispatch =>
    axios.get('/api/campuses')


const reducer = (state=[], action) -> {
  switch(action.type) {
    case GOT_CAMPUSES:
    case GOT_NEW_CAMPUS:
    case REMOVE_CAMPUS:
    case UPDATE_CAMPUS:
    default:
    return state;
  }
};

export default reducer
