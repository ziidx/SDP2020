import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './compStyles';
import axios from 'axios';


const memLogin = ({history}) => {
  const [username, onChangeUserN] = React.useState('');
  const [errMsg, setErrMsg] = React.useState('');

  const loginMem = () => {
    setErrMsg('');
    axios
    .post('https://jsonplaceholder.typicode.com/posts', {
      title: 'test',
      body: 'test',
      userId: 1,
    })
    .then(function (response){
      console.log("success!");
      if (response.data.token) {
          AsyncStorage.setItem("user", JSON.stringify(response.data));
          history.push("/memProfile");
      }

      return response.data;
    })
    .catch(function (error) {
      console.log("error");
      setErrMsg(error);
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
            placeholder={'Username or E-mail'}
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