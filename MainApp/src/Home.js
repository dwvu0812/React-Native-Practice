import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, Alert} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../CustomButton';

export default function Home({navigation, route}) {
  const [name, setName] = useState('');
  const getData = () => {
    try {
      AsyncStorage.getItem('UserName').then(value => {
        if (value != null) {
          setName(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const updateData = async () => {
    if (!name.length) {
      Alert.alert('Warning', 'Please write your data');
    } else {
      try {
        await AsyncStorage.setItem('UserName', name);
        Alert.alert('Success!', 'Your data has been updated.');
      } catch (error) {
        console.log(error);
      }
    }
  };
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('UserName');
      // Alert.alert('Success!', 'You removed your data.');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Text style={{fontSize: 40}}>Screen A</Text>
      <Pressable
        style={{backgroundColor: 'lightblue', padding: 10}}
        onPress={() => navigation.navigate('Screen_B')}>
        <Text>Go to Screen B</Text>
      </Pressable> */}
      <Text style={{fontSize: 30}}>Welcome {name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={setName}
      />
      <CustomButton
        title="Update data"
        onPressFunction={updateData}
        color="#1eb900"
      />
      <CustomButton
        title="Remove"
        color="#f40100"
        onPressFunction={removeData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
