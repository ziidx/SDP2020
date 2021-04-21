import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';


const testValidJWTMem = async () => {
  try{
    const authHeader = {'x-access-token': await EncryptedStorage.getItem('noid_token')};
    const response = await axios.get('http://3b540049c0d1.ngrok.io/userTest', {headers: authHeader});

    await EncryptedStorage.setItem('memID', response.data.id);
    alert('JWT Verified!\n' + 'ID is ' + JSON.stringify(await EncryptedStorage.getItem('memID')));
  }

  catch (error) {
    console.log(error);
  }
}

const memProfile = ({history}) => {
  const permission = async () => {
    //establish get connection with backend API

      /*
        API to be called:  (get) /memberFE/permission
        Query Params: memberUID(=you should receive this upon login as message))
        Response: merchantid, question(=question provided in this set up is Are you legal)
        error: message:'No info request found'

        Please make the axios call below
      */
    try{
      const response = await axios.get('http://3b540049c0d1.ngrok.io/memberFE/permission', 
        { params: { UID: await EncryptedStorage.getItem('noid_uid')}});
      await EncryptedStorage.setItem('merchUID', response.data.merchantid);
      await EncryptedStorage.setItem('question', response.data.question);
      
      if(response.data.message == 'Request for info made'){
        history.push('/memResponse');
      }
      else{
        console.log(response.data.message);
      }
    }    

    catch (error) {
      console.log(error);
    }
  
    //After this call, you should basically initiate a popup/dialog box with 2 buttons: Yes to share info, No to deny info
    //You can use the concept of states to manage this. The two methods below are for when those buttons are pushed

  }

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
        Welcome to the Member Profile Page!
      </Text>

      <View>
        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={testValidJWTMem}>
          <Text> Test JWT Authentication </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress= {permission}>
          <Text> Click to begin data sharing </Text>
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