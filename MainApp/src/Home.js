import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, Alert} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../CustomButton';
import SQLite from 'react-native-sqlite-storage';

import {useSelector, useDispatch} from 'react-redux';
import {setName, setAge} from '../redux/actions';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => console.log(error),
);

export default function Home({navigation, route}) {
  const {name, age} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  // const [name, setName] = useState('');
  // const [age, setAge] = useState('');

  const getData = () => {
    try {
      // AsyncStorage.getItem('UserData').then(value => {
      //   if (value != null) {
      //     let user = JSON.parse(value);
      //     setName(user.name);
      //     setAge(user.age);
      //   }
      // });
      db.transaction(tx => {
        tx.executeSql('SELECT Name, Age FROM Users', [], (tx, results) => {
          let len = results.rows.length;
          if (len > 0) {
            let userName = results.rows.item(0).Name;
            let userAge = results.rows.item(0).Age;
            dispatch(setName(userName));
            dispatch(setAge(userAge));
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const updateData = async () => {
    if (name.length == 0 && age.length == 0) {
      Alert.alert('Warning', 'Please write your data');
    } else {
      try {
        // let user = {
        //   name, age
        // }
        // await AsyncStorage.setItem('UserData', JSON.stringify(user));
        db.transaction(tx => {
          tx.executeSql(
            'UPDATE Users SET Name=?',
            [name],

            () => {
              Alert.alert('Success!', 'Your data has been updated.');
              getData();
            },
            error => console.log(error),
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const removeData = async () => {
    try {
      // await AsyncStorage.removeItem('UserData');
      // Alert.alert('Success!', 'You removed your data.');
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM Users",
          [],
          () => {navigation.navigate('Login');},
          error => {console.log(error)}
        )
      })
      
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
      <Text style={{fontSize: 30}}>Your age {age}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={value => dispatch(setName(value))}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Enter your age"
        onChangeText={setAge}
      /> */}
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
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 20,
  },
});
