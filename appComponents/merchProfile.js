import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import BluetoothSerial from 'react-native-bluetooth-serial';


const MAC = '98:D3:C1:FD:B7:69';
const btName = 'HC-05';

function CheckBluetooth() {
  BluetoothSerial.isEnabled()
    .then((res) => console.log("Bluetooth Activation Status: ", res))
    .catch((err) => console.log("ERROR Verification enabled",err)); //to verify bluetooth is on
  
  BluetoothSerial.isConnected()
    .then((res) => console.log("Connection status: " + res))
    .catch((err) => console.log("ERROR CONNECTION STATUS", err)); //to verify connection to device
}

function BluetoothSetup(){
  console.log("Setting up Bluetooth");
  BluetoothSerial.enable()
   .then((res) =>  console.log("Turning on Bluetooth"))
   .catch((err) => console.log("ERROR Bluetooth enabled",err)); //to enable bluetooth
}

function BluetoothConnect(){
  BluetoothSerial.connect(MAC)
    .then((res) => console.log("Bluetooth Connected", JSON.stringify(res)))
    .catch((err) => console.log("ERROR BLUETOOTH CONNECTION", err)); //to connect to device using MAC address
}


function BluetoothDisconnect(){
  BluetoothSerial.disconnect().then((res) => console.log("Disconnected"));
}


async function MerchRequest() {
  try{
    /*
    API to be called:  (get) /data-request with a Button that reads "Request (question) from (memberID)"
    Query Params: memberUID(=the variable memberID), merchantUID(=you should receive it as message during login), question(hardcoded as "Are you of legal age")
    Response: question(=question provided), answer(=test)

    Please make the axios call below
    */
    const memberID = '31449063';

    /*BluetoothSerial.readFromDevice()
    .then((data) => {
      memberID = data
      console.log(memberID)});
    */
    
    const merchquestion = 'Are you of legal age?';

    
    const response = await axios.get('http://286174d17a68.ngrok.io/data-request', { params: {
      memberUID: memberID,
      merchantUID: await EncryptedStorage.getItem('merchUID'),
      question: merchquestion
    }})
    
    if(response.data){
      alert(JSON.stringify(response.data));
    }
    else{
      alert('sending get request: ' + merchquestion);
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
    const response = await axios.get('http://286174d17a68.ngrok.io/userTest', {headers: authHeader});

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
          style = {styles.buttonStyle}
          onPress = {CheckBluetooth}>
          <Text> Check Bluetooth</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style = {styles.buttonStyle}
          onPress = {BluetoothSetup}>
          <Text> Enable Bluetooth</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style = {styles.buttonStyle}
          onPress = {BluetoothConnect}>
          <Text> Connect via Bluetooth</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle} 
          onPress = {MerchRequest}> 
          <Text> Data Request </Text>
        </TouchableOpacity>

        
        <TouchableOpacity
          style = {styles.buttonStyle}
          onPress = {BluetoothDisconnect}>
          <Text> Disconnect Bluetooth</Text>
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