import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

export default function ScreenB({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 40}}>Screen B</Text>
      <Pressable
        style={{backgroundColor: 'lightblue', padding: 10}}
        onPress={() => navigation.goBack()}>
        <Text>Go back to Screen A</Text>
      </Pressable>
    </View>
  )
}