/*import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const testValidJWT = async () => {
  try {
    const authHeader = await AsyncStorage.getItem('JWT');
    const response = await axios.get('https://3a43e6f2bd15.ngrok.io/userTest', { headers: {'x-access-token': authHeader} });
    alert(JSON.stringify(response.data));
  } 
  
  catch (error) {
    alert(error.message);
  }
};



const memProfile = ({history}) => {

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
        Welcome to the Member Profile Page!
      </Text>

      <Text style = {styles.header}>
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
          onPress= {logOut}>
          <Text> Log Out </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
};

export default memProfile;
*/

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './compStyles';
import axios from 'axios';

const testGetCall = () => {
  axios
    .get('https://jsonplaceholder.typicode.com/posts/1')
    .then(function (response) {
      // handle success
      alert(JSON.stringify(response.data));
    })
    .catch(function (error) {
      // handle error
      alert(error.message);
    })
};

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

function permission(){
  console.log("Hello");
  //establish get connection with backend API

      /*
          API to be called:  (get) /memberFE/permission
          Query Params: memberUID(=you should receive this upon login as message))
          Response: merchantid, question(=question provided in this set up is Are you legal)
          error: message:'No info request found'

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



  //After this call, you should basically initiate a popup/dialog box with 2 buttons: Yes to share info, No to deny info
  //You can use the concept of states to manage this. The two methods below are for when those buttons are pushed
}

function agree(){
  console.log("Hello1");

  /*
          API to be called:  (get) /dataprocessing
          Query Params: merchantUID(you get this as response from permissions function above), memberUID(=you should receive this upon login as message), question(= You get this as response from permissions function above)
          Response: 200 OK

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
//       alert(error.m
}

function disagree(){
    console.log("Hello2");

  /*
          API to be called:  (get) /denied
          Query Params: merchantUID(you get this as response from permissions function above), memberUID(=you should receive this upon login as message), question(= You get this as response from permissions function above)
          Response: 200 OK
          
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
//       alert(error.m
}
const memProfile = ({history}) => {

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
          onPress= {() => history.push("/")}>
          <Text> Back to Homepage </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress= {permission}>
          <Text> Click to begin data sharing </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
};

export default memProfile;