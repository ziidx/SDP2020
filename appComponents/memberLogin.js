import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const memUID = {
  id: ''
}

const memLogin = ({history}) => {
  const [username, onChangeUserN] = React.useState('');

  const loginMem = async () => {
    try{
      const response = await axios.post('http://d1340493a24f.ngrok.io/login', {
        username: username
      })
      console.log(memUID.id);
      await AsyncStorage.setItem('memJWT', response.data.token);
      memUID.id = response.data.message;
      console.log(memUID.id);
      history.push('/memProfile');
    }

    catch (error) {
      alert(error.response.data);
    }
  }


  return (
    <View>
        <Text style={styles.header}>
          Welcome to NoID Member Login!
        </Text>
        
        <View>
          <TextInput
            style={styles.inputBar}
            placeholder={'Username'}
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText={(text) => onChangeUserN(text)}
            value={username}
            keyboardType="email-address"
          />

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress = {loginMem}>
            <Text> Login </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyle} 
            onPress = {() => history.push("/")}> 
            <Text> Go to Home Page </Text>
          </TouchableOpacity>
        </View>

    </View>
  );
}

export default memLogin;