import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const merchLogin = ({history}) => {
  const [username, onChangeN] = React.useState('');
  const [errMsg, setErrMsg] = React.useState('');

  const loginMerch = async () => {
    setErrMsg('');

    try{
      const response = await axios.post('https://3a43e6f2bd15.ngrok.io/login', {
        Name: username
      })
      
      await AsyncStorage.setItem('JWT', response.data.token);
      
      if(await AsyncStorage.getItem('JWT')){
        history.push('/merchProfile');
      }
    }

    catch (error) {
      setErrMsg(error);
    }
  }


  return (
    <View>
        <Text style={styles.header}>
          Welcome to NoID Merchant Login!
        </Text>

        <View>
          <TextInput
            style={styles.inputBar}
            placeholder={'Username'}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText={(text) => onChangeN(text)}
            value = {username}
          />
          
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress = {() => history.push("/merchProfile")}>
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

export default merchLogin;