import React, { useState } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { Todo } from "../components/Todo";
import { AddTodo } from "../components/AddTodo";

export const MainScreen = ({ todos, addTodo, removeTodo, openTodo }) => {
  let content = (
    <FlatList
      keyExtractor={item => item.id.toString()}
      data={todos}
      renderItem={({ item }) => (
        <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />
      )}
    />
  );

  if (todos.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.img}
          source={require("../../assets/no-items.png")}
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />

      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    padding: 10
  },
  img: {
    width: "100%",
    height: "100%"
  }
});
