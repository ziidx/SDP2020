import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import storeToken from '../services/auth-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const accMake = ({history}) => {
  const [uid, onChangeU] = React.useState('');
  const [name, onChangeN] = React.useState('');
  const [age, onChangeA] = React.useState('');
  const [license, onChangeL] = React.useState('');
  const [expiry, onChangeE] = React.useState('');
  const [errMsg, setErrMsg] = React.useState('');


  const registerMem = async () => {
    setErrMsg('');

    try{
      const response = await axios.post('http://860f0d1e46aa.ngrok.io/register', {
        UID: uid,
        Name: name,
        Age: age,
        License: license,
        Expiry: expiry,
      })
      await AsyncStorage.setItem('JWT', response.data.token)
      history.push("/memProfile");

    }

    catch (error) {
      setErrMsg(error);
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
            placeholder={'Choose UID'}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText = {(text) => onChangeU(text)}
            value = {uid}
          />

          <TextInput
            style={styles.inputBar}
            placeholder={'Name'}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText = {(text) => onChangeN(text)}
            value = {name}
          />

          <TextInput
            style={styles.inputBar}
            placeholder={'Age'}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText = {(text) => onChangeA(text)}
            value = {age}
          />

          <TextInput
            style={styles.inputBar}
            placeholder={'License Number'}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText = {(text) => onChangeL(text)}
            value = {license}
          />

          <TextInput
            style={styles.inputBar}
            placeholder={'License Expiration Date'}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText = {(text) => onChangeE(text)}
            value = {expiry}
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

      {errMsg ? <Text style= {styles.header}>{errMsg}</Text> : null}
    </View>
  )
};

export default accMake;