import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import {memData} from './memberLogin';

/*
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
*/

const testValidJWTMem = () => {
    const authHeader = {'x-access-token': memData.token};

    axios.get('http://70a8fe88caf7.ngrok.io/userTest', {headers: authHeader })
    .then(function (response) {
      alert('id is ' + JSON.stringify(response.data.id));
    })
    .catch(function (error) {
      alert(JSON.stringify(error.data));
    })
}


const memProfile = ({history}) => {
  const logOut = () => {
      memData.id = '';
      memData.question = '';
      memData.token = '';
      memData.merchUID = '';

      history.push('/');
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
        .get('http://70a8fe88caf7.ngrok.io/memberFE/permission', {params: {
          memberUID: memData.id
        }})
        .then(function (response) {
          memData.merchUID = '5';
          console.log('merchant uid retrieved: ' + memData.merchUID);
          memData.question = 'Are you legal?';
          console.log('question: ' + memData.question);
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