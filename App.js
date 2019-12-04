import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Navbar } from "./src/components/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";

export default function App() {
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([
    // {
    //   id: "1",
    //   title: "Learn React Native"
    // }
  ]);

  const addTodo = title => {
    setTodos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title
      }
    ]);
  };
  const removeTodo = id => {
    const todo = todos.find(t => t.id === id);
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
          onPress: () => {
            setTodoId(null);
            setTodos(prev => prev.filter(todo => todo.id !== id));
          }
        }
      ],
      { cancelable: false }
    );
  };
  const updateTodo = (id, title) => {
    setTodos(old =>
      old.map(todo => {
        if (todo.id === id) todo.title = title;
        return todo;
      })
    );
  };

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={id => {
        setTodoId(id);
      }}
    />
  );
  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId);
    content = (
      <TodoScreen
        goBack={() => setTodoId(null)}
        todo={selectedTodo}
        onRemove={removeTodo}
        onSave={updateTodo}
      />
    );
  }

  return (
    <View>
      <Navbar title="Todo App!" />
      <View style={styles.container}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  }
});
