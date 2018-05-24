import { ERROR, CLEAR_ERROR } from './constants';

export const errorHandler = (errors) => {
  return { type: ERROR, errors };
};

export const clearErrors = () => {
  return { type: CLEAR_ERROR, error: [] };
};

const errorReducer = (state = [], action) => {
  switch (action.type){
    case ERROR:
      return action.errors;
    case CLEAR_ERROR:
      return action.error;
    default:
      return state;
  }
};

export default errorReducer;
