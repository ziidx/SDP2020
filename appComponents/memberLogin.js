import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';


const memLogin = ({history}) => {
  const [username, onChangeUserN] = React.useState('');
  const [password, onChangeP] = React.useState('');

  const loginMem = async () => {
    try{ //Regex for making sure than inputs only allow alphanumeric characters for username + special characters for password
      if(/^[a-zA-Z0-9]{3,20}$/.test(username)){
        if(/^[a-zA-Z0-9!@#$%^&*]{8,30}$/.test(password)){
          const response = await axios.post('http://286174d17a68.ngrok.io/login', { //For testing purposes only check for matching username, production would check for password
            username: username
          })
          await EncryptedStorage.setItem('noid_uid', response.data.message); //Storing userId and generated JWT sent from the server to be stored locally on device for session validation
          await EncryptedStorage.setItem('noid_token', response.data.token);
          history.push('/memProfile')
        }
        else{
          throw new Error('invalid password input');
        } 
      }
      else{
        throw new Error('invalid username input');
      }
    }

    catch (error) {
      alert(error);
    }
  }

  //JSX
  return (
    <View>
        <Text style={styles.header}>
          Welcome to NoID Member Login!
        </Text>
        
        <View>
          <TextInput //TextInputs could use refactoring so there is less DRY
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

          <TextInput
            style={styles.inputBar}
            placeholder={'Password'}
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText={(text) => onChangeP(text)}
            value={password}
            secureTextEntry
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