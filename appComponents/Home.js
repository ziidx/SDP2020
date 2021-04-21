import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import BluetoothSerial from 'react-native-bluetooth-serial';

const MAC = '98:D3:C1:FD:B7:69';
const btName = 'HC-05';


function BluetoothSetup(){
  console.log("Setting up Bluetooth");
  BluetoothSerial.enable()
   .then((res) =>  console.log("Bluetooth Enabled", res))
   .catch((err) => console.log("ERROR Bluetooth enabled",err)); //to enable bluetooth
  BluetoothSerial.isEnabled()
    .then((res) => console.log("Verify bluetooth enabled", res))
    .catch((err) => console.log("ERROR Verification enabled",err)); //to verify bluetooth is on
  BluetoothSerial.connect(MAC)
    .then((res) => console.log("Bluetooth Connected", JSON.stringify(res)))
    .catch((err) => console.log("ERROR BLUETOOTH CONNECTION", err)); //to connect to device using MAC address
  BluetoothSerial.isConnected()
    .then((res) => console.log("Connection status: " + res))
    .catch((err) => console.log("ERROR CONNECTION STATUS", err)); //to verify connection to device
  let memberID;
  BluetoothSerial.readFromDevice()
    .then((data) => {
      memberID = data
      console.log(data)});
  const question = "Are you of legal age";
  //establish get connection with backend API

  /*
      API to be called:  (get) /data-request with a Button that reads "Request (question) from (memberID)"
      Query Params: memberUID(=the variable memberID), merchantUID(=you should receive it as message during login), question(hardcoded as "Are you of legal age")
      Response: question(=question provided), answer(=test)

      Please make the axios call below
  */
  console.log("MEMBERID: ", memberID);
  console.log("QUESTION: ", question);
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
}

function BluetoothDisconnect(){
  BluetoothSerial.disconnect().then((res) => console.log("Disconnected"))
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
          onPress = {BluetoothSetup}> 
          <Text> Bluetooth Reader</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.buttonStyle} 
          onPress = {BluetoothDisconnect}> 
          <Text> Bluetooth Reader</Text>
      </TouchableOpacity>

    </View>
    
  </View>
  );
}

export default welcomePage;