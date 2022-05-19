import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Header() {
  return (
    <View style={styles.body}>
      <Text style={styles.text}>React Natie</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff'
    }
});