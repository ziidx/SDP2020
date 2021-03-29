import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const testValidJWT = async () => {
  try {
    const authHeader = await AsyncStorage.getItem('JWT');
    const response = await axios.get('https://860f0d1e46aa.ngrok.io/userTest', { headers: {'x-access-token': authHeader} });
    alert(JSON.stringify(response.data));
  } 
  
  catch (error) {
    alert(error.message);
  }

};

const memProfile = ({history}) => {

  return(
    <View>
      <Text style={styles.header}>
        Welcome to the Test Credentials Page!
      </Text>

      <Text style = {styles.header}>
        Press the buttons below to see your credentials!
      </Text>

      <View>
        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={testValidJWT}>
          <Text> Test JWT Authentication </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress= {() => history.push("/")}>
          <Text> Back to Homepage </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
};

export default memProfile;