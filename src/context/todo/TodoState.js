import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  CLEAR_ERROR,
  SHOW_ERROR,
  FETCH_TODOS
} from "../types";
import { ScreenContext } from "../screen/screenContext";
import { Http } from "../../http";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  };

  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async title => {
    clearError();
    try {
      const data = await Http.post(
        "https://rn-todo-app-d1673.firebaseio.com/todos.json",
        { title }
      );
      dispatch({ type: ADD_TODO, title, id: data.name });
    } catch (error) {
      showError("Something wrong...");
    }
  };
  const fetchTodos = async () => {
    showLoader();
    try {
      const data = await Http.get(
        "https://rn-todo-app-d1673.firebaseio.com/todos.json"
      );
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (e) {
      showError("Something wrong...");
      console.log(e);
    } finally {
      hideLoader();
    }
  };
  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id);
    Alert.alert(
      "Delete element",
      `Are you sure you want ot delete ${todo.title}`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            changeScreen(null);
            await Http.delete(
              `https://rn-todo-app-d1673.firebaseio.com/todos/${id}.json`
            );
            dispatch({ type: REMOVE_TODO, id });
          }
        }
      ],
      { cancelable: false }
    );
  };
  const updateTodo = async (id, title) => {
    clearError();
    try {
      await Http.patch(
        `https://rn-todo-app-d1673.firebaseio.com/todos/${id}.json`,
        { title }
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (error) {
      showError("Something wrong...");
      console.log(e);
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  const showError = error => dispatch({ type: SHOW_ERROR, error });
  const clearError = error => dispatch({ type: CLEAR_ERROR, error });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
