import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';

export default function CustomButton(props) {
  return (
    <Pressable
      onPress={props.onPressFunction}
      style={[styles.button, {backgroundColor: props.color}]}
      android_ripple={{color: 'primary'}}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
  button: {
    // backgroundColor: '#1eb900',
    width: 150,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
  },
});
