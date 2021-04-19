import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';



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
      console.log("Value received via NFC is", memberID);
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
      
      // axios.get('http://4c81b6f1c743.ngrok.io/data-request', { params: {
      //   member_ID: memberID,
      //   merchant_ID: merchID,
      //   question: question
      // }})
      // .then(function (response){
      //   console.log(response.data);
      // })
      // .catch(function (error){
      //   console.log(error.message);
      // });
      // console.log('get request sent');

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
      
      <TouchableOpacity
          style={styles.buttonStyle} 
          onPress = {NFCSetup}> 
          <Text> NFC Reader </Text>
        </TouchableOpacity>

    </View>
    
  </View>
  );
}

export default welcomePage;