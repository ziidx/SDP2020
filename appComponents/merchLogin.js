import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './compStyles';
import axios from 'axios';


export const merchData = {
  id: '',
  token: ''
};

const merchLogin = ({history}) => {
  const [username, onChangeN] = React.useState('');

  const testLoginMerch = () => {
    merchData.id = '5';
    history.push('/merchProfile');
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
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText={(text) => onChangeN(text)}
            value = {username}
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