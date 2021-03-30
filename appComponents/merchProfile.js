import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import axios from 'axios';


import NfcManager, {NfcEvents} from '../react-native-nfc-manager';

// const testGetCall = () => {
//   axios
//     .get('https://jsonplaceholder.typicode.com/posts/1')
//     .then(function (response) {
//       // handle success
//       alert(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//       // handle error
//       alert(error.message);
//     })
// };

/*
const getDataUsingAsyncAwaitGetCall = async () => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts/2',
    );
    alert(JSON.stringify(response.data));
  } catch (error) {
    // handle error
    alert(error.message);
  }
};
*/

function NFCSetup(){
  initNfc();
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
      var memberID = String.fromCharCode(...tagFound.ndefMessage[0].payload);

      //establish get connection with backend API

      /*
          API to be called:  (get) /data-request with a Button that reads "Request (question) from (memberID)"
          Query Params: memberUID(=the variable memberID), merchantUID(=you should receive it as message during login), question(hardcoded as "Are you of legal age")
          Response: question(=question provided), answer(=test)

          Please make the axios call below
      */
      
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

async function initNfc() {
  await NfcManager.start();
}

const testPostCall = () => {
  axios
    .post('https://jsonplaceholder.typicode.com/posts', {
      title: 'test',
      body: 'test',
      userId: 1,
    })
    .then(function (response) {
      // handle success
      alert(JSON.stringify(response.data));
    })
    .catch(function (error) {
      // handle error
      alert(error.message);
    });
};

/*
const multipleRequestsInSingleCall = () => {
  axios
    .all([
      axios
        .get('https://jsonplaceholder.typicode.com/posts/1')
        .then(function (response) {
          // handle success
          alert('Post 1 : ' + JSON.stringify(response.data));
        }),
      axios
        .get('https://jsonplaceholder.typicode.com/posts/2')
        .then(function (response) {
          // handle success
          alert('Post 2 : ' + JSON.stringify(response.data));
        }),
    ])
    .then(
      axios.spread(function (acct, perms) {
        // Both requests are now complete
        alert('Both requests are now complete');
      }),
    );
};
*/

const merchProfile = ({history}) => {

  return(
    <View>
      <Text style={styles.header}>
        Welcome to the Test Credentials Page!
      </Text>

      <Text>
        Press the buttons below to see your credentials!
      </Text>

      <View>
        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={testGetCall}>
          <Text> Test GET Request </Text>
        </TouchableOpacity>

        {/*}
        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={getDataUsingAsyncAwaitGetCall}>
          <Text> Test GET with Async Await </Text>
        </TouchableOpacity>
        */}

        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={testPostCall}>
          <Text> Test POST </Text>
        </TouchableOpacity>

        {/*
        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={multipleRequestsInSingleCall}>
          <Text> Test Concurrent Requests </Text>
        </TouchableOpacity>
        */}
        <TouchableOpacity
          style={styles.buttonStyle} 
          onPress = {NFCSetup}> 
          <Text> NFC </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress= {() => history.push("/")}>
          <Text> Back to Homepage </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
};

export default merchProfile;