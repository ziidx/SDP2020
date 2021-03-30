import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';



function NFCSetup(){
  //initNfc();
  readNdef();
  console.log("Running NFC")
}

function readNdef() {
  console.log("Running NFC 1")
  const cleanUp = () => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.setEventListener(NfcEvents.SessionClosed, null);
  };

  return new Promise((resolve) => {
    let tagFound = null;

    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      tagFound = tag;
      resolve(tagFound);
      // await NfcManager.getNdefMessage();
      // console.log("Payload hunter:", test )
      console.log("TAG FOUND",String.fromCharCode(...tagFound.ndefMessage[0].payload))
      //establish get connection with backend API: memberFe/permission to get a valid piece of data object from them
      
      // axios
//     .get('https://jsonplaceholder.typicode.com/posts/1')
//     .then(function (response) {
//       // handle success
//       alert(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//       // handle error
//       alert(error.message);
//     })

      NfcManager.unregisterTagEvent().catch(() => 0);
    });

    NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
      cleanUp();
      if (!tagFound) {
        resolve();
      }
    });

    NfcManager.registerTagEvent();
  });
}


const testValidJWT = async () => {
  try {
    const authHeader = await AsyncStorage.getItem('JWT');
    const response = await axios.get('https://3a43e6f2bd15.ngrok.io//userTest', { headers: {'x-access-token': authHeader} });
    alert(JSON.stringify(response.data));
  } 
  
  catch (error) {
    alert(error.message);
  }
};


const merchProfile = ({history}) => {
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
        Welcome to the Merchant Profile Page!
      </Text>

      <Text>
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
          onPress = {NFCSetup}> 
          <Text> NFC </Text>
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

export default merchProfile;