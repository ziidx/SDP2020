import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import EncryptedStorage from 'react-native-encrypted-storage';

function NFCSetup(){
  initNfc();
  readNdef();
  console.log("Setting up NFC")
}

function readNdef() {
  console.log("Running NFC Reader")
  const cleanUp = () => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.setEventListener(NfcEvents.SessionClosed, null);
  };

  return new Promise((resolve) => {
    let tagFound = null;

    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      tagFound = tag;
      resolve(tagFound);
      const memberID = String.fromCharCode(...tagFound.ndefMessage[0].payload);
      const question = "Are you of legal age";

      //establish get connection with backend API

      /*
          API to be called:  (get) /data-request with a Button that reads "Request (question) from (memberID)"
          Query Params: memberUID(=the variable memberID), merchantUID(=you should receive it as message during login), question(hardcoded as "Are you of legal age")
          Response: question(=question provided), answer(=test)

          Please make the axios call below
      */
      console.log(memberID);
      console.log(question);
      console.log('sending get request');
      
      axios.get('http://4c81b6f1c743.ngrok.io/data-request', { params: {
        member_ID: memberID,
        merchant_ID: merchID,
        question: question
      }})
      .then(function (response){
        console.log(response.data);
      })
      .catch(function (error){
        console.log(error.message);
      });
      console.log('get request sent');

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

async function initNfc() {
  await NfcManager.start();
}

const testValidJWTMerch = async () => {
  try{
    const authHeader = {'x-access-token': await EncryptedStorage.getItem('noid_token')};
    const response = await axios.get('http://d8e3a82ea5c8.ngrok.io/userTest', {headers: authHeader});

    alert('JWT Verified!\n' + 'ID is ' + JSON.stringify(response.data.id));
  }

  catch (error) {
    alert(JSON.stringify(error.response.data.message));
  }
}


const merchProfile = ({history}) => {
  const logOut = async () => {
    try{
      await EncryptedStorage.clear();
      history.push('/');
    }
    
    catch (error) {
      console.log(error);
    }
  }


  return(
    <View>
      <Text style={styles.header}>
        Welcome to the Merchant Profile Page!
      </Text>

      <View>
        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={testValidJWTMerch}>
          <Text> Test JWT Authentication </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle} 
          onPress = {NFCSetup1}> 
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