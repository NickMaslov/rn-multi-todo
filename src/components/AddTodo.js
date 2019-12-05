import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert, Keyboard } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { THEME } from "../theme";

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
      Keyboard.dismiss();
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
      <AntDesign.Button name="pluscircleo" onPress={pressHandler}>
        Add
      </AntDesign.Button>
      {/* <Button title="Add" onPress={pressHandler} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  input: {
    width: "70%",
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderColor: THEME.MAIN_COLOR,
    padding: 10
  }
});
