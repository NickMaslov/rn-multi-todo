import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  HIDE_LOADER,
  SHOW_LOADER,
  FETCH_TODOS,
  CLEAR_ERROR,
  SHOW_ERROR
} from "../types";

const handlers = {
  [ADD_TODO]: (state, { title, id }) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id,
        title
      }
    ]
  }),
  [REMOVE_TODO]: (state, { id }) => ({
    ...state,
    todos: state.todos.filter(t => t.id !== id)
  }),
  [UPDATE_TODO]: (state, { id, title }) => ({
    ...state,
    todos: state.todos.map(t => {
      if (t.id === id) {
        t.title = title;
      }
      return t;
    })
  }),
  [SHOW_LOADER]: state => ({ ...state, loading: true }),
  [HIDE_LOADER]: state => ({ ...state, loading: false }),
  [CLEAR_ERROR]: state => ({ ...state, error: null }),
  [SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
  [FETCH_TODOS]: (state, { todos }) => ({ ...state, todos }),
  DEFAULT: state => state
};

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
