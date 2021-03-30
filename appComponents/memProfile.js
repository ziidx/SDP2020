import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const testValidJWT = async () => {
  try {
    const authHeader = await AsyncStorage.getItem('JWT');
    const response = await axios.get('https://3a43e6f2bd15.ngrok.io/userTest', { headers: {'x-access-token': authHeader} });
    alert(JSON.stringify(response.data));
  } 
  
  catch (error) {
    alert(error.message);
  }
};



const memProfile = ({history}) => {

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('JWT');
      if(!await AsyncStorage.getItem('JWT')){
        history.push('/');
      }
    }

    catch (error){
      alert(error.message);
    }
  }


  return(
    <View>
      <Text style={styles.header}>
        Welcome to the Member Profile Page!
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
          onPress= {logOut}>
          <Text> Log Out </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
};

export default memProfile;