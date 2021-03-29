import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './compStyles';
import axios from 'axios';


const merchLogin = ({history}) => {
  const [name, onChangeN] = React.useState('');
  const [errMsg, setErrMsg] = React.useState('');

    const loginMerch = () => {
    setErrMsg('');
    axios
    .post('https://jsonplaceholder.typicode.com/posts', {
      title: 'test',
      body: 'test',
      userId: 1,
    })
    .then(function (response){
      if (response.data.token) {
          AsyncStorage.setItem("user", JSON.stringify(response.data));
          history.push("/merchProfile");
      }
    })
    .catch(function (error) {
      setErrMsg(error);
    })
  }

  return (
    <View>
        <Text style={styles.header}>
          Welcome to NoID Merchant Login!
        </Text>

        <View>
          <TextInput
            style={styles.inputBar}
            placeholder={'Name'}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText={(text) => onChangeN(text)}
            value = {name}
          />
          
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress = {loginMerch}>
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