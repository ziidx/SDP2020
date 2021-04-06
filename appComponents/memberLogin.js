import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './compStyles';
import axios from 'axios';

export const memData = {
  id: '',
  question: '',
  token: '',
  merchUID: ''
}

const memLogin = ({history}) => {
  const [username, onChangeUserN] = React.useState('');

  const loginTest = () => {
    axios.post('http://4c81b6f1c743.ngrok.io/login', {
      username: username
    })
    .then(function (response) {
      memData.id = response.data.message;
      memData.token = response.data.token;
      history.push('/memProfile');
    })
    .catch(function (error) {
      alert(error.response.data);
    })
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
            onPress = {loginTest}>
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