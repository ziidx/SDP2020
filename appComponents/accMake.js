import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import axios from 'axios';

const accMake = ({history}) => {
  const [username, onChangeU] = React.useState('');
  const [password, onChangeP] = React.useState('');
  const [name, onChangeN] = React.useState('');

  const registerMem = () => {
    try{
      if(/^[a-zA-Z0-9]{3,20}$/.test(username)){
        if(/^[a-zA-Z0-9!@#$%^&*]{8,30}$/.test(password)){
          if(/^[a-zA-Z -]{2,30}$/.test(name)){
                axios.post('http://d8e3a82ea5c8.ngrok.io/register', {
                  username: username,
                  password: password,
                  UID: JSON.stringify(Math.floor(Math.random() * 100)),
                  Name: name,
                  Age: JSON.stringify(Math.floor(Math.random() * 100)),
                  License: JSON.stringify(Math.floor(Math.random() * 1000)),
                  Expiry: JSON.stringify(Math.floor(Math.random() * 1000)),
                }).then(function (response) {
                  alert(JSON.stringify(response.data.message)); 
                  history.push('/');
                }).catch(function (error) {
                  alert(error);
                });
          }
          else{
            throw new Error('invalid name input');
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

    catch (error){
      alert(error);
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