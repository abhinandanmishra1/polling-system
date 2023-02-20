import { legacy_createStore as createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import io from 'socket.io-client';

// Define initial state
const socket = io.connect("https://polling-backend.onrender.com/");
const initialState = {
  polls: {},
  results: [0, 0, 0, 0],
  socket,
  showResult: false,
};

console.log(initialState)
// Define actions
const CREATE_POLL = 'CREATE_POLL';
const UPDATE_RESULT = 'UPDATE_RESULT';
const CLEAR_RESULT = 'CLEAR_RESULT';
const GET_SOCKET = 'GET_SOCKET';

// Define action creators
export const createPoll = (poll) => ({
  type: CREATE_POLL,
  poll
});

export const updateResult = (answerIndex) => ({
  type: UPDATE_RESULT,
  answerIndex
});

export const clearResult = () => ({
  type: CLEAR_RESULT,
});

export const getSocket = () => ({
  type: GET_SOCKET,
});

// Define reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POLL:
      return {
        ...state,
        polls: action.poll
      };
    case UPDATE_RESULT:{
      console.log('updated once');
      const updatedResult = [...state.results];
      if (action.answerIndex !== -1)
        updatedResult[action.answerIndex]++;

      return {
        ...state,
        results: updatedResult
      };}
    case CLEAR_RESULT:
      return {
        ...state,
        results: []
      };
    case GET_SOCKET:
      return state;
    default:
      return state;
  }
};

const composeEnhancers = compose;
const middleware = [thunk];
const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
)

// Create store with reducer and initial state
const store = createStore(reducer, enhancer);

export default store;
