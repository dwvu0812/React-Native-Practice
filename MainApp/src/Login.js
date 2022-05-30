import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import React, {useState,useEffect} from 'react';
import CustomButton from '../CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

import {useSelector, useDispatch} from 'react-redux';
import {setName, setAge} from '../redux/actions';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => console.log(error)
);

export default function Login({navigation}) {
  const {name, age} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  // const [name, setName] = useState('');
  // const [age, setAge] = useState('');

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS " 
        + "Users "
        + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);"
      )
    })
  }
  const getData = () => {
    try {
      // AsyncStorage.getItem('UserData').then(value => {
      //   if (value != null) {
      //     navigation.navigate('Home');
      //   }
      // });
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT Name, Age FROM Users",
          [],
          (tx, results) =>{
            let len = results.rows.length;
            if (len > 0) {
              navigation.navigate('Home');
            }
          }
        )
      })
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    createTable();
    getData();
  }, []);

  const setData = async () => {
    if (!name.length || !age.length) {
      Alert.alert('Warning', 'Please write your data');
    } else {
      try {
        dispatch(setName(name));
        dispatch(setAge(age));
        // let user = {
        //   name,
        //   age
        // }
        // await AsyncStorage.setItem('UserData', JSON.stringify(user));
        await db.transaction(async (tx) => {
          // await tx.executeSql(
          //   "INSERT INTO Users (Name, Age) VALUES ('"+name+"', "+age+")",
          // );
          await tx.executeSql(
            "INSERT INTO Users (Name, Age) VALUES (?,?)",
            [name, age]
          );
        })
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.logo}></View>
      <Text style={styles.text}>...</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={value => dispatch(setName(value))}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        onChangeText={value => dispatch(setAge(value))}
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
    marginBottom: 60
  },
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
