import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Alert
} from "react-native";
import { THEME } from "../theme";

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value);

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert(
        "Error: ",
        `Mimimum 3 charachters should be in title. Now is ${
          title.trim().length
        } `
      );
    } else {
      onSave(title);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.wrap}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Enter title"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={64}
        />
        <View style={styles.buttons}>
          <Button
            title="Cancel"
            onPress={onCancel}
            color={THEME.DANGER_COLOR}
          />
          <Button title="Save" onPress={saveHandler} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "80%"
  },
  buttons: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
