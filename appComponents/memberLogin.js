import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const memLogin = ({history}) => {
  const [username, onChangeUserN] = React.useState('');
  const [errMsg, setErrMsg] = React.useState('');

  const loginMem = async () => {
    setErrMsg('');

    try{
      const response = await axios.post('http://3a43e6f2bd15.ngrok.io/login', {
        Name: username
      })

      await AsyncStorage.setItem('JWT', response.data.token);

      if(await AsyncStorage.getItem('JWT')){
        history.push('/memProfile');
      }
    }

    catch (error) {
      setErrMsg(error);
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
            placeholder={'Name'}
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

        {errMsg ? <Text style= {styles.header}>{errMsg}</Text> : null}
    </View>
  );
}

export default memLogin;