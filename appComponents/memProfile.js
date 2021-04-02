import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {memUID} from './memberLogin';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';


export const merchUID = {
  id: '',
  question: ''
}



const testValidJWTMem = async () => {
  try{
    const authHeader = {'x-access-token': await AsyncStorage.getItem('memJWT')};
    const response = await axios.get('http://d1340493a24f.ngrok.io/userTest', {headers: authHeader });
    alert('id is ' + JSON.stringify(response.data.id));
    console.log(memUID.id);
  }

  catch (error) {
    alert(JSON.stringify(error.response.data));
  }
}


const memProfile = ({history}) => {
  const logOut = async () => {
    try{
      await AsyncStorage.removeItem('memJWT');
      memUID.id = ''
      console.log(memUID.id);
      history.push('/');
    }
    
    catch (error) {
      alert(error.response.data);
    }
  }

  function permission (){
    console.log("Hello");
  //establish get connection with backend API

      /*
          API to be called:  (get) /memberFE/permission
          Query Params: memberUID(=you should receive this upon login as message))
          Response: merchantid, question(=question provided in this set up is Are you legal)
          error: message:'No info request found'

          Please make the axios call below
      */
      
      axios
        .get('http://44e5e745b5bb.ngrok.io/memberFE/permission', {params: {
          memberUID: memUID.id
        }})
        .then(function (response) {
          merchUID.id = response.data.merchantid;
          console.log('merchant uid retrieved');
          merchUID.question = response.data.question;
          console.log('question: ' + response.data.question);
          history.push('/memResponse');
        })
        .catch(function (error) {
          alert(error.message);
        });
    }


  //After this call, you should basically initiate a popup/dialog box with 2 buttons: Yes to share info, No to deny info
  //You can use the concept of states to manage this. The two methods below are for when those buttons are pushed

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