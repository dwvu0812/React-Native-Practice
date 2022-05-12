import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.body}>
      <Text style={styles.text}>You clicked {count} times!</Text>
      <Button 
        title='ADD'
        style={styles.button}
        onPress={() => setCount(preSate => preSate + 1)}
      ></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text : {
    color: 'black',
    fontSize: 30,
    margin: 10
  },
  button: {
    // padding: 20,
  }
});