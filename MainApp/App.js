import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from 'react';

export default function App() {
  const [name, setName] = useState('A')
  return (
    <View style={styles.body}>
      <Text style={styles.text}>{name}</Text>
      <Button 
        title='Update'
        style={styles.button}
        onPress={() => setName('B')}
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