import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const accMake = ({history}) => {
  const [username, onChangeU] = React.useState('');
  const [password, onChangeP] = React.useState('');
  const [name, onChangeN] = React.useState('');

  const registerMem = async () => {
    try{
      const response = await axios.post('http://27d0947af10c.ngrok.io/register', {
        username: username,
        password: password,
        UID: JSON.stringify(Math.floor(Math.random() * 100)),
        Name: name,
        Age: JSON.stringify(Math.floor(Math.random() * 100)),
        License: JSON.stringify(Math.floor(Math.random() * 1000)),
        Expiry: JSON.stringify(Math.floor(Math.random() * 1000)),
      })

      alert(JSON.stringify(response.data.message));
      history.push('/');
    }

    catch (error) {
      alert(error.response.data);
    }
  }


  return( 
    <View>
        <Text style={styles.header}>
          Welcome to NoID Account Creation!
        </Text>

        <View>
          <TextInput
            style={styles.inputBar}
            placeholder={'Choose Username'}
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText = {(text) => onChangeU(text)}
            value = {username}
          />

          <TextInput
            style={styles.inputBar}
            placeholder={'Choose Password'}
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            secureTextEntry
            onChangeText = {(text) => onChangeP(text)}
            value = {password}
          />

          <TextInput
            style={styles.inputBar}
            placeholder={'Name'}
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText = {(text) => onChangeN(text)}
            value = {name}
          />

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress = {registerMem}>
            <Text> Register Member </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyle} 
            onPress = {() => history.push("/")}>
            <Text> Go to Home Page </Text> 
          </TouchableOpacity>
        </View>
      
    </View>
  )
};

export default accMake;