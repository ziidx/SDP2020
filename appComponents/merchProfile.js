import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
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


async function MerchRequest() {
  try{
    /*
    API to be called:  (get) /data-request with a Button that reads "Request (question) from (memberID)"
    Query Params: memberUID(=the variable memberID), merchantUID(=you should receive it as message during login), question(hardcoded as "Are you of legal age")
    Response: question(=question provided), answer(=test)

    Please make the axios call below
    */
    const memberID = '28';
    const merchquestion = 'Are you legal?';

    console.log(memberID);
    console.log(merchquestion);
    console.log('sending get request');

    const response = await axios.get('http://89ffde377454.ngrok.io/data-request', { params: {
      memberUID: memberID,
      merchantUID: await EncryptedStorage.getItem('merchUID'),
      question: merchquestion
    }})
    
    if(response.data){
      console.log(response.data);
    }
    
    console.log('get request sent');
  }

  catch(error){
    console.log(error);
  }
}


const testValidJWTMerch = async () => {
  try{
    const authHeader = {'x-access-token': await EncryptedStorage.getItem('noid_token')};
    const response = await axios.get('http://89ffde377454.ngrok.io/userTest', {headers: authHeader});

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
          onPress = {MerchRequest}> 
          <Text> Data Request </Text>
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