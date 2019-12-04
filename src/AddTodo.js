import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
    } else {
      Alert.alert("Todo can't be empty");
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Enter Todo"
      />
      <Button title="Add" onPress={pressHandler} />
    </View>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  input: {
    width: "80%",
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderColor: "#3949ab",
    padding: 10
  }
});
