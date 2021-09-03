import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';


const merchLogin = ({history}) => {
  const [username, onChangeN] = React.useState('');
  const [password, onChangeP] = React.useState('');

  const testLoginMerch = async () => {
    try{ //Regex to make sure username and password are valid inputs
      if(/^[a-zA-Z0-9]{3,20}$/.test(username)){
        if(/^[a-zA-Z0-9!@#$%^&*]{8,30}$/.test(password)){
          if(username == 'yellow'){ //Hard coded values just for testing/demo purposes
            await EncryptedStorage.setItem('merchUID', '5'); // No JWT is set to test invalid JWT validation on next page
            history.push('/merchProfile');
          }
          else{
            alert('Invalid login credentials');
          }
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
          Welcome to NoID Merchant Login!
        </Text>

        <View>
          <TextInput //TextInputs could use refactoring so there is less DRY
            style={styles.inputBar}
            placeholder={'Username'}
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText={(text) => onChangeN(text)}
            value = {username}
          />

          <TextInput
            style={styles.inputBar}
            placeholder={'Password'}
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText={(text) => onChangeP(text)}
            value = {password}
            secureTextEntry
          />
          
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress = {testLoginMerch}>
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

export default merchLogin;