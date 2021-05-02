import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';


const welcomePage = ({history}) => {
  
  return (
  <View>
    <Text style={styles.header}>
      Welcome to NoID Home Page!{"\n"}
    </Text>

    <Text style={styles.header}>
      Select an Account to Login
    </Text>

    <View>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress = {() => history.push("/memberLogin")}>
        <Text> Member Login </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress = {() => history.push("/merchantLogin")}> 
        <Text> Merchant Login </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle} 
        onPress = {() => history.push("/accountCreation")}> 
        <Text> Create an Account </Text>
      </TouchableOpacity>

    </View>
    
  </View>
  );
}

export default welcomePage;