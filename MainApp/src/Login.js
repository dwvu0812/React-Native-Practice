import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import React, {useState,useEffect} from 'react';
import CustomButton from '../CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [name, setName] = useState('');
  const getData = () => {
    try {
      AsyncStorage.getItem('UserName').then(value => {
        if (value != null) {
          navigation.navigate('Home');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const setData = async () => {
    if (!name.length) {
      Alert.alert('Warning', 'Please write your data');
    } else {
      try {
        await AsyncStorage.setItem('UserName', name);
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.logo}></View>
      <Text style={styles.text}>AsyncStorage</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={setName}
      />
      <CustomButton title="Login" onPressFunction={setData} color='#1eb900'/>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: '#fff',
    margin: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: '700',
    color: '#000',
  },
  input: {
    width: '80%',
    // height: 30,
    backgroundColor: '#fff',
    marginTop: 130,
    marginBottom: 10,
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 20,
  },
});
